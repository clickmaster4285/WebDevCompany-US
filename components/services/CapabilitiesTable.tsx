"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Layers, Check, Sparkles, Zap, TrendingUp, Shield } from "lucide-react";
import { CapabilityItem } from "@/data/services";

interface CapabilitiesTableProps {
  heading: string;
  items: CapabilityItem[];
}

/* ─── Animation Variants ─────────────────── */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
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

const iconMap: Record<string, typeof Layers> = {
  Layers,
  Zap,
  TrendingUp,
  Shield,
};

/* ─── Main Component ─────────────────────── */

export function CapabilitiesTable({ heading, items }: CapabilitiesTableProps) {
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
        <div className="absolute left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-violet/[0.04] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[350px] w-[350px] rounded-full bg-indigo-500/[0.03] blur-[100px]" />
      </div>

      {!shouldReduceMotion && (
        <FloatingOrb
          className="-right-20 top-1/3 h-60 w-60 bg-violet/5"
          duration={20}
        />
      )}

      <div className="relative z-10 layout-container px-4 sm:px-6 lg:px-10">
        {/* ── Header ── */}
        <motion.div
          className="mx-auto mb-14 max-w-3xl text-center md:mb-20"
          {...motionProps}
          variants={containerVariants}
        >
          <motion.div variants={fadeUpVariants}>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet/20 bg-violet/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Core Capabilities
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUpVariants}
            className="text-display mt-5 text-balance text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl lg:text-6xl"
          >
            {heading}
          </motion.h2>
        </motion.div>

        {/* ── Cards Grid ── */}
        <motion.div
          className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
          variants={containerVariants}
          {...motionProps}
          role="list"
        >
          {items.map((item, index) => {
            const Icon = iconMap[index % 4] || Layers;

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
                  {/* Hover gradient overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet/[0.02] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Top accent line */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-violet/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Icon */}
                  <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet/10 to-violet/5 text-violet ring-1 ring-violet/20 transition-all duration-500 group-hover:scale-110 group-hover:from-violet group-hover:to-violet-soft group-hover:text-white group-hover:ring-violet/40 group-hover:shadow-lg group-hover:shadow-violet/30">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  {/* Title */}
                  <h3 className="relative z-10 text-base font-semibold text-ink">
                    {item.service}
                  </h3>

                  {/* Description */}
                  <p className="relative z-10 mt-2 text-sm leading-relaxed text-ink-soft">
                    {item.whatItIs}
                  </p>

                  {/* Separator */}
                  <div className="relative z-10 my-4 h-px w-full bg-gradient-to-r from-border/50 via-border to-border/50" />

                  {/* Business Impact */}
                  <div className="relative z-10 mt-auto flex items-start gap-2.5 rounded-xl bg-violet/[0.04] px-3.5 py-2.5 ring-1 ring-violet/10 transition-all duration-500 group-hover:bg-violet/[0.06] group-hover:ring-violet/20">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet/15 text-violet transition-all duration-500 group-hover:bg-violet group-hover:text-white">
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium leading-relaxed text-ink/80">
                      {item.businessImpact}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Bottom stat ── */}
        <motion.div
          className="mt-12 text-center md:mt-16"
          {...motionProps}
          variants={fadeUpVariants}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface-1/40 px-5 py-2.5 text-sm text-ink-mute backdrop-blur-sm">
            <Shield className="h-4 w-4 text-violet" />
            <span>
              <strong className="text-ink">{items.length} core capabilities</strong>{" "}
              — every project, guaranteed
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
