import { cache } from "react";
import {
  CMS_REVALIDATE_SECONDS,
  CMS_TAG_EDITS,
  CMS_TAG_PAGES,
  CMS_TAG_SITE,
  cmsBaseUrl,
  cmsWarn,
} from "./config";
import { normalizeFlatEdits, normalizeSectionEdits } from "./edits";
import { encodeSlugForUrl, normalizeSlug } from "./slug";
import type { CmsPage, CmsPageSummary, CmsSiteInfo, PageEdits } from "./types";

// All ERP calls are public GETs. Every helper resolves to null/[] on any
// failure so the site renders exactly as if the ERP did not exist.
//
// Two read modes:
//  - cached: Next.js data cache, ~60s, tagged (pages, layouts, metadata).
//  - fresh:  bypasses Next's cache, used only by the browser-facing API
//            routes. Still de-duplicated in-process for FRESH_TTL_MS: the ERP
//            rate-limits public calls to 120/min per IP and every call from
//            this site shares one IP, so N visitors must not mean N calls.

const REQUEST_TIMEOUT_MS = 4000;
const FRESH_TTL_MS = 5000;
// After repeated network failures, skip the ERP for a while instead of paying
// the timeout on every page (matters during `next build` with a dead host).
const CIRCUIT_OPEN_MS = 30_000;
const CIRCUIT_FAILURE_THRESHOLD = 3;
let circuitOpenUntil = 0;
let consecutiveFailures = 0;

type CmsResult<T> = { status: number; data: T | null };
type Mode = { fresh?: boolean; tags?: string[] };

