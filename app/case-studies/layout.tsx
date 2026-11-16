// app/case-studies/layout.tsx
import type { Metadata } from "next";
import { getMetadata } from "@/lib/metadata";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = getMetadata({
  title: "Case Studies",
  description: "Read published web development case studies across SaaS, eCommerce, and enterprise projects.",
  slug: "case-studies",
});

export default function CaseStudiesLayout({
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