// components/cost/CostHero.tsx

"use client";

import { motion } from "framer-motion";
import { DollarSign, Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CostHeroProps {
  title: string;
  description: string;
  priceRange: string;
  timeline: string;
  credibilityBar?: string[];
  className?: string;
}

// Custom easing from your CSS variables
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOutExpo,
    },
  },
};

export function CostHero({
  title,
  description,
  priceRange,
  timeline,
  credibilityBar = [],
  className,
}: CostHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-surface-2 py-20 md:py-28 lg:py-36",
        className
      )}
      aria-label="Cost guide hero"
    >
      {/* Subtle violet top glow for brand accent */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,_var(--color-violet)/15,_transparent_70%)]" />

      {/* Bottom dark vignette for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

      {/* Soft ambient glow orbs */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-violet/10 blur-[120px] md:h-96 md:w-96" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-violet/5 blur-[140px] md:h-[28rem] md:w-[28rem]" />

      {/* Grain texture overlay */}
      <div className="grain-after" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center lg:mx-0 lg:text-left"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-border bg-white/5 px-4 py-2 text-sm font-medium text-ink-soft backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet" />
            </span>
            Cost Guide
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-display text-4xl text-ink md:text-5xl lg:text-6xl xl:text-7xl text-balance"
          >
            {title}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-mute text-balance lg:mx-0 md:text-xl"
          >
            {description}
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start"
          >
            <div className="glass flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 hover:bg-white/5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet/15 text-violet">
                <DollarSign className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs font-medium uppercase tracking-wider text-ink-mute">
                  Price Range
                </div>
                <div className="text-lg font-bold text-ink tabular-nums">
                  {priceRange}
                </div>
              </div>
            </div>

            <div className="glass flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 hover:bg-white/5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet/15 text-violet">
                <Clock className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs font-medium uppercase tracking-wider text-ink-mute">
                  Timeline
                </div>
                <div className="text-lg font-bold text-ink">
                  {timeline}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Credibility Bar */}
          {credibilityBar.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap justify-center gap-3 gap-y-2 border-t border-border/50 pt-6 lg:justify-start"
            >
              {credibilityBar.map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-3 py-1.5 text-sm text-ink-soft"
                >
                  <CheckCircle2 className="h-4 w-4 text-violet" />
                  {item}
                </span>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}