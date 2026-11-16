import { revalidatePath, revalidateTag } from "next/cache";
import { getLiveStamp } from "@/lib/cms/client";
import { CMS_TAG_EDITS, CMS_TAG_PAGES } from "@/lib/cms/config";
import { normalizeSlug, slugToPath } from "@/lib/cms/slug";

// GET /api/cms/live?path=/a/b → { stamp: { edits, page } | null }
//
// A fingerprint of what the ERP has published for a path, polled by
// ErpPageEdits in live mode so an open tab picks up a publish without a
// reload. Built only from the ERP's two list endpoints (de-duplicated
// in-process), so polling is cheap for the ERP.
//
// It also doubles as a fallback for the ERP's revalidate webhook (which can't
// reach local/dev servers): when this server sees a path's fingerprint change,
// it expires that path's cached HTML/data once, so the tab's server refresh
// (and the next visitor) gets the new version instead of a 60s-old copy. The
// trigger is ERP data changing, never anything the caller sends.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HEADERS = {
  "Cache-Control": "no-store, max-age=0",
  "CDN-Cache-Control": "no-store",
};

const PATH_PATTERN = /^\/[a-z0-9\-._~%/]*$/i;
const lastSeen = new Map<string, string>();

export async function GET(request: Request) {
  const raw = new URL(request.url).searchParams.get("path") ?? "/";
  if (raw.length > 512)
    return Response.json({ stamp: null }, { headers: HEADERS });

  try {
    const path = slugToPath(normalizeSlug(raw));
    const stamp = await getLiveStamp(path);
    if (!stamp) return Response.json({ stamp: null }, { headers: HEADERS });

    const key = `${stamp.edits}\n${stamp.page}`;
    const previous = lastSeen.get(path);
    if (lastSeen.size > 2000 && previous === undefined) lastSeen.clear();
    lastSeen.set(path, key);
    if (previous !== undefined && previous !== key && PATH_PATTERN.test(path)) {
      revalidateTag(CMS_TAG_EDITS, { expire: 0 });
      revalidateTag(CMS_TAG_PAGES, { expire: 0 });
      revalidatePath(path);
    }

    return Response.json({ stamp }, { headers: HEADERS });
  } catch {
    return Response.json({ stamp: null }, { headers: HEADERS });
  }
}
