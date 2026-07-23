import dynamic from "next/dynamic";
import { Nav } from "@/components/Nav";
import { HeroSection } from "@/components/HeroSection";
import { Partners } from "@/components/Partners";

// ── Above-the-fold: SSR for LCP/CLS ────────────────────────────────────────
// These render on the server so the browser gets real HTML immediately.
const StorySection = dynamic(
  () => import("@/components/StorySection").then((m) => ({ default: m.StorySection })),
  { ssr: true }
);
const ServicesSection = dynamic(
  () => import("@/components/ServicesSection").then((m) => ({ default: m.ServicesSection })),
  { ssr: true }
);
const TechSection = dynamic(
  () => import("@/components/TechSection").then((m) => ({ default: m.TechSection })),
  { ssr: true }
);

// ── Below-the-fold: SSR + code-split JS ────────────────────────────────────
// SSR: true ensures the HTML is in the initial payload (SEO + fast paint).
// Dynamic import ensures the JS is a separate chunk loaded on demand.
const WorkSection = dynamic(
  () => import("@/components/WorkSection").then((m) => ({ default: m.WorkSection })),
  { ssr: true }
);
const ProcessSection = dynamic(
  () => import("@/components/ProcessSection").then((m) => ({ default: m.ProcessSection })),
  { ssr: true }
);
const Process = dynamic(
  () => import("@/components/Process").then((m) => ({ default: m.Process })),
  { ssr: true }
);
const Projects = dynamic(
  () => import("@/components/Projects").then((m) => ({ default: m.Projects })),
  { ssr: true }
);
const ResultsSection = dynamic(
  () => import("@/components/ResultsSection").then((m) => ({ default: m.ResultsSection })),
  { ssr: true }
);
const TestimonialsSection = dynamic(
  () => import("@/components/TestimonialsSection").then((m) => ({ default: m.TestimonialsSection })),
  { ssr: true }
);
const AwardsSection = dynamic(
  () => import("@/components/AwardsSection").then((m) => ({ default: m.AwardsSection })),
  { ssr: true }
);
const CtaSection = dynamic(
  () => import("@/components/CtaSection").then((m) => ({ default: m.CtaSection })),
  { ssr: true }
);
const Footer = dynamic(
  () => import("@/components/Footer").then((m) => ({ default: m.Footer })),
  { ssr: true }
);

// ── Page: Server Component ─────────────────────────────────────────────────
// By removing "use client", this page is a Server Component.
// Next.js renders the entire component tree on the server, sends real HTML
// to the browser, and only hydrates the client components (Nav, HeroSection)
// that need interactivity.
//
// Key changes from previous version:
// 1. Removed <Suspense> wrappers — SSR dynamic components don't need them.
//    Suspense is for client-only lazy loading; with ssr:true the HTML is
//    already in the initial response. The extra React tree hydration was
//    adding ~15ms TBT per boundary × 13 boundaries = ~200ms wasted.
// 2. Removed SectionSkeleton — with SSR, the fallback never shows.
//    It was adding ~2KB of dead JS + CSS animation classes.
// 3. Partners is a direct import (not dynamic) because it's above-the-fold
//    and needs its marquee animation to start immediately.
export default function HomePage() {
  return (
    <main className="relative w-full overflow-x-hidden bg-background text-ink">
      {/* Nav: client component (dropdowns, scroll state, mobile menu) */}
      <Nav />

      {/* Hero: client component (GSAP animations, video lazy-load) */}
      <HeroSection />

      {/* Partners: direct import — above-the-fold, marquee starts instantly */}
      <Partners />

      {/* Above-the-fold: SSR + lazy JS */}
      <StorySection />
      <ServicesSection />
      <TechSection />

      {/* Below-the-fold: all SSR + lazy JS */}
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
