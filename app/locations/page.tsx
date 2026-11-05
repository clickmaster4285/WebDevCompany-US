import LocationsContent from './LocationsContent';
import { getAllLocationPages } from '@/data/locationdata';
import { JsonLd } from '@/components/seo/JsonLd';
import { absoluteUrl, breadcrumbJsonLd } from '@/lib/seo';

export default function LocationsPage() {
  const locations = getAllLocationPages();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Locations', path: '/locations' },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Cities we serve',
          itemListElement: locations.map((location, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: `${location.city}, ${location.state}`,
            url: absoluteUrl(`/locations/${location.slug}`),
          })),
        }}
      />
      <LocationsContent locations={locations} />
    </>
  );
}
