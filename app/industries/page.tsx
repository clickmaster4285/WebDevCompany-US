// app/industries/page.tsx
import type { Metadata } from 'next';
import { industriesData } from '@/data/industries';
import { getMetadata } from '@/lib/metadata';
import IndustriesIndexClient from './IndustriesIndexClient';

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

  return <IndustriesIndexClient industries={industries} />;
}