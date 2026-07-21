// app/locations/layout.tsx

import type { Metadata } from 'next';
import { getMetadata } from "@/lib/metadata";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = getMetadata({
  title: 'Web Development Company Locations',
  description: 'Senior-led web development serving top US metros with genuine local market understanding.',
  slug: 'locations',
});

export default function LocationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />

      {/* Main Content */}
      <main className="grow">
        {children}
      </main>

      <Footer />
    </div>
  );
}
