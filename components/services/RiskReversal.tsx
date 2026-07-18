"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ShieldCheck, BadgeCheck, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";

interface RiskReversalProps {
  text: string;
}

/* ─── Animation Variants ─────────────────── */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
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

export function RiskReversal({ text }: RiskReversalProps) {
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
        <div className="absolute left-1/4 top-1/2 h-[450px] w-[450px] rounded-full bg-violet/[0.04] blur-[130px]" />
        <div className="absolute right-1/3 bottom-0 h-[300px] w-[300px] rounded-full bg-indigo-500/[0.03] blur-[100px]" />
      </div>

      {!shouldReduceMotion && (
        <>
          <FloatingOrb className="-left-20 top-1/3 h-56 w-56 bg-violet/5" duration={20} />
          <FloatingOrb className="-right-20 bottom-1/4 h-64 w-64 bg-indigo-500/5" duration={22} delay={4} />
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
        <motion.div
          className="mx-auto max-w-4xl"
          {...motionProps}
          variants={containerVariants}
        >
          {/* Badge */}
          <motion.div variants={fadeUpVariants} className="mb-8 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet/20 bg-violet/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Our Commitment
            </span>
          </motion.div>

          {/* Main Card */}
          <motion.div
            variants={fadeUpVariants}
            className="group relative overflow-hidden rounded-3xl border border-border/50 bg-surface-1/30 p-8 shadow-lg backdrop-blur-sm transition-all duration-500 hover:border-violet/30 hover:shadow-2xl hover:shadow-violet/5 sm:p-10 md:p-12"
          >
            {/* Top accent line */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-violet/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Hover gradient */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet/[0.02] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Decorative background icons */}
            <div className="pointer-events-none absolute -bottom-6 -right-6 flex gap-2 text-violet/[0.04] transition-colors duration-500 group-hover:text-violet/[0.08]">
              <CheckCircle2 className="h-24 w-24" aria-hidden="true" />
              <CheckCircle2 className="h-24 w-24" aria-hidden="true" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left sm:items-start">
              {/* Shield Icon */}
              <motion.div
                className="relative flex shrink-0 items-center justify-center"
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : { rotate: [0, -10, 10, -10, 0], scale: 1.08 }
                }
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {/* Pulse glow */}
                <div className="absolute inset-0 rounded-2xl bg-violet/20 blur-md animate-pulse" />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet to-violet-soft text-white shadow-lg shadow-violet/25 ring-1 ring-violet/30 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-violet/30 sm:h-20 sm:w-20">
                  <ShieldCheck className="h-8 w-8 sm:h-10 sm:w-10" aria-hidden="true" />
                </div>
              </motion.div>

              {/* Content */}
              <div className="flex-1">
                <div className="mb-3 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                  <h3 className="text-xl font-bold tracking-tight text-ink md:text-2xl">
                    Risk Reversal
                  </h3>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-violet/20 bg-violet/10 px-3 py-1 text-xs font-semibold text-violet">
                    <BadgeCheck className="h-3 w-3" aria-hidden="true" />
                    Our Guarantee
                  </span>
                </div>
                <p className="leading-relaxed text-ink-soft md:text-lg">
                  {text}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-8 text-center"
          >
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-violet/10 px-5 py-2.5 text-sm font-medium text-violet ring-1 ring-violet/20 transition-all hover:bg-violet hover:text-white hover:shadow-lg hover:shadow-violet/25"
            >
              Start with confidence
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
