// app/costs/[slug]/page.tsx

import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getCostPageBySlug, getAllCostSlugs } from "@/data/costdata";
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

const SITE_URL = "https://clickmasterswebdevelopmentcompany.com";
const COMPANY_NAME = "Clickmasters";

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

  const canonicalUrl = `${SITE_URL}/costs/${page.slug}`;

  return {
    title: `${page.title} | ${COMPANY_NAME}`,
    description: page.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: canonicalUrl,
      siteName: COMPANY_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.metaDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CostPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getCostPageBySlug(slug);

  if (!page) {
    notFound();
  }

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    description: page.metaDescription,
    provider: {
      "@type": "Organization",
      name: COMPANY_NAME,
      url: SITE_URL,
    },
    url: `${SITE_URL}/costs/${page.slug}`,
    areaServed: "Global",
    offers: {
      "@type": "Offer",
      price: page.priceRange,
      priceCurrency: "USD",
    },
  };

  return (
    <>
      {/* ✅ No CostLayout wrapper - using main layout instead */}

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
    </>
  );
}