// app/location/layout.tsx

import { Metadata } from 'next';
import { Nav } from "@/components/studio/Nav";
import { Footer } from "@/components/studio/Footer";

export const metadata: Metadata = {
  title: 'Web Development Company Locations',
  description: 'Senior-led web development serving top US metros with genuine local market understanding.',
};

export default function LocationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
       <div className="pt-16"> {/* match Nav's height */}
        {children}
      </div>{/* Breadcrumb and content go here */}
      <Footer />
    </>
  );
}