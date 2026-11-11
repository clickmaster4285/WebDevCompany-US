// Called by the ERP right after a created or edited page is published,
// unpublished or deleted, so the change shows on the next page load instead
// of after the ~60s cache runs out.
//   POST /api/erp-revalidate   { "path": "/services/x" }
//   Header: Authorization: Bearer <ERP_REVALIDATE_SECRET>
// The same secret must be set as ERP_REVALIDATE_SECRET in the ERP backend.

import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { clearFreshCmsCache } from "@/lib/cms/client";
import {
  CMS_TAG_EDITS,
  CMS_TAG_PAGES,
  CMS_TAG_SITE,
} from "@/lib/cms/config";
import { normalizeSlug, slugToPath } from "@/lib/cms/slug";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };
const PATH_PATTERN = /^\/[a-z0-9\-._~%/]*$/i;

function authorized(request: Request): boolean {
  const secret = process.env.ERP_REVALIDATE_SECRET;
  if (!secret) return false;
  const given = Buffer.from(
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "",
  );
  const expected = Buffer.from(secret);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

export async function POST(request: Request) {
  if (!authorized(request)) {
    return Response.json(
      { ok: false, message: "Unauthorized" },
      { status: 401, headers: NO_STORE },
    );
  }

  let raw = "/";
  try {
    const body = (await request.json()) as { path?: unknown };
    if (typeof body.path === "string" && body.path.length <= 1024)
      raw = body.path;
  } catch {
    // No body: refresh the shared caches only.
  }

  // Expire now (not stale-while-revalidate): the next request refetches.
  clearFreshCmsCache();
  revalidateTag(CMS_TAG_EDITS, { expire: 0 });
  revalidateTag(CMS_TAG_PAGES, { expire: 0 });
  revalidateTag(CMS_TAG_SITE, { expire: 0 });

  const path = slugToPath(normalizeSlug(raw));
  if (PATH_PATTERN.test(path)) revalidatePath(path);

  return Response.json({ ok: true, path }, { headers: NO_STORE });
}
