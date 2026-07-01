// app/location/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getLocationPageBySlug, getAllLocationSlugs } from '@/data/locationdata';
import { LocationPage } from '@/components/locations/LocationPage';
import { Breadcrumb } from '@/components/breadcrumb/Breadcrumb';

export async function generateStaticParams() {
  const slugs = getAllLocationSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

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

  return {
    title: pageData.title,
    description: pageData.metaDescription,
    alternates: {
      canonical: `https://yourdomain.com/location/${pageData.slug}`,
    },
  };
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

  // Custom labels for location breadcrumbs
  const customLabels = {
    'locations': 'Locations',
    [slug]: pageData.city,
  };

  return (
    <>
      {/* Breadcrumb is INSIDE the page content */}
      <div className="border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <Breadcrumb 
            customLabels={customLabels}
            className="py-3"
          />
        </div>
      </div>
      <LocationPage data={pageData} />
    </>
  );
}