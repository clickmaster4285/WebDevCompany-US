// components/cost/CostHero.tsx

"use client";

import { motion } from "framer-motion";
import { DollarSign, Clock, CheckCircle2 } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
        "relative overflow-hidden bg-surface-2 py-20 md:py-20 lg:py-36",
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

      <div className="relative z-10 layout-container px-4 sm:px-6 lg:px-8">
        {/* Two-column grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Breadcrumb */}
            <motion.div variants={itemVariants} className="mb-6">
              <Breadcrumb customLabels={{ costs: 'Cost Guides' }} />
            </motion.div>

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
              className="text-display text-4xl text-ink md:text-5xl lg:text-5xl xl:text-6xl text-balance"
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

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: easeOutExpo }}
            className="relative"
          >
            <div className="relative aspect-[4/3] w-full max-w-2xl mx-auto lg:mx-0">
              {/* Image container with decorative elements */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-violet/10">
                <Image
                  src="/costimage.png"
                  alt="Web development cost visualization and pricing breakdown"
                  fill
                  sizes="(max-width: 1024px) 100vw, 688px"
                  className="object-cover"
                  priority
                />
                
                {/* Overlay gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Decorative floating elements */}
              {/* <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-violet/20 blur-2xl"
              /> */}
              {/* <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-cyan/10 blur-2xl"
              /> */}

              {/* Optional: Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -bottom-4 -right-4 bg-surface-1/95 backdrop-blur-sm border border-border rounded-xl px-4 py-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  {/* <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-violet flex items-center justify-center text-[8px] font-bold text-white">
                      $
                    </div>
                    <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-[8px] font-bold text-white">
                      %
                    </div>
                  </div> */}
                  {/* <span className="text-xs font-medium text-ink">Transparent Pricing</span> */}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}