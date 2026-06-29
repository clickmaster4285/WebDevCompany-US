"use client";
import { Nav } from "@/components/studio/Nav";
import { Footer } from "@/components/studio/Footer";

export default function IndustriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}
