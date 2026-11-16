import { getLivePageEdits } from "@/lib/cms/client";

// Same-origin proxy for B2 so the browser never talks to the ERP directly
// (keeps CMS_API_URL private and the CSP unchanged). Always 200:
// { edits: null } means "leave the page untouched".
//
// Never cached by Next, a CDN or the browser, so a publish in the ERP shows
// on the very next page load. Upstream calls are still de-duplicated for a
// few seconds in lib/cms/client.ts to respect the ERP's per-IP rate limit.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HEADERS = {
  "Cache-Control": "no-store, max-age=0",
  "CDN-Cache-Control": "no-store",
};

export async function GET(request: Request) {
  const path = new URL(request.url).searchParams.get("path") ?? "/";
  if (path.length > 512)
    return Response.json({ edits: null }, { headers: HEADERS });

  try {
    const edits = await getLivePageEdits(path);
    return Response.json(
      {
        edits:
          edits && edits.instructions.length > 0
            ? {
                version: edits.version ?? null,
                instructions: edits.instructions,
              }
            : null,
      },
      { headers: HEADERS },
    );
  } catch {
    return Response.json({ edits: null }, { headers: HEADERS });
  }
}
