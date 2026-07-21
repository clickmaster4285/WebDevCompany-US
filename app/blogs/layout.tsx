// app/blogs/layout.tsx
import type { Metadata } from "next";
import { getMetadata } from "@/lib/metadata";

export const metadata: Metadata = getMetadata({
  title: "Blog",
  description: "Insights, guides, and best practices for web development, SaaS, eCommerce, and digital strategy from the Clickmasters team.",
  slug: "blogs",
});

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