async function request<T>(
  url: string,
  { fresh = false, tags = [] }: Mode,
): Promise<CmsResult<T> | null> {
  if (Date.now() < circuitOpenUntil) return null;

  const doFetch = () =>
    fetch(url, {
      headers: fresh
        ? { Accept: "application/json", "Cache-Control": "no-cache" }
        : { Accept: "application/json" },
      ...(fresh
        ? { cache: "no-store" as const }
        : { next: { revalidate: CMS_REVALIDATE_SECONDS, tags } }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

  try {
    let res: Response;
    try {
      res = await doFetch();
    } catch (error) {
      // One retry for connection-level errors (e.g. a reused keep-alive
      // socket the server already closed); timeouts are not retried.
      if (
        error instanceof Error &&
        (error.name === "TimeoutError" || error.name === "AbortError")
      )
        throw error;
      res = await doFetch();
    }

    consecutiveFailures = 0;
    if (res.status === 404) return { status: 404, data: null };
    if (!res.ok) {
      cmsWarn(`GET ${url} -> ${res.status}`);
      return { status: res.status, data: null };
    }

    const json = (await res.json()) as { data?: T } | T;
    const data =
      json && typeof json === "object" && "data" in (json as object)
        ? ((json as { data?: T }).data ?? null)
        : (json as T);
    return { status: res.status, data };
  } catch (error) {
    consecutiveFailures++;
    if (consecutiveFailures >= CIRCUIT_FAILURE_THRESHOLD) {
      circuitOpenUntil = Date.now() + CIRCUIT_OPEN_MS;
      consecutiveFailures = 0;
    }
    const cause =
      error instanceof Error && error.cause instanceof Error
        ? ` (${error.cause.message})`
        : "";
    cmsWarn(
      `GET ${url} failed:`,
      error instanceof Error ? `${error.message}${cause}` : error,
    );
    return null;
  }
}

const freshMemo = new Map<
  string,
  { at: number; promise: Promise<CmsResult<unknown> | null> }
>();

/** Drop the in-process fresh cache (called by /api/erp-revalidate). */
export function clearFreshCmsCache(): void {
  freshMemo.clear();
}

async function cmsGet<T>(
  path: string,
  mode: Mode = {},
): Promise<CmsResult<T> | null> {
  const base = cmsBaseUrl();
  if (!base) return null;
  const url = `${base}${path}`;
  if (!mode.fresh) return request<T>(url, mode);

  const hit = freshMemo.get(url);
  if (hit && Date.now() - hit.at < FRESH_TTL_MS)
    return hit.promise as Promise<CmsResult<T> | null>;

  const promise = request<T>(url, mode);
  freshMemo.set(url, { at: Date.now(), promise });
  if (freshMemo.size > 500) {
    const cutoff = Date.now() - FRESH_TTL_MS;
    for (const [key, value] of freshMemo)
      if (value.at < cutoff) freshMemo.delete(key);
  }
  return promise;
}

/* ------------------------------ Part A ------------------------------ */

/** A1 — site info, design colors and navigation. */
export const getCmsSiteInfo = cache(async (): Promise<CmsSiteInfo | null> => {
  const result = await cmsGet<CmsSiteInfo>("", { tags: [CMS_TAG_SITE] });
  return result?.data ?? null;
});

async function loadCmsPages(fresh: boolean): Promise<CmsPageSummary[]> {
  const result = await cmsGet<{ pages?: CmsPageSummary[] }>("/pages", {
    fresh,
    tags: [CMS_TAG_PAGES],
  });
  const pages = result?.data?.pages;
  return Array.isArray(pages) ? pages : [];
}

/** A2 — list of created pages. */
export const getCmsPages = cache(() => loadCmsPages(false));

/** A3 — one created page by (normalized) slug; null when missing or ERP down. */
export const getCmsPage = cache(
  async (slug: string): Promise<CmsPage | null> => {
    const normalized = normalizeSlug(slug);
    const result = await cmsGet<{ page?: CmsPage }>(
      normalized === "/"
        ? `/page?slug=${encodeURIComponent("/")}`
        : `/pages/${encodeSlugForUrl(normalized)}`,
      { tags: [CMS_TAG_PAGES] },
    );
    const page = result?.data?.page;
    return page && typeof page === "object" ? page : null;
  },
);

/* ------------------------------ Part B ------------------------------ */

async function loadEditedPages(fresh: boolean): Promise<CmsPageSummary[]> {
  const result = await cmsGet<{ pages?: CmsPageSummary[] }>("/edited-pages", {
    fresh,
    tags: [CMS_TAG_EDITS],
  });
  const pages = result?.data?.pages;
  return Array.isArray(pages) ? pages : [];
}

function slugsOf(pages: CmsPageSummary[]): string[] {
  return Array.from(
    new Set(
      pages
        .map((p) =>
          typeof p?.slug === "string" ? normalizeSlug(p.slug) : null,
        )
        .filter((s): s is string => !!s),
    ),
  );
}

/** B2 — edits for one path. Checks the B1 list first so we never request 404s. */
async function loadPageEdits(
  path: string,
  fresh: boolean,
): Promise<PageEdits | null> {
  const slug = normalizeSlug(path);
  if (!slugsOf(await loadEditedPages(fresh)).includes(slug)) return null;

  const requestPath = slug === "/" ? "/" : `/${slug}`;
  const mode = { fresh, tags: [CMS_TAG_EDITS] };

  // Flat form used by website loaders.
  const flat = await cmsGet<{
    title?: string;
    seo?: PageEdits["seo"];
    patches?: unknown;
    operations?: unknown;
    version?: number | string;
    publishedAt?: string;
  }>(`/page-edits?path=${encodeURIComponent(requestPath)}`, mode);

  if (flat?.status === 404) return null;
  if (flat?.data) {
    return {
      title: flat.data.title,
      seo: flat.data.seo,
      version: flat.data.version,
      publishedAt: flat.data.publishedAt,
      instructions: normalizeFlatEdits(flat.data.patches, flat.data.operations),
    };
  }

  // Fallback: sections (envelope) form.
  const envelope = await cmsGet<{
    page?: CmsPage & { version?: number | string };
  }>(
    slug === "/"
      ? `/edited-page?slug=${encodeURIComponent("/")}`
      : `/edited-pages/${encodeSlugForUrl(slug)}`,
    mode,
  );
  const page = envelope?.data?.page;
  if (!page) return null;
  return {
    title: page.title,
    seo: page.seo,
    version: page.version,
    publishedAt: page.publishedAt,
    instructions: normalizeSectionEdits(page.sections),
  };
}

/** B1 list, cached ~60s — for server-rendered HTML (anti-flicker list). */
export const getEditedPageSlugs = cache(async () =>
  slugsOf(await loadEditedPages(false)),
);

/** B2 edits, cached ~60s — for server-rendered SEO in generateMetadata. */
export const getPageEdits = cache((path: string) => loadPageEdits(path, false));

/** B2 edits, bypassing Next's cache — for the browser-facing API route. */
export const getLivePageEdits = cache((path: string) =>
  loadPageEdits(path, true),
);

/* --------------------------- live updates --------------------------- */

function stampOf(pages: CmsPageSummary[], slug: string): string {
  const entry = pages.find(
    (p) => typeof p?.slug === "string" && normalizeSlug(p.slug) === slug,
  );
  if (!entry) return "";
  return [entry.version ?? "", entry.publishedAt ?? "", entry.title ?? ""].join(
    "|",
  );
}

/**
 * A cheap fingerprint of what the ERP has published for `path`: one part for
 * its DOM edits, one for its created page. Uses only the two list endpoints
 * (fresh, de-duplicated), so polling it costs the ERP at most a couple of
 * requests per FRESH_TTL_MS regardless of how many tabs are open.
 * `null` when the ERP is unconfigured or unreachable.
 */
export async function getLiveStamp(
  path: string,
): Promise<{ edits: string; page: string } | null> {
  if (!cmsBaseUrl()) return null;
  const slug = normalizeSlug(path);
  const [edited, created] = await Promise.all([
    cmsGet<{ pages?: CmsPageSummary[] }>("/edited-pages", { fresh: true }),
    cmsGet<{ pages?: CmsPageSummary[] }>("/pages", { fresh: true }),
  ]);
  // Both lists must load: a transient failure must never look like
  // "the edits were unpublished" to an open tab.
  const editedPages = edited?.data?.pages;
  const createdPages = created?.data?.pages;
  if (!Array.isArray(editedPages) || !Array.isArray(createdPages)) return null;
  return {
    edits: stampOf(editedPages, slug),
    page: stampOf(createdPages, slug),
  };
}
