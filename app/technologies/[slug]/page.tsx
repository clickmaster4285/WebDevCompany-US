import { technologies } from '@/data/technologies';
import { pages } from '@/data/tech-serv-industry';
import { TechnologyDetailPage } from '@/components/technologies/detail/TechnologyDetailPage';
import IndustryPageTemplate from '@/components/services-tech-industry/Mainslugpag';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// lib/metadata.ts: helper for consistent metadata, canonical URLs, OG & Twitter
import { getMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedPages } from "@/components/seo/RelatedPages";
import { absoluteUrl, breadcrumbJsonLd, clampDescription, SITE_URL } from "@/lib/seo";
import { industryLinksFromSlug, type RelatedLink } from "@/lib/related";

// 1. Pre-render all technology pages at build time
export async function generateStaticParams() {
  const params: { slug: string }[] = [];

  // Return params for all technologies (main + sub-pages)
  for (const tech of technologies) {
    params.push({ slug: tech.slug });
  }

  // Return params for industry-specific technology pages from tech-serv-industry
  for (const key of Object.keys(pages)) {
    if (key.startsWith('technologies/')) {
      const slug = key.replace('technologies/', '');
      params.push({ slug });
    }
  }

  return params;
}

// 2. Dynamic SEO Metadata (Next.js 15/16 compatible)
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;

  // First check if it's a technology (main or sub-page)
  const tech = technologies.find(t => t.slug === slug);
  if (tech) {
    return getMetadata({
      title: tech.title,
      description: tech.excerpt,
      slug: `technologies/${slug}`,
    });
  }

  // Then check if it's an industry-specific page from tech-serv-industry
  const industryPage = pages[`technologies/${slug}`];
  if (industryPage) {
    return getMetadata({
      title: industryPage.title,
      description: industryPage.hero.description,
      slug: `technologies/${slug}`,
    });
  }

  return { title: 'Page Not Found' };
}

function relatedTechnologyLinks(
  tech: (typeof technologies)[number],
  parentTechnology: (typeof technologies)[number] | undefined,
  subPages: (typeof technologies)[number][],
): RelatedLink[] {
  const links: RelatedLink[] = [
    { href: "/technologies", label: "All technologies" },
    { href: "/industries", label: "Industries we serve" },
    { href: "/locations", label: "Cities we serve" },
    ...industryLinksFromSlug(tech.slug),
  ];

  if (parentTechnology) {
    links.unshift({
      href: `/technologies/${parentTechnology.slug}`,
      label: parentTechnology.title,
    });
  }

  for (const child of subPages.slice(0, 6)) {
    links.push({
      href: `/technologies/${child.slug}`,
      label: child.title,
    });
  }

  return links;
}

// Helper to build BreadcrumbList JSON-LD schema
function buildBreadcrumbSchema(tech: typeof technologies[number]) {
  const parentTech = tech.parentId
    ? technologies.find(t => t.id === tech.parentId)
    : undefined;

  const items = [
    { '@type': 'ListItem' as const, position: 1, name: 'Home', item: absoluteUrl('/') },
    { '@type': 'ListItem' as const, position: 2, name: 'Technologies', item: absoluteUrl('/technologies') },
  ];

  if (parentTech) {
    items.push({
      '@type': 'ListItem' as const,
      position: 3,
      name: parentTech.title,
      item: absoluteUrl(`/technologies/${parentTech.slug}`),
    });
    items.push({
      '@type': 'ListItem' as const,
      position: 4,
      name: tech.title,
      item: absoluteUrl(`/technologies/${tech.slug}`),
    });
  } else {
    items.push({
      '@type': 'ListItem' as const,
      position: 3,
      name: tech.title,
      item: absoluteUrl(`/technologies/${tech.slug}`),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

// 3. The Page Component (Next.js 15/16 compatible)
export default async function TechnologyPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;

  // First check if it's a technology in our data
  const tech = technologies.find(t => t.slug === slug);
  if (tech) {
    // Compute sub-pages for this technology (if it's a parent)
    const subPages = technologies.filter(
      (t) => t.parentId === tech.id
    );

    // Compute parent technology (if this is a sub-page)
    const parentTechnology = tech.parentId
      ? technologies.find(t => t.id === tech.parentId)
      : undefined;

    // Build BreadcrumbList JSON-LD schema
    const breadcrumbSchema = buildBreadcrumbSchema(tech);

    return (
      <>
        {/* JSON-LD structured data for SEO */}
        <JsonLd data={breadcrumbSchema} />
        <TechnologyDetailPage
          technology={tech}
          embedded
          subPages={subPages.length > 0 ? subPages : undefined}
          parentTechnology={parentTechnology}
        />
        <RelatedPages
          heading="Related pages"
          links={relatedTechnologyLinks(tech, parentTechnology, subPages)}
        />
      </>
    );
  }

  // Then check if it's an industry-specific technology page
  const industryPage = pages[`technologies/${slug}`];
  if (industryPage) {
    return (
      <>
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Technologies", path: "/technologies" },
            { name: industryPage.title, path: `/technologies/${slug}` },
          ])}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: industryPage.title,
            description: clampDescription(industryPage.hero.description),
            url: `${SITE_URL}/technologies/${slug}`,
            provider: { "@id": `${SITE_URL}/#organization` },
            areaServed: "United States",
          }}
        />
        <IndustryPageTemplate data={industryPage} />
        <RelatedPages
          heading="Related pages"
          links={[
            { href: "/technologies", label: "All technologies" },
            { href: "/industries", label: "Industries we serve" },
            { href: "/locations", label: "Cities we serve" },
            ...industryLinksFromSlug(slug),
          ]}
        />
      </>
    );
  }

  // If neither is found, return 404
  notFound();
}
