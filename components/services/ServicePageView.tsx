import type { ServicePageData } from "@/data/services";
import { generateServiceSchema } from "@/lib/schema/serviceSchema";
import { breadcrumbJsonLd, US_PHONE_DISPLAY } from "@/lib/seo";
import { INDUSTRY_HUBS, comparisonLinksForService, locationLinks, relatedLinksForService, serviceIndustryPages } from "@/lib/related";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedPages } from "@/components/seo/RelatedPages";
import { HeroSection } from "@/components/services/HeroSection";
import { CredibilityBar } from "@/components/services/CredibilityBar";
import { FeaturedAnswerBlock } from "@/components/services/FeaturedAnswerBlock";
import { ProblemSection } from "@/components/services/ProblemSection";
import { SolutionSection } from "@/components/services/SolutionSection";
import { CapabilitiesTable } from "@/components/services/CapabilitiesTable";
import { ComparisonTable } from "@/components/services/ComparisonTable";
import { ProcessSection } from "@/components/services/ProcessSection";
import { OutcomeSection } from "@/components/services/OutcomeSection";
import { BusinessCase } from "@/components/services/BusinessCase";
import { FAQSection } from "@/components/services/FAQSection";
import { CTASection } from "@/components/services/CTASection";
import { RiskReversal } from "@/components/services/RiskReversal";
import { KeyBenefits } from "@/components/services/KeyBenefits";

const serviceConfig: Record<string, { showSocial: boolean; avatarImage: string }> = {
  "web-development": {
    showSocial: true,
    avatarImage: "/hero/webdevelopment.jpg",
  },
  default: {
    showSocial: false,
    avatarImage: "/hero/default.jpg",
  },
};

export function ServicePageView({ service }: { service: ServicePageData }) {
  const config = serviceConfig[service.slug] ?? serviceConfig.default;
  const childIndustries = serviceIndustryPages(service.slug);
  const industryPages = childIndustries.length
    ? childIndustries
    : Object.values(INDUSTRY_HUBS).filter(
        (item, index, list) => list.findIndex((other) => other.href === item.href) === index,
      );
  const related = relatedLinksForService(service);
  const comparisons = comparisonLinksForService(service.slug);
  const cities = service.slug === "web-development-services" ? locationLinks() : [];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={generateServiceSchema(service)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/${service.slug}` },
        ])}
      />
      {service.faqs.length > 0 ? <JsonLd data={faqSchema} /> : null}

      <HeroSection
        data={service.hero}
        slug={service.slug}
        breadcrumbLabel={service.title}
        showSocial={config.showSocial}
        socialLinks={{
          github: "https://github.com",
          linkedin: "https://linkedin.com",
          email: "hello@yourcompany.com",
        }}
        /* @ts-ignore */
        avatarImage={config.avatarImage}
      />

      <CredibilityBar items={service.hero.credibilityBar ?? []} />

      <FeaturedAnswerBlock
        question={service.featuredAnswer.question}
        answer={service.featuredAnswer.answer}
      />

      <ProblemSection
        heading={service.problemSection.heading}
        content={service.problemSection.content}
        stats={service.problemSection.stats}
      />

      <SolutionSection
        heading={service.solutionSection.heading}
        content={service.solutionSection.content}
        pillars={service.solutionSection.pillars}
      />

      <KeyBenefits benefits={service.keyBenefits || []} />

      <CapabilitiesTable
        heading={service.capabilities.heading}
        items={service.capabilities.items}
      />

      <section className="layout-container px-4 py-12 sm:px-6 md:px-10">
        <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Pricing guidance
        </h2>
        <p className="mt-4 max-w-3xl text-lg text-ink">
          Typical range: {service.pricing.range}
        </p>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink-soft">
          {service.pricing.note} For a number tied to your scope, call the US desk at {US_PHONE_DISPLAY}. Delivered work is documented in our case studies.
        </p>
      </section>

      <ComparisonTable
        heading={service.comparison.heading}
        intro={service.comparison.intro}
        options={service.comparison.options}
      />

      <ProcessSection heading={service.process.heading} steps={service.process.steps} />

      <OutcomeSection
        challenge={service.outcome.challenge}
        solution={service.outcome.solution}
        metrics={service.outcome.metrics}
      />

      <BusinessCase
        heading={service.businessCase.heading}
        content={service.businessCase.content}
        valueStreams={service.businessCase.valueStreams}
      />

      <RelatedPages heading="Industries we serve" links={industryPages} />
      <RelatedPages heading="Related comparisons" links={comparisons} />
      <RelatedPages heading="Cities we serve" links={cities} />
      <RelatedPages heading="Related pages" links={related} />

      <FAQSection faqs={service.faqs} />

      <CTASection
        heading={service.cta.heading}
        primary={service.cta.primary}
        secondary={service.cta.secondary}
      />

      <RiskReversal text={service.riskReversal} />
    </>
  );
}
