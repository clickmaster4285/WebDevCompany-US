// components/cost/CostFactors.tsx

"use client";

import { motion } from "framer-motion";
import { TrendingDown, Minus, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface CostFactor {
  factor: string;
  description: string;
  impact: "Low" | "Medium" | "High";
}

interface CostFactorsProps {
  heading: string;
  items: CostFactor[];
  className?: string;
}

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
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

const impactConfig = {
  Low: {
    icon: TrendingDown,
    label: "Low Impact",
    container: "bg-surface-2 border-border text-ink-soft",
    dot: "bg-violet/50",
  },
  Medium: {
    icon: Minus,
    label: "Medium Impact",
    container: "bg-violet/10 border-violet/20 text-violet",
    dot: "bg-violet",
  },
  High: {
    icon: TrendingUp,
    label: "High Impact",
    container: "bg-violet/15 border-violet/30 text-violet",
    dot: "bg-violet",
  },
};

export function CostFactors({ heading, items, className }: CostFactorsProps) {
  return (
    <section
      className={cn("relative overflow-hidden bg-background py-24 md:py-32", className)}
      aria-labelledby="cost-factors-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mb-12 text-center md:mb-16"
        >
          <span className="text-eyebrow mb-4 block">Key Factors</span>
          <h2
            id="cost-factors-heading"
            className="text-display text-3xl md:text-4xl lg:text-5xl text-balance"
          >
            {heading}
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2 md:gap-6"
        >
          {items.map((factor, index) => {
            const config = impactConfig[factor.impact];
            const ImpactIcon = config.icon;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.25, ease: easeOutExpo },
                }}
                whileTap={{ scale: 0.995 }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-surface-1 p-6 transition-all duration-300 ease-out hover:border-violet/30 hover:bg-surface-2 md:p-7"
              >
                <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-violet to-violet-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-ink transition-colors duration-300 group-hover:text-violet md:text-xl">
                      {factor.factor}
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-mute md:text-base">
                      {factor.description}
                    </p>
                  </div>

                  <span
                    className={cn(
                      "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider",
                      config.container
                    )}
                    title={config.label}
                  >
                    <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />
                    <ImpactIcon className="h-3 w-3" />
                    <span className="hidden sm:inline">{factor.impact}</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}