// app/(services)/page.tsx
import { Metadata } from "next";
import { ServicesMainPageClient } from "./ServicesMainPageClient";
import { getMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedPages } from "@/components/seo/RelatedPages";
import { breadcrumbJsonLd } from "@/lib/seo";
import { allComparisonLinks, locationLinks } from "@/lib/related";

export const metadata: Metadata = getMetadata({
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