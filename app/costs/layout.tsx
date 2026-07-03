// app/costs/layout.tsx

import { ReactNode } from "react";
import { Nav } from "@/components/studio/Nav";
import { Footer } from "@/components/studio/Footer";

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