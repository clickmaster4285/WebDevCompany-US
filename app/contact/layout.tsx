// app/contact/layout.tsx
import type { Metadata } from "next";
import { getMetadata } from "@/lib/metadata";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { withEditedSeo } from "@/lib/cms/metadata";

const baseMetadata: Metadata = getMetadata({
  title: "Contact Us",
  description: "Get in touch with our team — request a free consultation, ask about pricing, or start your next web development project.",
  slug: "contact",
});

export default function ContactLayout({
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
  return withEditedSeo("/contact", baseMetadata);
}
