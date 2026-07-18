// app/industries/layout.tsx
import type { ReactNode } from 'react';
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function IndustriesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
}