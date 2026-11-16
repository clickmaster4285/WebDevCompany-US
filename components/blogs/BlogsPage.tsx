import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { blogs } from "@/data/blogs";
import {
  getErpBlogArticle,
  getLiveErpBlogEntries,
  isoDate,
} from "@/lib/cms/blog-posts";
import { BlogsHero } from "./BlogsHero";
import { BlogsGrid, type BlogListItem } from "./BlogsGrid";

// Card fields only: the article bodies must not ship to the listing's client.
const CODE_POSTS: BlogListItem[] = blogs.map((b) => ({
  id: b.id,
  slug: b.slug,
  title: b.title,
  excerpt: b.excerpt,
  category: b.category,
  author: b.author,
  date: b.date,
  readTime: b.readTime,
  image: b.image,
  hero: b.hero ? { description: b.hero.description } : undefined,
}));

/** Published (indexable) ERP posts as listing cards, newest first. */
async function erpListItems(): Promise<BlogListItem[]> {
  // Capped: each card loads its post (cached ~60s); the ERP rate-limits
  // public calls per IP, so a large blog must not fan out unbounded.
  const entries = await getLiveErpBlogEntries(24);
  const articles = await Promise.all(
    entries.map((e) => getErpBlogArticle(e.slug)),
  );
  return articles
    .filter((a) => a !== null && !a.noindex)
    .map((a, i) => ({
      id: blogs.length + i + 1,
      slug: a!.slug,
      title: a!.title,
      excerpt: a!.summary || a!.metaDescription,
      category: "Blog",
      author: a!.author || "ClickMasters Team",
      date: isoDate(a!.publishedAt) || "",
      readTime: a!.readTime,
      image: a!.image,
    }));
}

export async function BlogsPage() {
  const erpPosts = await erpListItems();
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Nav />
      <BlogsHero />
      {/* Renders the search box and the grid (they share the filter state). */}
      <BlogsGrid posts={[...erpPosts, ...CODE_POSTS]} />
      <Footer />
    </main>
  );
}
