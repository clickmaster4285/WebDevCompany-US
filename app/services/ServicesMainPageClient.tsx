"use client";

import { BLUEPRINT_GRID } from "@/data/services-data";
import { RulerTicks } from "@/components/mainpageservices/Primitives";
import { HeroSection } from "@/components/mainpageservices/HeroSection";
import { CapabilitiesSection } from "@/components/mainpageservices/CapabilitiesSection";
import { WhyUsSection } from "@/components/mainpageservices/WhyUsSection";
import { ProcessSection } from "@/components/mainpageservices/ProcessSection";
import { FAQSection } from "@/components/mainpageservices/FAQSection";
import { CTASection } from "@/components/mainpageservices/CTASection";

export function ServicesMainPageClient() {
  return (
    <main className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0" style={BLUEPRINT_GRID} aria-hidden="true" />
      <RulerTicks />

      <div className="layout-container relative px-4 py-20 sm:px-6 md:px-12 md:py-32">
        <HeroSection />
        <CapabilitiesSection />
        <WhyUsSection />
        <ProcessSection />
        <FAQSection />
        <CTASection />
      </div>
    </main>
  );
}