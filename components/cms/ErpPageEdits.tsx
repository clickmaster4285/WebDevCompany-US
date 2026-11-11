"use client";

import { useEffect, useLayoutEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  anyPlainSelectorResolves,
  applyPageEdits,
} from "@/lib/cms/apply-edits";
import {
  ERP_MAX_HIDE_MS as MAX_HIDE_MS,
  ERP_PENDING_ATTR,
} from "@/lib/cms/anti-flicker";
import { normalizeSlug } from "@/lib/cms/slug";
import type { PageEditInstruction } from "@/lib/cms/types";

// B5 (client-router mode): applies ERP DOM edits on first load and after
// every client-side navigation, exactly once per navigation.
//
// Mount ONCE in the root layout, BEFORE {children}. React runs this layout
// effect's cleanup in the commit's mutation phase, ahead of the old page's
// removal, so moved nodes are back in their original slot and hidden/edited
// nodes are restored before React unmounts or re-renders them (B6). Without
// that, the next navigation throws "Failed to execute 'removeChild'".
//
// Live updates: in "live mode" the page also polls /api/cms/live and, when
// the ERP publishes a change for this path, re-applies the new edits (edited
// pages) or re-renders the page from the server (created pages) in place,
// with no reload. See liveModeEnabled() for who gets live mode.

const DOM_WAIT_ATTEMPTS = 15;
const DOM_WAIT_INTERVAL_MS = 100;
// Only de-duplicates the double effect run of React StrictMode / a quick
// re-render. Every real navigation asks the server again.
const CLIENT_CACHE_MS = 2_000;
// Matches the server's 5s ERP de-duplication window (lib/cms/client.ts).
const LIVE_POLL_MS = 5_000;
const LIVE_FLAG_KEY = "erp-live";
const LIVE_FLAG_DAYS = 30;

type EditsResponse = { edits: { instructions: PageEditInstruction[] } | null };
type Stamp = { edits: string; page: string };

const responseCache = new Map<
  string,
  { at: number; promise: Promise<PageEditInstruction[] | null> }
>();

function warn(...args: unknown[]) {
  if (process.env.NODE_ENV !== "production")
    console.warn("[erp-edits]", ...args);
}

function apiPath(slug: string): string {
  return encodeURIComponent(slug === "/" ? "/" : `/${slug}`);
}

function fetchEdits(
  slug: string,
  revision: number,
): Promise<PageEditInstruction[] | null> {
  const key = `${slug}#${revision}`;
  const cached = responseCache.get(key);
  if (cached && Date.now() - cached.at < CLIENT_CACHE_MS) return cached.promise;

  const promise = fetch(`/api/cms/page-edits?path=${apiPath(slug)}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  })
    .then((res) =>
      res.ok ? (res.json() as Promise<EditsResponse>) : { edits: null },
    )
    .then((body) =>
      Array.isArray(body?.edits?.instructions) ? body.edits.instructions : null,
    )
    .catch((error) => {
      responseCache.delete(key);
      warn("could not load edits", error);
      return null;
    });

  responseCache.set(key, { at: Date.now(), promise });
  return promise;
}

function fetchStamp(slug: string): Promise<Stamp | null> {
  return fetch(`/api/cms/live?path=${apiPath(slug)}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  })
    .then((res) => (res.ok ? res.json() : null))
    .then((body: { stamp?: Stamp | null } | null) => body?.stamp ?? null)
    .catch(() => null);
}

/**
 * Who gets live (no-refresh) updates:
 *  - default / NEXT_PUBLIC_CMS_LIVE_UPDATES=all → every open tab. Polling is
 *    one tiny same-origin request per 5s while the tab is visible; ERP calls
 *    are shared server-side, so the ERP load doesn't grow with visitors.
 *  - =off → nobody (changes show on the next page load).
 *  - =editor → only a browser that opened the site from the ERP (Publish
 *    adds ?erp_v=…; remembered for 30 days), the ERP's "Live page" iframe,
 *    or ?erp_live=1. ?erp_live=0 switches it off again.
 */
function liveModeEnabled(): boolean {
  const setting = process.env.NEXT_PUBLIC_CMS_LIVE_UPDATES ?? "all";
  if (setting === "off") return false;
  if (setting === "all") return true;

  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("erp_live") === "0") {
      localStorage.removeItem(LIVE_FLAG_KEY);
      return false;
    }
    if (params.has("erp_v") || params.get("erp_live") === "1")
      localStorage.setItem(LIVE_FLAG_KEY, String(Date.now()));
    const since = Number(localStorage.getItem(LIVE_FLAG_KEY));
    if (since && Date.now() - since < LIVE_FLAG_DAYS * 86_400_000) return true;
  } catch {
    // Storage blocked: fall through to the iframe check.
  }

  try {
    return window.self !== window.top;
  } catch {
    return true; // Cross-origin parent: we are framed (the ERP preview).
  }
}

