// app/(services)/page.tsx
import { Metadata } from "next";
import { ServicesMainPageClient } from "./ServicesMainPageClient";
import { getMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedPages } from "@/components/seo/RelatedPages";
import { breadcrumbJsonLd } from "@/lib/seo";
import { allComparisonLinks, locationLinks } from "@/lib/related";
import { withEditedSeo } from "@/lib/cms/metadata";

const baseMetadata: Metadata = getMetadata({
  title: "All Development Services",
  description:
    "Custom websites, eCommerce, SaaS, and AI web development for US businesses. Browse every service.",
  slug: "services",
});

export default function ServicesMainPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <ServicesMainPageClient />
      <RelatedPages heading="Cities we serve" links={locationLinks()} />
      <RelatedPages heading="Platform comparisons" links={allComparisonLinks()} />
    </>
  );
}

// Edited-page SEO from the ERP (Part B), applied on the server.
export function generateMetadata() {
  return withEditedSeo("/services", baseMetadata);
}
