"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Check, X, Award, Sparkles, ArrowRight, Shield, TrendingUp, Zap } from "lucide-react";
import { ComparisonOption } from "@/data/services";

interface ComparisonTableProps {
  heading: string;
  intro: string;
  options: ComparisonOption[];
}

/* ─── Animation Variants ─────────────────── */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
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
      animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

/* ─── Main Component ─────────────────────── */

export function ComparisonTable({ heading, intro, options }: ComparisonTableProps) {
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
      {/* ── Ambient Background ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/4 h-[450px] w-[450px] rounded-full bg-violet/[0.04] blur-[130px]" />
        <div className="absolute bottom-1/4 left-0 h-[350px] w-[350px] rounded-full bg-indigo-500/[0.03] blur-[100px]" />
      </div>

      {!shouldReduceMotion && (
        <>
          <FloatingOrb
            className="-left-20 top-1/3 h-56 w-56 bg-violet/5"
            duration={22}
          />
          <FloatingOrb
            className="-right-20 bottom-1/4 h-64 w-64 bg-indigo-500/5"
            duration={18}
            delay={5}
          />
        </>
      )}

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 layout-container px-4 sm:px-6 lg:px-10">
        {/* ── Header ── */}
        <motion.div
          className="mx-auto mb-14 max-w-3xl text-center md:mb-20"
          {...motionProps}
          variants={containerVariants}
        >
          <motion.div variants={fadeUpVariants}>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet/20 bg-violet/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet backdrop-blur-sm">
              <Award className="h-3.5 w-3.5" />
              Why Choose Us
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
            className="mx-auto mt-4 max-w-2xl text-base text-ink-mute md:text-lg"
          >
            {intro}
          </motion.p>
        </motion.div>

        {/* ── Cards Grid ── */}
        <motion.div
          className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 md:gap-8"
          variants={containerVariants}
          {...motionProps}
          role="list"
        >
          {options.map((option, index) => {

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -6, transition: { duration: 0.3, ease: "easeOut" } }
                }
                className="group relative"
                role="listitem"
              >
                {/* Glow on hover */}
                <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-br from-violet/0 via-violet/0 to-violet/0 opacity-0 blur-xl transition-all duration-500 group-hover:from-violet/10 group-hover:via-violet/5 group-hover:to-transparent group-hover:opacity-100" />

                {/* Card */}
                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-surface-1/30 p-6 shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-violet/30 hover:shadow-lg hover:shadow-violet/5 sm:p-8">
                  {/* Hover gradient */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet/[0.02] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Top accent */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-violet/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Title */}
                  <div className="relative z-10 mb-5 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet to-violet-soft text-sm font-bold text-white shadow-md shadow-violet/20">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-lg font-semibold text-ink">
                      {option.option}
                    </h3>
                  </div>

                  {/* Content sections */}
                  <div className="relative z-10 flex flex-1 flex-col gap-3">
                    {/* Where it works */}
                    <div className="flex items-start gap-3 rounded-xl bg-emerald-500/[0.04] px-3.5 py-3 ring-1 ring-emerald-500/10">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                        <Check className="h-3 w-3" aria-hidden="true" />
                      </span>
                      <span className="text-sm leading-relaxed text-ink-soft">
                        <strong className="text-emerald-600">Best for:</strong>{" "}
                        {option.whereWorks}
                      </span>
                    </div>

                    {/* Where it fails */}
                    <div className="flex items-start gap-3 rounded-xl bg-red-500/[0.04] px-3.5 py-3 ring-1 ring-red-500/10">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-400">
                        <X className="h-3 w-3" aria-hidden="true" />
                      </span>
                      <span className="text-sm leading-relaxed text-ink-soft">
                        <strong className="text-red-600">Not ideal for:</strong>{" "}
                        {option.whereFails}
                      </span>
                    </div>
                  </div>

                  {/* Our Position */}
                  <div className="relative z-10 mt-4 flex items-start gap-3 rounded-xl bg-gradient-to-br from-violet/[0.06] to-violet/[0.02] px-4 py-3.5 ring-1 ring-violet/15 transition-all duration-500 group-hover:from-violet/[0.08] group-hover:ring-violet/25">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet text-white shadow-sm">
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-violet">
                        Our Approach
                      </span>
                      <p className="mt-0.5 text-sm font-medium leading-relaxed text-ink/80">
                        {option.ourPosition}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          className="mt-14 text-center md:mt-20"
          {...motionProps}
          variants={fadeUpVariants}
        >
          <a
            href="/contact"
            className="group inline-flex items-center gap-2.5 rounded-full bg-violet px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet/30"
          >
            Get the right recommendation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