function hide() {
  document.documentElement.setAttribute(ERP_PENDING_ATTR, "");
}

function reveal() {
  document.documentElement.removeAttribute(ERP_PENDING_ATTR);
}

export function ErpPageEdits({
  editedSlugs,
  antiFlicker = true,
}: {
  editedSlugs: string[];
  antiFlicker?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isRefreshing, startTransition] = useTransition();
  // Bumped by live updates to undo + re-apply the current page's edits.
  const [revision, setRevision] = useState(0);
  // True while a re-run is caused by a live update (no anti-flicker hide).
  const liveRerun = useRef(false);
  // Primitive key: a re-rendered layout passing an equal list must not
  // re-run the effect (re-applying would duplicate copies again).
  const editedKey = editedSlugs.join("\n");

  useLayoutEffect(() => {
    // A live server refresh is in flight: the cleanup of the previous run has
    // restored the original DOM for React to patch; apply once it commits.
    if (isRefreshing) return;

    const slug = normalizeSlug(pathname);
    const edited = new Set(editedKey ? editedKey.split("\n") : []);
    const isLive = liveRerun.current;
    liveRerun.current = false;

    let cancelled = false;
    let undo: (() => void) | null = null;
    let frame = 0;
    let retry: ReturnType<typeof setTimeout> | undefined;

    // `editedSlugs` is baked into the (possibly ISR-cached) HTML, so it only
    // drives anti-flicker. Whether edits exist is always asked of
    // /api/cms/page-edits, which checks the live B1 list server-side and never
    // requests a 404 from the ERP. On hard loads the inline <head> script has
    // already hidden <main>; on client navigations this runs before paint.
    if (antiFlicker && !isLive && edited.has(slug)) hide();
    const revealTimer = setTimeout(reveal, MAX_HIDE_MS);

    const applyWhenReady = (
      instructions: PageEditInstruction[],
      attempt: number,
    ) => {
      // Wait for the new route's DOM to commit before touching it.
      frame = requestAnimationFrame(() => {
        if (cancelled) return;
        if (
          !anyPlainSelectorResolves(instructions) &&
          attempt < DOM_WAIT_ATTEMPTS
        ) {
          // Route DOM may still be streaming in; try again shortly.
          retry = setTimeout(
            () => applyWhenReady(instructions, attempt + 1),
            DOM_WAIT_INTERVAL_MS,
          );
          return;
        }
        try {
          undo = applyPageEdits(instructions).undo;
        } catch (error) {
          warn("failed to apply edits", error);
        }
        reveal();
      });
    };

    fetchEdits(slug, revision).then((instructions) => {
      if (cancelled) return;
      if (!instructions || instructions.length === 0) {
        reveal();
        return;
      }
      applyWhenReady(instructions, 0);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      clearTimeout(retry);
      clearTimeout(revealTimer);
      // Restore moved/hidden/edited nodes and drop copies before React touches them.
      undo?.();
      undo = null;
      reveal();
    };
  }, [pathname, editedKey, antiFlicker, revision, isRefreshing]);

  // Live updates: poll the publish fingerprint for this path while visible.
  useEffect(() => {
    if (!liveModeEnabled()) return;

    const slug = normalizeSlug(pathname);
    let cancelled = false;
    let baseline: Stamp | undefined;
    let inFlight = false;

    const check = async () => {
      if (inFlight || document.visibilityState !== "visible") return;
      inFlight = true;
      const stamp = await fetchStamp(slug);
      inFlight = false;
      if (cancelled || !stamp) return;
      if (!baseline) {
        baseline = stamp;
        return;
      }
      const pageChanged = stamp.page !== baseline.page;
      const editsChanged = stamp.edits !== baseline.edits;
      baseline = stamp;
      if (!pageChanged && !editsChanged) return;

      liveRerun.current = true;
      setRevision((r) => r + 1);
      // Created page changed: re-render it from the server in place. The
      // edits are undone while the refresh is pending and re-applied after.
      if (pageChanged) startTransition(() => router.refresh());
    };

    void check();
    const timer = setInterval(check, LIVE_POLL_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") void check();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onVisible);

    return () => {
      cancelled = true;
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onVisible);
    };
  }, [pathname, router]);

  return null;
}
