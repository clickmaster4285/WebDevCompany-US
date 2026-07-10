"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ClipboardList,
  Search,
  Palette,
  Code,
  Rocket,
  LineChart,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { ProcessStep } from "@/data/services";

interface ProcessSectionProps {
  heading: string;
  steps: ProcessStep[];
}

const defaultIcons = [Search, ClipboardList, Palette, Code, Rocket, LineChart];

/* ─── Animation Variants ─────────────────── */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
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

/* ─── Sub-components ─────────────────────── */

function FloatingOrb({
  className,
  duration = 20,
  delay = 0,
}: {
  className: string;
  duration?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      animate={{ x: [0, 25, -15, 0], y: [0, -20, 10, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

/* ─── Main Component ─────────────────────── */

export function ProcessSection({ heading, steps }: ProcessSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-80px" },
      };

  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-20">
      {/* ── Ambient Background Effects ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-violet/[0.04] blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-violet/[0.03] blur-[120px]" />
      </div>

      {!shouldReduceMotion && (
        <>
          <FloatingOrb
            className="-left-20 top-1/4 h-64 w-64 bg-violet/5"
            duration={18}
          />
          <FloatingOrb
            className="-right-20 bottom-1/4 h-72 w-72 bg-indigo-500/5"
            duration={22}
            delay={4}
          />
        </>
      )}

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative z-10 layout-container px-4 sm:px-6 lg:px-10">
        {/* ── Header ── */}
        <motion.div
          className="mx-auto mb-16 max-w-2xl text-center md:mb-24"
          {...motionProps}
          variants={containerVariants}
        >
          <motion.div variants={fadeUpVariants}>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet/20 bg-violet/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              How We Work
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUpVariants}
            className="text-display mt-5 text-balance text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl lg:text-6xl"
          >
            {heading}
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="mx-auto mt-4 max-w-xl text-base text-ink-mute md:text-lg"
          >
            A proven, transparent process from concept to launch — with you
            involved at every stage.
          </motion.p>
        </motion.div>

        {/* ── Process Steps Grid ── */}
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
            {steps.map((step, index) => {
              const Icon = defaultIcons[index % defaultIcons.length];
              const isLast = index === steps.length - 1;

              return (
                <motion.div
                  key={step.number}
                  className={`group relative ${isLast && steps.length % 2 === 1 ? "md:col-span-2 md:mx-auto md:max-w-lg" : ""}`}
                  {...motionProps}
                  variants={cardVariants}
                >
                  {/* Card */}
                  <div className="relative h-full overflow-hidden rounded-2xl border border-border/60 bg-surface-1/40 p-6 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-violet/30 hover:shadow-lg hover:shadow-violet/5 sm:p-8">
                    {/* Hover gradient overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet/[0.02] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Top accent line */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-violet/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Number badge */}
                    <div className="relative z-10 mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet to-violet-soft text-sm font-bold text-white shadow-md shadow-violet/20 md:h-12 md:w-12 md:text-base">
                        {step.number}
                      </div>
                      <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-violet">
                        Step {step.number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="mb-3 flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet/10 text-violet">
                          <Icon className="h-4 w-4" />
                        </div>
                        <h3 className="text-lg font-semibold text-ink md:text-xl">
                          {step.title}
                        </h3>
                      </div>

                      <p className="leading-relaxed text-ink-soft">
                        {step.description}
                      </p>
                    </div>

                    {/* Bottom indicator for visual continuity */}
                    {!isLast && (
                      <div className="pointer-events-none absolute -bottom-3 left-1/2 hidden -translate-x-1/2 md:block">
                        <ArrowRight className="h-5 w-5 rotate-90 text-violet/20" />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── Bottom CTA nudge ── */}
          <motion.div
            className="mt-12 text-center md:mt-16"
            {...motionProps}
            variants={fadeUpVariants}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface-1/40 px-5 py-2.5 text-sm text-ink-mute backdrop-blur-sm">
              <CheckCircle2 className="h-4 w-4 text-violet" />
              <span>
                <strong className="text-ink">{steps.length} stages</strong> from
                discovery to deployment
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
