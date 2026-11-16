import { getLiveErpBlogEntries } from "@/lib/cms/blog-posts";
import { blogSlugFromCmsSlug } from "@/lib/cms/blog-slugs";
import { getCmsPages } from "@/lib/cms/client";
import { canonicalUrl } from "@/lib/cms/config";
import { isCodeOwnedPath } from "@/lib/cms/routes";
import { normalizeSlug, slugToPath } from "@/lib/cms/slug";

// Published ERP-created pages, listed in the sitemap index (sitemap.xml) by
// scripts/generate-sitemaps.js. Dynamic (revalidated ~60s) so a page
// published after the build appears without a redeploy. Skips noindex pages
// and paths a code-owned route shadows. Empty when the ERP is down.

export const revalidate = 60;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function urlEntry(path: string, publishedAt: string | undefined): string {
  const lastmod =
    publishedAt && !Number.isNaN(Date.parse(publishedAt))
      ? `\n    <lastmod>${new Date(publishedAt).toISOString()}</lastmod>`
      : "";
  return `  <url>\n    <loc>${escapeXml(canonicalUrl(path))}</loc>${lastmod}\n  </url>`;
}

export async function GET() {
  const seen = new Set<string>();
  const urls: string[] = [];

  // ERP blog posts are served (and listed) at /blogs/<slug>, never at the
  // ERP's /blog/<slug> path, which only redirects.
  // Only posts whose page loads: a sitemap URL must never be a 404.
  for (const entry of await getLiveErpBlogEntries()) {
    const path = `/blogs/${entry.slug}`;
    seen.add(path);
    urls.push(urlEntry(path, entry.publishedAt));
  }

  for (const page of await getCmsPages()) {
    if (typeof page?.slug !== "string" || page.noindex === true) continue;
    if (blogSlugFromCmsSlug(page.slug)) continue; // handled above
    const path = slugToPath(normalizeSlug(page.slug));
    // /blog/* 301s to /blogs/*, and the misspelled company article 301s to
    // its corrected slug. Neither source URL should be submitted.
    const slug = normalizeSlug(page.slug);
    if (
      slug === "blog" ||
      slug.startsWith("blog/") ||
      slug === "web-development-comapny" ||
      slug.endsWith("/web-development-comapny")
    ) {
      continue;
    }
    if (seen.has(path) || isCodeOwnedPath(path)) continue;
    seen.add(path);
    urls.push(urlEntry(path, page.publishedAt));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}${urls.length ? "\n" : ""}</urlset>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
