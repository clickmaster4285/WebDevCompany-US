// app/location/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getLocationPageBySlug, getAllLocationSlugs } from '@/data/locationdata';
import { LocationPage } from '@/components/locations/LocationPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, clampDescription, SITE_URL } from '@/lib/seo';

export async function generateStaticParams() {
  const slugs = getAllLocationSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

import { getMetadata } from "@/lib/metadata";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const pageData = getLocationPageBySlug(slug);

  if (!pageData) {
    return {
      title: 'Location Not Found',
      description: 'The requested location page could not be found.'
    };
  }

  return getMetadata({
    title: pageData.title,
    description: pageData.metaDescription,
    slug: `locations/${pageData.slug}`,
  });
}

export default async function LocationPageRoute({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const pageData = getLocationPageBySlug(slug);

  if (!pageData) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Locations', path: '/locations' },
          { name: pageData.city, path: `/locations/${pageData.slug}` },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: pageData.title,
          description: clampDescription(pageData.metaDescription),
          url: `${SITE_URL}/locations/${pageData.slug}`,
          provider: { '@id': `${SITE_URL}/#organization` },
          areaServed: {
            '@type': 'City',
            name: pageData.city,
            containedInPlace: {
              '@type': 'AdministrativeArea',
              name: pageData.state,
            },
          },
        }}
      />
      <LocationPage data={pageData} />
    </>
  );
}