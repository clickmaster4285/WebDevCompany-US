// app/location/page.tsx

import { Metadata } from 'next';
import { Breadcrumb } from '@/components/breadcrumb/Breadcrumb';
import LocationsContent from './LocationsContent';

export const metadata: Metadata = {
  title: 'Web Development Company Locations | Serving Top US Metros',
  description: 'Find a web development company near you. We serve Austin, Boston, Chicago, Dallas, Denver, Los Angeles, Miami, New York, Phoenix, Seattle, and more.'
};

export default function LocationsPage() {
  return (
    <>
      {/* Breadcrumb is INSIDE the page content */}
      <div className="border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <Breadcrumb 
            customLabels={{ 'locations': 'Locations' }}
            className="py-3"
          />
        </div>
      </div>
      <LocationsContent />
    </>
  );
}