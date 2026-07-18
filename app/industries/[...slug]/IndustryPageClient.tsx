'use client';

import { IndustryHero } from '@/components/industry/IndustryHero';
import { IndustryFeaturedAnswer } from '@/components/industry/IndustryFeaturedAnswer';
import { IndustryProblemSection } from '@/components/industry/IndustryProblemSection';
import { IndustrySolutionSection } from '@/components/industry/IndustrySolutionSection';
import { IndustryCapabilities } from '@/components/industry/IndustryCapabilities';
import { IndustryComparison } from '@/components/industry/IndustryComparison';
import { IndustryProcess } from '@/components/industry/IndustryProcess';
import { IndustryOutcome } from '@/components/industry/IndustryOutcome';
import { IndustryBusinessCase } from '@/components/industry/IndustryBusinessCase';
import { IndustryFAQ } from '@/components/industry/IndustryFAQ';
import type { IndustryPage } from '@/data/industries';

interface IndustryPageClientProps {
  data: IndustryPage;
}

export default function IndustryPageClient({ data }: IndustryPageClientProps) {
  return (
    <div className="min-h-screen">
      <IndustryHero data={data.hero} />
      <div className="container mx-auto px-6 md:px-12">
        <IndustryFeaturedAnswer data={data.featuredAnswer} />
        <IndustryProblemSection data={data.problemSection} />
        <IndustrySolutionSection data={data.solutionSection} />
        <IndustryCapabilities data={data.capabilities} />
        <IndustryComparison data={data.comparison} />
        <IndustryProcess data={data.process} />
        <IndustryOutcome data={data.outcome} />
        <IndustryBusinessCase data={data.businessCase} />
        <IndustryFAQ faqs={data.faqs} />
      </div>
    </div>
  );
}