// app/about/layout.tsx
import type { Metadata } from "next";
import { getMetadata } from "@/lib/metadata";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { withEditedSeo } from "@/lib/cms/metadata";

const baseMetadata: Metadata = getMetadata({
  title: "About Us",
  description: "We are a senior-led web development company specializing in custom websites, SaaS platforms, eCommerce, and enterprise-grade digital solutions since 2014.",
  slug: "about",
});

export default function AboutLayout({
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
  return withEditedSeo("/about", baseMetadata);
}
