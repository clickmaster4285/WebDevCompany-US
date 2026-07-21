// app/costs/layout.tsx

import type { Metadata } from "next";
import { ReactNode } from "react";
import { getMetadata } from "@/lib/metadata";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = getMetadata({
  title: "Cost Guides",
  description: "Transparent web development cost guides. Get pricing estimates for custom websites, eCommerce, SaaS, and enterprise projects.",
  slug: "costs",
});

type LayoutProps = {
  children: ReactNode;
};

export default function CostsLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Nav */}
      <Nav />

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}