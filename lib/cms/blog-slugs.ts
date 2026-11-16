import { normalizeSlug } from "./slug";

// ERP-created blog posts are served by the site's own blog template at
// /blogs/<slug>, whatever prefix the ERP stored ("blog/<slug>" or
// "blogs/<slug>"). Dependency-free so the ERP client, sitemap and routes can
// all share one mapping.

/**
 * Published slugs that were misspelled, mapped to the corrected slug. The
 * old URL 301s to the corrected one, and an ERP post still stored under the
 * old slug is served (and listed) at the corrected URL only.
 */
export const BLOG_SLUG_ALIASES: Readonly<Record<string, string>> = {
  "web-development-comapny": "web-development-company",
};

export function correctBlogSlug(slug: string): string {
  return Object.prototype.hasOwnProperty.call(BLOG_SLUG_ALIASES, slug)
    ? BLOG_SLUG_ALIASES[slug]
    : slug;
}

/** ERP slug "blog/x" | "blogs/x" -> corrected "x"; anything else -> null. */
export function blogSlugFromCmsSlug(cmsSlug: string): string | null {
  const parts = normalizeSlug(cmsSlug).split("/");
  if (parts.length !== 2 || !parts[1]) return null;
  if (parts[0] !== "blog" && parts[0] !== "blogs") return null;
  return correctBlogSlug(parts[1]);
}

/**
 * Rewrite an internal link to an ERP blog post ("/blog/x") to the URL it is
 * served at ("/blogs/x"), so links never point at a redirect. Other links,
 * external URLs and protocol-relative URLs are returned unchanged.
 */
export function blogAwareHref(url: string): string {
  if (!url.startsWith("/") || url.startsWith("//")) return url;
  const cut = url.search(/[?#]/);
  const path = cut < 0 ? url : url.slice(0, cut);
  const suffix = cut < 0 ? "" : url.slice(cut); // keep ?query and #hash
  const blog = blogSlugFromCmsSlug(path);
  return blog ? `/blogs/${blog}${suffix}` : url;
}

/**
 * When several ERP slugs map to one public blog slug, the lowest rank is the
 * one served: exact "blogs/x", then "blog/x", then misspelled aliases. Used
 * by both the page lookup and the live-update fingerprint so they agree.
 */
export function cmsBlogSlugRank(cmsSlug: string): number {
  const [prefix, raw = ""] = normalizeSlug(cmsSlug).split("/");
  return (
    (prefix === "blogs" ? 0 : 1) +
    (Object.prototype.hasOwnProperty.call(BLOG_SLUG_ALIASES, raw) ? 2 : 0)
  );
}

/** Public path (normalized, no leading slash) at which an ERP page is served. */
export function siteSlugForCmsSlug(cmsSlug: string): string {
  const blog = blogSlugFromCmsSlug(cmsSlug);
  return blog ? `blogs/${blog}` : normalizeSlug(cmsSlug);
}
