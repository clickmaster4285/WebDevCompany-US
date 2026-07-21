// app/testimonials/layout.tsx
import type { Metadata } from "next";
import { getMetadata } from "@/lib/metadata";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = getMetadata({
  title: "Testimonials",
  description: "Hear from our clients — read real success stories and see how we've helped businesses achieve measurable results through expert web development.",
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