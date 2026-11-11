// app/testimonials/layout.tsx
import type { Metadata } from "next";
import { getMetadata } from "@/lib/metadata";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { withEditedSeo } from "@/lib/cms/metadata";

const baseMetadata: Metadata = getMetadata({
  title: "Testimonials",
  description: "Client testimonials are published here after ClickMasters can confirm the client and the wording.",
  slug: "testimonials",
});

export default function TestimonialsLayout({
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

// Edited-page SEO from the ERP (Part B), applied on the server.
export function generateMetadata() {
  return withEditedSeo("/testimonials", baseMetadata);
}
