import { blogPostExists } from "@/lib/cms/blog-posts";
import { correctBlogSlug } from "@/lib/cms/blog-slugs";
import { normalizeSlug } from "@/lib/cms/slug";

// Legacy /blog/<slug> URLs (the ERP's default blog prefix). The site's blog
// lives at /blogs/<slug>, so a post that exists there gets one permanent 301
// hop (misspelled slugs go straight to the corrected one: no chain). Anything
// else is a plain 404: never a redirect into a 404, never a duplicate copy.
// Exact "/blog" is redirected to "/blogs" in next.config.ts.

type Context = { params: Promise<{ slug: string[] }> };

const NOT_FOUND_HTML = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Page Not Found | Clickmasters</title><meta name="viewport" content="width=device-width, initial-scale=1"></head><body style="font:16px/1.5 system-ui,sans-serif;max-width:32rem;margin:4rem auto;padding:0 1rem"><h1>Page not found</h1><p>This article has moved or no longer exists.</p><p><a href="/blogs">Browse all articles</a></p></body></html>`;

export async function GET(_request: Request, { params }: Context) {
  const { slug } = await params;
  const parts = normalizeSlug(slug).split("/");

  if (parts.length === 1 && parts[0] !== "/") {
    const target = correctBlogSlug(parts[0]);
    if (await blogPostExists(target)) {
      return new Response(null, {
        status: 301,
        headers: {
          Location: `/blogs/${encodeURIComponent(target)}`,
          // Short: if the post is unpublished, caches stop redirecting soon.
          "Cache-Control": "public, max-age=300",
        },
      });
    }
  }

  return new Response(NOT_FOUND_HTML, {
    status: 404,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex",
      "Cache-Control": "public, max-age=60",
    },
  });
}

export const HEAD = GET;
