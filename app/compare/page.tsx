import type { Metadata } from "next";
import { getMetadata } from "@/lib/metadata";
import { ComparePage } from "@/components/compare/ComparePage";
import { withEditedSeo } from "@/lib/cms/metadata";

const baseMetadata: Metadata = getMetadata({
  title: "Comparisons",
  description: "Side-by-side comparisons of web technologies, platforms, and development approaches to help you make informed decisions.",
  slug: "compare",
});

export default function Page() {
  return <ComparePage />;
}

// Edited-page SEO from the ERP (Part B), applied on the server.
export function generateMetadata() {
  return withEditedSeo("/compare", baseMetadata);
}
