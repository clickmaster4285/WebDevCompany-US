// app/(serv-tech-industry)/[...slug]/page.tsx
import { pages } from '@/data/tech-serv-industry';
import IndustryPageTemplate from '@/components/services-tech-industry/Mainslugpag';
import { CategoryOverview } from '@/components/services-tech-industry/CategoryOverview';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Helper: group pages by category
function getCategoryPages(category: string) {
  return Object.entries(pages).filter(([slug]) => 
    slug.startsWith(category + '/') && !slug.startsWith('technologies/')
  );
}

// 1. Pre-render all pages at build time
export async function generateStaticParams() {
  const categories = new Set(Object.keys(pages).map((slug) => slug.split('/')[0]));
  const params: { slug: string[] }[] = [];

  // Multi-segment slugs (detail pages like /shopify/hospitality)
  // Exclude technology pages since they're now handled by the dedicated technologies route
  for (const slug of Object.keys(pages)) {
    if (!slug.startsWith('technologies/')) {
      params.push({ slug: slug.split('/') });
    }
  }

  // Single-segment slugs (category overview pages like /shopify)
  // Exclude technologies since it's now a dedicated route
  for (const category of categories) {
    if (category !== 'technologies') {
      params.push({ slug: [category] });
    }
  }

  return params;
}

// 2. Dynamic SEO Metadata (Next.js 15/16 compatible)
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string[] }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const slugKey = slug.join('/');

  // --- Single segment = Category overview ---
  if (slug.length === 1) {
    const category = slug[0];
    const categoryPages = getCategoryPages(category);
    if (categoryPages.length === 0) return { title: 'Page Not Found' };
    return {
      title: `${category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())} Solutions`,
      description: `Explore our ${category.replace(/-/g, ' ')} solutions across industries.`,
    };
  }

  // --- Industry/service detail pages ---
  const pageData = pages[slugKey];
  if (!pageData) return { title: 'Page Not Found' };

  return {
    title: pageData.title,
    description: pageData.hero.description,
  };
}

// 3. The Page Component (Next.js 15/16 compatible)
export default async function ServTechIndustryPage({ 
  params 
}: { 
  params: Promise<{ slug: string[] }> 
}) {
  const { slug } = await params;
  const slugKey = slug.join('/');

  // --- Single segment = Category overview ---
  if (slug.length === 1) {
    const category = slug[0];
    const categoryPages = getCategoryPages(category);
    if (categoryPages.length === 0) notFound();
    return <CategoryOverview category={category} pages={categoryPages} />;
  }

  // --- Industry/service detail pages ---
  const pageData = pages[slugKey];
  if (!pageData) notFound();

  return <IndustryPageTemplate data={pageData} />;
}