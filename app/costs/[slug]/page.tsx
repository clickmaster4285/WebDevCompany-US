// app/costs/[slug]/page.tsx

import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getCostPageBySlug, getAllCostSlugs, costData } from "@/data/costdata";
import { CostHero } from "@/components/costs/CostHero";
import { CostCredibilityBar } from "@/components/costs/CostCredibilityBar";
import { CostBreakdown } from "@/components/costs/CostBreakdown";
import { CostFactors } from "@/components/costs/CostFactors";
import { CostComparison } from "@/components/costs/CostComparison";
import { CostFAQ } from "@/components/costs/CostFAQ";
import { CostCTA } from "@/components/costs/CostCTA";
// ❌ Remove this import - CostLayout is not needed
// import { CostLayout } from "@/components/costs/CostLayout";

type PageProps = {
  params: Promise<{ slug: string }>;
};

import { getMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedPages } from "@/components/seo/RelatedPages";
import { breadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import { serviceForCost } from "@/lib/related";

export async function generateStaticParams() {
  const slugs = getAllCostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getCostPageBySlug(slug);

  if (!page) {
    return {
      title: "Cost Guide Not Found",
      robots: { index: false, follow: false },
    };
  }

  return getMetadata({
    title: page.title,
    description: page.metaDescription,
    slug: `costs/${page.slug}`,
  });
}

export default async function CostPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getCostPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const parentService = serviceForCost(page.slug);
  const otherCosts = Object.values(costData)
    .filter((item) => item.slug !== page.slug)
    .slice(0, 4)
    .map((item) => ({ href: `/costs/${item.slug}`, label: item.title }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    description: page.metaDescription,
    provider: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/costs/${page.slug}`,
    areaServed: ["United States", "United Kingdom", "Pakistan"],
  };

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Costs", path: "/costs" },
          { name: page.title, path: `/costs/${page.slug}` },
        ])}
      />
      <JsonLd data={jsonLd} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: page.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />

      {/* Hero Section */}
      <CostHero
        title={page.title}
        description={page.description}
        priceRange={page.priceRange}
        timeline={page.timeline}
        credibilityBar={page.credibilityBar}
      />

      {/* Credibility Bar (Scrolling) */}
      <CostCredibilityBar items={page.credibilityBar} />

      {/* Cost Breakdown */}
      <CostBreakdown
        heading={page.breakdown.heading}
        items={page.breakdown.items}
      />

      {/* Cost Factors */}
      <CostFactors
        heading={page.factors.heading}
        items={page.factors.items}
      />

      {/* Cost Comparison */}
      <CostComparison
        heading={page.comparison.heading}
        intro={page.comparison.intro}
        options={page.comparison.options}
      />

      {/* FAQ Section */}
      <CostFAQ
        heading={page.faqHeading || "Frequently Asked Questions"}
        faqs={page.faqs}
      />

      {/* CTA Section */}
      <CostCTA
        heading={page.cta.heading}
        primary={page.cta.primary}
        secondary={page.cta.secondary}
      />

      <RelatedPages
        heading="Related pages"
        links={[
          ...(parentService ? [parentService] : []),
          { href: "/costs", label: "All cost guides" },
          { href: "/industries", label: "Industries we serve" },
          { href: "/locations", label: "Cities we serve" },
          ...otherCosts,
        ]}
      />
    </>
  );
}