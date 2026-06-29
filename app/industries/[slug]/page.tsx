import { notFound } from "next/navigation";
import { industriesData } from "@/data/industries";
import { TemplateCTA } from "@/components/ui/TemplateCta";
import {
  IndustryHero,
  IndustryFeaturedAnswer,
  IndustryProblemSection,
  IndustrySolutionSection,
  IndustryCapabilities,
  IndustryComparison,
  IndustryProcess,
  IndustryOutcome,
  IndustryBusinessCase,
  IndustryFAQ,
  IndustrySidebar,
} from "@/components/industry";

export async function generateStaticParams() {
  return Object.keys(industriesData).map((slug) => ({
    slug,
  }));
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = industriesData[slug];

  if (!data) {
    notFound();
  }

  const sidebarSections = [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "The Problem" },
    { id: "solution", label: "Our Solution" },
    { id: "capabilities", label: "Capabilities" },
    { id: "comparison", label: "Comparison" },
    { id: "process", label: "Process" },
    { id: "outcome", label: "Outcome" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <IndustryHero data={data.hero} title={data.title} />

      <main className="mx-auto max-w-7xl w-full px-6 md:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-16 space-y-6">
              <IndustrySidebar
                sections={sidebarSections}
                pricing={data.pricing}
              />
            </div>
          </div>

          <div className="lg:col-span-2 order-1 lg:order-2 space-y-12">
            <section id="overview" className="scroll-mt-24">
              <IndustryFeaturedAnswer data={data.featuredAnswer} />
            </section>

            <section id="problem" className="scroll-mt-24">
              <IndustryProblemSection data={data.problemSection} />
            </section>

            <section id="solution" className="scroll-mt-24">
              <IndustrySolutionSection data={data.solutionSection} />
            </section>

            <section id="capabilities" className="scroll-mt-24">
              <IndustryCapabilities data={data.capabilities} />
            </section>

            <section id="comparison" className="scroll-mt-24">
              <IndustryComparison data={data.comparison} />
            </section>

            <section id="process" className="scroll-mt-24">
              <IndustryProcess data={data.process} />
            </section>

            <section id="outcome" className="scroll-mt-24">
              <IndustryOutcome data={data.outcome} />
            </section>

            <section id="business-case" className="scroll-mt-24">
              <IndustryBusinessCase data={data.businessCase} />
            </section>

            <section id="faq" className="scroll-mt-24">
              <IndustryFAQ faqs={data.faqs} />
            </section>

            <div className="pt-8 border-t border-border">
              <TemplateCTA
                heading={data.cta.heading}
                subtext={data.riskReversal}
                buttonText={data.cta.primary}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
