import { IndustryPageData } from '@/data/tech-serv-industry';
import { HeroSection } from './HeroSection';
import { CredibilityBar } from './CredibilityBar'; // <-- Added import
import { FeaturedAnswer } from './FeaturedAnswer';
import { WhySector } from './WhySector';
import { HowWeBuild } from './HowWeBuild';
import { WhatIncludes } from './WhatIncludes';
import { WhyChooseUs } from './WhyChooseUs';
import { ProcessTimeline } from './ProcessTimeline';
import { OutcomeCaseStudy } from './OutcomeCaseStudy';
import { BusinessCase } from './BusinessCase';
import { FAQAccordion } from './FAQAccordion';
import { RiskReversal } from './RiskReversal';

interface Props {
  data: IndustryPageData;
}

export default function IndustryPageTemplate({ data }: Props) {
  return (
    <main className="bg-white text-gray-900">
      {/* 1. Hero Section */}
      <HeroSection {...data.hero} />
      
      {/* 2. Animated Credibility Bar (Placed directly below Hero) */}
      <CredibilityBar text={data.hero.credibilityBar} />
      
      <section className="layout-container px-4 sm:px-6 md:px-18 py-6 sm:py-8 md:py-10 space-y-10 sm:space-y-16 md:space-y-20 lg:space-y-24">
        <FeaturedAnswer text={data.featuredAnswer} />
        <WhySector items={data.whySector} />
        <HowWeBuild text={data.howWeBuild} />
        
        <WhatIncludes items={data.whatIncludes} />
        <WhyChooseUs items={data.whyChooseUs} />
        
        <ProcessTimeline steps={data.process} />
        <OutcomeCaseStudy data={data.outcome} />
        
        <BusinessCase text={data.businessCase} />
        <RiskReversal text={data.riskReversal} />
        
        <FAQAccordion items={data.faqs} />
      </section>
    </main>
  );
}