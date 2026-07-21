// app/industries/[...slug]/page.tsx
import { industriesData } from '@/data/industries';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import IndustryPageClient from './IndustryPageClient';

// 1. Pre-render all pages at build time
export async function generateStaticParams() {
  const params: { slug: string[] }[] = [];

  // Generate params for all industry slugs
  for (const slug of Object.keys(industriesData)) {
    params.push({ slug: [slug] });
  }

  return params;
}

import { getMetadata } from "@/lib/metadata";

// 2. Dynamic SEO Metadata (Next.js 15/16 compatible)
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string[] }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const slugKey = slug[0];

  const pageData = industriesData[slugKey];
  if (!pageData) return { title: 'Page Not Found' };

  return getMetadata({
    title: pageData.title,
    description: pageData.metaDescription,
    slug: `industries/${slugKey}`,
  });
}

// 3. The Page Component (Next.js 15/16 compatible)
export default async function IndustriesPage({ 
  params 
}: { 
  params: Promise<{ slug: string[] }> 
}) {
  const { slug } = await params;
  const slugKey = slug[0];

  const pageData = industriesData[slugKey];
  if (!pageData) notFound();

  return <IndustryPageClient data={pageData} />;
}