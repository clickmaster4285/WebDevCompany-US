// app/ClientWrapper.tsx
"use client";

import { Nav } from "@/components/Nav";
import { HeroSection } from "@/components/HeroSection";
import { StorySection } from "@/components/StorySection";
import { ServicesSection } from "@/components/ServicesSection";
import { WorkSection } from "@/components/WorkSection";
import { ProcessSection } from "@/components/ProcessSection";
import { TechSection } from "@/components/TechSection";
import { ResultsSection } from "@/components/ResultsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { AwardsSection } from "@/components/AwardsSection";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";
import { Partners } from "@/components/Partners";
import { Projects } from "@/components/Projects";
import { Process } from "@/components/Process";

export default function ClientWrapper() {
  return (
    <main className="relative w-full overflow-x-hidden bg-background text-ink">
      <Nav />
      <HeroSection />
      <Partners />
      <StorySection />
      <ServicesSection />
      <TechSection />
      <WorkSection />
      <ProcessSection />
      <Process />
      <Projects />
      <ResultsSection />
      <TestimonialsSection />
      <AwardsSection />
      <CtaSection />
      <Footer />
    </main>
  );
}