import type { Metadata } from "next";
import { getMetadata } from "@/lib/metadata";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = getMetadata({
  title: "Technologies We Use",
  description: "Explore the modern tools, frameworks and platforms we use to build fast, scalable and high-performing digital products.",
  slug: "technologies",
});

export default function TechnologiesLayout({
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
