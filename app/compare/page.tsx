import type { Metadata } from "next";
import { getMetadata } from "@/lib/metadata";
import { ComparePage } from "@/components/compare/ComparePage";

export const metadata: Metadata = getMetadata({
  title: "Comparisons",
  description: "Side-by-side comparisons of web technologies, platforms, and development approaches to help you make informed decisions.",
  slug: "compare",
});

export default function Page() {
  return <ComparePage />;
}