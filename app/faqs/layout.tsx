import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getMetadata } from "@/lib/metadata";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = getMetadata({
  title: "Frequently Asked Questions",
  description: "Find answers to common questions about our web development services, pricing, process, and how we help businesses grow online.",
  slug: "faqs",
});

export default function FAQsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Nav />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}