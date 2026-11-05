// app/industries/page.tsx
import type { Metadata } from 'next';
import { industriesData } from '@/data/industries';
import { getMetadata } from '@/lib/metadata';
import IndustriesIndexClient from './IndustriesIndexClient';
import { JsonLd } from '@/components/seo/JsonLd';
import { absoluteUrl, breadcrumbJsonLd } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata({
    title: 'Industries We Serve',
    description:
      'Industry-specific web development engineered for compliance, conversion, and the economics of your practice — healthcare, law, fintech, real estate, SaaS, and more.',
    slug: 'industries',
  });
}

export default function IndustriesIndexPage() {
  const industries = Object.values(industriesData).map((industry) => ({
    slug: industry.slug,
    title: industry.title,
    metaDescription: industry.metaDescription,
    hero: {
      heading: industry.hero.heading,
      subheading: industry.hero.subheading,
      credibilityBar: industry.hero.credibilityBar,
    },
    pricing: industry.pricing,
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Industries', path: '/industries' },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Industries we serve',
          itemListElement: industries.map((industry, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: industry.title,
            url: absoluteUrl(`/industries/${industry.slug}`),
          })),
        }}
      />
      <IndustriesIndexClient industries={industries} />
    </>
  );
}