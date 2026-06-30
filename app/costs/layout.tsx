// app/costs/layout.tsx

import { ReactNode } from "react";
import { Breadcrumb } from "@/components/costs/Breadcrumb";
import { Nav } from "@/components/studio/Nav";
import { Footer } from "@/components/studio/Footer";

type LayoutProps = {
  children: ReactNode;
};

export default function CostsLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ✅ 1. Nav at the top */}
      <Nav />

      {/* ✅ 2. Dynamic Breadcrumb below Nav */}
      <div className="border-b border-border/60 bg-surface-1/30 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <Breadcrumb />
          </div>
        </div>
      </div>

      {/* ✅ 3. Main Content - grows to fill space */}
      <main className="flex-1">
        {children}
      </main>

      {/* ✅ 4. Footer at the bottom */}
      <Footer />
    </div>
  );
}