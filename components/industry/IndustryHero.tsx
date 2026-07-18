"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";

/* ------------------------------------------------------------------ */
// Types
/* ------------------------------------------------------------------ */

interface IndustryHeroProps {
  data: {
    heading: string;
    subheading: string;
    credibilityBar: string[];
    primaryCTA: string;
    secondaryCTA: string;
    socialProof: string;
  };
}

/* ------------------------------------------------------------------ */
// Animation Variants
/* ------------------------------------------------------------------ */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] as const },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, x: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.9, ease: [0.215, 0.61, 0.355, 1] as const, delay: 0.3 },
  },
};

/* ------------------------------------------------------------------ */
// Component
/* ------------------------------------------------------------------ */

export function IndustryHero({ data }: IndustryHeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const isReduced = Boolean(shouldReduceMotion);

  return (
    <section className="relative overflow-hidden bg-background pt-20 pb-16 md:pt-28 md:pb-24 lg:pt-32 lg:pb-28">
      {/* Ambient glow effects */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute right-0 top-0 h-[500px] w-[500px] md:h-[700px] md:w-[700px] rounded-full bg-violet/[0.05] blur-[120px] md:blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-violet/[0.03] blur-[100px] md:blur-[120px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial={isReduced ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        // Changed grid columns to pull image closer, reduced gap to gap-8/gap-10
        // Applied your responsive padding
        className="relative layout-container grid grid-cols-1 items-center gap-8 px-4 sm:px-6 md:grid-cols-[1.15fr_0.85fr] md:gap-10 lg:gap-12 md:px-[4.5rem] lg:px-20"
      >
        {/* ===== LEFT COLUMN — Content ===== */}
        <div className="flex flex-col pt-2 md:pt-6 lg:pt-8">
          <motion.div variants={itemVariants} className="mb-5 self-start">
            <Breadcrumb customLabels={{ industries: "Industries" }} />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl md:text-5xl lg:text-6xl text-balance"
          >
            {data.heading}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg md:text-xl"
          >
            {data.subheading}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-wrap gap-2.5"
          >
            {data.credibilityBar.map((item, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-surface-1/40 px-3 py-1.5 text-sm text-ink-soft backdrop-blur-sm transition-colors hover:border-violet/30 hover:bg-violet/5"
              >
                <CheckCircle className="h-3.5 w-3.5 text-violet" />
                {item}
              </span>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap gap-3 md:mt-10"
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-violet px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet/25 transition-all hover:bg-violet/90 hover:shadow-xl hover:shadow-violet/30 active:scale-[0.98] sm:px-8 sm:py-4 sm:text-base"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              {data.primaryCTA}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#overview"
              className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface-1/40 px-6 py-3.5 text-sm font-semibold text-ink-soft backdrop-blur-md transition-all hover:border-violet/40 hover:bg-violet/5 hover:text-ink active:scale-[0.98] sm:px-8 sm:py-4 sm:text-base"
            >
              {data.secondaryCTA}
            </Link>
          </motion.div>
        </div>

        {/* ===== RIGHT COLUMN — Image ===== */}
        <motion.div
          variants={imageVariants}
          initial={isReduced ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="relative flex w-full items-center justify-center lg:justify-end"
        >
          {/* Glow behind image */}
          <div className="absolute -inset-4 md:-inset-8 rounded-full bg-violet/10 blur-[50px] md:blur-[70px]" />

          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border/60 bg-surface-1/40 shadow-2xl backdrop-blur-sm md:rounded-3xl">
            <Image
              src="/foridustryherosection.png"
              alt="Industry hero illustration"
              width={700}
              height={500}
              className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
            <div className="absolute inset-0 rounded-2xl md:rounded-3xl ring-1 ring-inset ring-border/60" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}