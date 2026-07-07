"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import { Zap, ArrowUpRight, Sparkles } from "lucide-react";
import { SolutionPillar } from "@/data/services";
import { Section } from "@/components/ui/Section";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 24 },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function PillarCard({
  pillar,
  shouldReduceMotion,
}: {
  pillar: SolutionPillar;
  shouldReduceMotion: boolean | null;
}) {
  return (
    <motion.div variants={cardVariants} className="group relative">
      <Card className="relative h-full overflow-hidden rounded-2xl border border-border/60 bg-surface-1/50 p-6 shadow-lg backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-violet/30 hover:bg-surface-1/70 hover:shadow-2xl hover:shadow-violet/10 sm:p-8">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-violet/0 via-violet/60 to-violet/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-violet/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-violet/0 transition-all duration-500 group-hover:ring-violet/10" />

        <div className="relative">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-violet/10 text-violet ring-1 ring-violet/20 transition-all duration-500 group-hover:scale-110 group-hover:bg-violet group-hover:text-white group-hover:shadow-lg group-hover:shadow-violet/30 group-hover:ring-violet/40">
            <Zap className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
          </div>

          <CardTitle className="mb-3 text-xl font-semibold leading-tight tracking-tight text-ink transition-colors duration-300 group-hover:text-violet sm:text-2xl">
            {pillar.title}
          </CardTitle>

          <CardContent className="p-0">
            <p className="text-[15px] leading-relaxed text-ink-soft/80 transition-colors duration-300 group-hover:text-ink-soft sm:text-base">
              {pillar.description}
            </p>
          </CardContent>

          <div className="mt-5 flex items-center gap-2 text-sm font-medium text-violet/0 transition-all duration-500 group-hover:text-violet/90">
            <span className="h-px w-0 bg-violet/50 transition-all duration-500 group-hover:w-6" />
            <span className="flex items-center gap-1">
              Learn more
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

interface SolutionSectionProps {
  heading: string;
  content: string;
  pillars: SolutionPillar[];
}

export function SolutionSection({ heading, content, pillars }: SolutionSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = shouldReduceMotion
    ? {}
    : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-100px" } };

  return (
    <Section background="transparent" padding="lg" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/2 h-[600px] w-[500px] -translate-y-1/2 rounded-full bg-violet/[0.03] blur-3xl" />
      </div>

      <div className="relative layout-container px-18">
        <motion.span
          variants={fadeUpVariants}
          {...motionProps}
          className="mb-5 inline-flex items-center gap-2 self-start rounded-full border border-violet/20 bg-violet/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet backdrop-blur-sm"
        >
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Our Approach
        </motion.span>

        <motion.h2
          variants={fadeUpVariants}
          {...motionProps}
          transition={{ delay: 0.1 }}
          className="text-display max-w-3xl text-left text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl lg:text-6xl"
        >
          {heading}
        </motion.h2>

        <motion.p
          variants={fadeUpVariants}
          {...motionProps}
          transition={{ delay: 0.2 }}
          className="mt-5 max-w-2xl text-justify text-base leading-relaxed text-ink-soft sm:text-lg"
        >
          {content}
        </motion.p>

        <motion.div
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {pillars.map((pillar, index) => (
            <PillarCard key={index} pillar={pillar} shouldReduceMotion={shouldReduceMotion} />
          ))}
        </motion.div>
      </div>
    </Section>
  );
}