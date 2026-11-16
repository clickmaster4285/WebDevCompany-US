import { cache } from "react";
import { blogs } from "@/data/blogs";
import { clampDescription } from "@/lib/seo";
import { blogSlugFromCmsSlug, cmsBlogSlugRank } from "./blog-slugs";
import { getCmsPage, getCmsPages } from "./client";
import { safeImageUrl, text } from "./sanitize";
import { normalizeSlug } from "./slug";
import type { CmsPage, CmsSection } from "./types";

// ERP-created blog posts, rendered at /blogs/<slug> by the site's blog
// template. Code posts in data/blogs.ts always win on a slug clash.
// Server-only data helpers: no component imports, so the sitemap and the
// /blog redirect route stay light.

export type ErpBlogEntry = {
  /** Public slug: /blogs/<slug>. */
  slug: string;
  /** Normalized ERP slug used to fetch the page. */
  cmsSlug: string;
  title?: string;
  publishedAt?: string;
  noindex: boolean;
};

const CODE_BLOG_SLUGS = new Set(blogs.map((b) => b.slug));

/**
 * Approved SEO copy for specific ERP posts. Used only when the ERP leaves the
 * field empty, so values set in the ERP's SEO panel always win.
 */
const SEO_DEFAULTS: Readonly<
  Record<string, { title: string; description: string }>
> = {
  "web-development-company": {
    title: "Web Development Company: How to Choose the Right Partner",
    description:
      "Learn how to choose the right web development company, compare services and technologies, and find a development partner for your business.",
  },
};

function timeOf(value: string | undefined): number {
  const t = value ? Date.parse(value) : NaN;
  return Number.isNaN(t) ? 0 : t;
}

/** Published ERP blog posts (newest first); [] when the ERP is down/unset. */
export const getErpBlogEntries = cache(async (): Promise<ErpBlogEntry[]> => {
  // Several ERP slugs may map to one public slug; the lowest rank is served.
  const best = new Map<string, { entry: ErpBlogEntry; rank: number }>();
  for (const page of await getCmsPages()) {
    if (typeof page?.slug !== "string") continue;
    const cmsSlug = normalizeSlug(page.slug);
    const slug = blogSlugFromCmsSlug(cmsSlug);
    if (!slug || CODE_BLOG_SLUGS.has(slug)) continue;
    const rank = cmsBlogSlugRank(cmsSlug);
    const current = best.get(slug);
    if (current && current.rank <= rank) continue;
    best.set(slug, {
      rank,
      entry: {
        slug,
        cmsSlug,
        title: typeof page.title === "string" ? page.title : undefined,
        publishedAt:
          typeof page.publishedAt === "string" ? page.publishedAt : undefined,
        noindex: page.noindex === true,
      },
    });
  }
  return [...best.values()]
    .map((v) => v.entry)
    .sort((a, b) => timeOf(b.publishedAt) - timeOf(a.publishedAt));
});

/**
 * True when /blogs/<slug> actually renders: a code post, or an ERP post whose
 * page loads (not merely listed), so a redirect can never lead into a 404.
 */
export async function blogPostExists(slug: string): Promise<boolean> {
  if (CODE_BLOG_SLUGS.has(slug)) return true;
  return (await getErpBlogArticle(slug)) !== null;
}

/**
 * Contextual "related reading" links from code pages to ERP posts. A link is
 * rendered only while the post is published and indexable, so these can
 * never become broken links.
 */
const CONTEXTUAL_POSTS: Readonly<Record<string, readonly string[]>> = {
  "/faqs/how-to-choose-web-development-company": ["web-development-company"],
  "/web-development-services": ["web-development-company"],
};

export async function contextualBlogLinks(
  path: string,
): Promise<{ href: string; label: string; description?: string }[]> {
  const wanted = Object.prototype.hasOwnProperty.call(CONTEXTUAL_POSTS, path)
    ? CONTEXTUAL_POSTS[path]
    : [];
  if (wanted.length === 0) return [];
  const entries = await getErpBlogEntries();
  const live = await Promise.all(
    wanted.map(async (slug) => {
      const entry = entries.find((e) => e.slug === slug && !e.noindex);
      const article = entry ? await getErpBlogArticle(slug) : null;
      return article && !article.noindex ? entry : undefined;
    }),
  );
  return live.flatMap((entry) => {
    return entry
      ? [
          {
            href: `/blogs/${entry.slug}`,
            label: entry.title?.trim() || entry.slug.replace(/-/g, " "),
            description: "Related article",
          },
        ]
      : [];
  });
}

export type ErpBlogArticle = {
  slug: string;
  title: string;
  /** Plain-text summary (hero lead or first body text); may be "". */
  summary: string;
  /** Full <title> (no brand suffix added), or undefined for the default. */
  seoTitle?: string;
  metaDescription: string;
  /** http(s) or site-relative image URL (never a data: URI). */
  image?: string;
  badge?: string;
  author?: string;
  publishedAt?: string;
  readTime: string;
  noindex: boolean;
  /** CMS page with the leading hero removed (the blog hero replaces it). */
  body: CmsPage;
  page: CmsPage;
};

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  mdash: "—", ndash: "–", hellip: "…", lsquo: "‘", rsquo: "’",
  ldquo: "“", rdquo: "”", copy: "©", reg: "®", trade: "™", bull: "•",
};

function decodeEntities(value: string): string {
  return value.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code: string) => {
    if (code[0] === "#") {
      const n = code[1] === "x" || code[1] === "X"
        ? parseInt(code.slice(2), 16)
        : parseInt(code.slice(1), 10);
      return Number.isFinite(n) && n > 0 && n <= 0x10ffff
        ? String.fromCodePoint(n)
        : match;
    }
    return NAMED_ENTITIES[code.toLowerCase()] ?? match;
  });
}

/** Rich text / HTML -> plain text (tags stripped, entities decoded). */
function plain(html: unknown): string {
  return decodeEntities(text(html).replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

/** Only images usable as og:image / JSON-LD (no data: URIs). */
function shareableImage(value: unknown): string | undefined {
  const url = safeImageUrl(value);
  return url && /^(https?:\/\/|\/(?!\/))/i.test(url) ? url : undefined;
}

/** Content fields that hold reader-facing prose (for the reading time). */
const PROSE_KEYS = new Set([
  "heading", "title", "subheading", "description", "body", "bodyHtml",
  "html", "text", "content", "question", "answer", "quote", "caption",
  "items", "steps", "faqs",
]);

function proseWords(value: unknown, depth = 0): number {
  if (depth > 6) return 0;
  if (typeof value === "string") {
    if (/^(https?:|\/|#|data:)/i.test(value.trim())) return 0; // URLs, ids
    return plain(value).split(" ").filter(Boolean).length;
  }
  if (Array.isArray(value))
    return value.reduce((n: number, v) => n + proseWords(v, depth + 1), 0);
  if (value && typeof value === "object")
    return Object.entries(value).reduce(
      (n: number, [key, v]) =>
        PROSE_KEYS.has(key) ? n + proseWords(v, depth + 1) : n,
      0,
    );
  return 0;
}

/** Content sections in render order (mirrors CmsSectionRenderer's rules). */
function orderedSections(sections: CmsSection[] | undefined): CmsSection[] {
  if (!Array.isArray(sections)) return [];
  return sections
    .filter(
      (s): s is CmsSection =>
        !!s &&
        typeof s === "object" &&
        typeof s.type === "string" &&
        s.type !== "header" &&
        s.type !== "footer" &&
        (s.hidden !== true || s.settings?.required === true),
    )
    .map((s, index) => ({ s, index }))
    .sort(
      (a, b) =>
        (Number(a.s.order) || 0) - (Number(b.s.order) || 0) ||
        a.index - b.index,
    )
    .map(({ s }) => s);
}

function firstBodyText(sections: CmsSection[]): string {
  for (const s of sections) {
    const c = s.content ?? {};
    const value =
      plain(c.body) ||
      plain(c.bodyHtml) ||
      plain(c.html) ||
      plain(c.description);
    if (value) return value;
  }
  return "";
}

/** Blog view model for /blogs/<slug>, or null when no ERP post matches. */
export const getErpBlogArticle = cache(
  async (slug: string): Promise<ErpBlogArticle | null> => {
    const entry = (await getErpBlogEntries()).find((e) => e.slug === slug);
    if (!entry) return null;
    const page = await getCmsPage(entry.cmsSlug);
    if (!page) return null;

    const sections = orderedSections(page.sections);
    const hero = sections[0]?.type === "hero" ? sections[0].content ?? {} : null;
    const bodySections = hero ? sections.slice(1) : sections;
    const author = sections.find((s) => s.type === "author")?.content?.name;

    const title =
      plain(hero?.heading) ||
      plain(page.title) ||
      plain(entry.title) ||
      slug.replace(/-/g, " ");
    const summary = plain(hero?.description) || firstBodyText(bodySections);
    // Body prose only: the hero is shown separately and is short.
    const words = bodySections.reduce((n, s) => n + proseWords(s.content), 0);
    const defaults = Object.prototype.hasOwnProperty.call(SEO_DEFAULTS, slug)
      ? SEO_DEFAULTS[slug]
      : undefined;

    return {
      slug,
      title,
      summary,
      seoTitle: plain(page.seo?.title) || defaults?.title,
      metaDescription: clampDescription(
        plain(page.seo?.metaDescription) ||
          defaults?.description ||
          summary ||
          title,
      ),
      image:
        shareableImage(page.featuredImage) ??
        shareableImage(hero?.image) ??
        shareableImage(page.seo?.ogImage),
      badge: plain(hero?.eyebrow) || undefined,
      author: plain(author) || undefined,
      publishedAt: page.publishedAt ?? entry.publishedAt,
      readTime: `${Math.max(1, Math.round(words / 200))} min read`,
      noindex: entry.noindex || page.noindex === true,
      body: { ...page, sections: bodySections },
      page,
    };
  },
);

/**
 * Indexable ERP posts whose page actually loads (newest first), at most
 * `limit`. Everything that links to or lists ERP posts uses this, so a post
 * that is listed by the ERP but fails to load is never linked or in the
 * sitemap. Each check is a cached (~60s) page fetch, stopping at `limit`.
 */
export async function getLiveErpBlogEntries(
  limit = Infinity,
): Promise<ErpBlogEntry[]> {
  const out: ErpBlogEntry[] = [];
  for (const entry of await getErpBlogEntries()) {
    if (out.length >= limit) break;
    if (entry.noindex) continue;
    const article = await getErpBlogArticle(entry.slug);
    if (article && !article.noindex) out.push(entry);
  }
  return out;
}

/** "2026-11-14T09:30:00Z" -> "2026-11-14" (the format code posts use). */
export function isoDate(value: string | undefined): string | undefined {
  const t = timeOf(value);
  return t ? new Date(t).toISOString().slice(0, 10) : undefined;
}
