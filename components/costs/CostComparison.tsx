// components/cost/CostComparison.tsx

"use client";

import { motion } from "framer-motion";
import { DollarSign, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CostComparisonOption {
  option: string;
  cost: string;
  bestFor: string;
  tradeoffs: string;
}

interface CostComparisonProps {
  heading: string;
  intro: string;
  options: CostComparisonOption[];
  className?: string;
}

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
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOutExpo,
    },
  },
};

export function CostComparison({
  heading,
  intro,
  options,
  className,
}: CostComparisonProps) {
  return (
    <section
      className={cn("relative overflow-hidden bg-background py-24 md:py-20", className)}
      aria-labelledby="cost-comparison-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mb-12 text-center md:mb-16"
        >
          <span className="text-eyebrow mb-4 block">Compare Options</span>
          <h2
            id="cost-comparison-heading"
            className="text-display text-3xl md:text-4xl lg:text-5xl text-balance"
          >
            {heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-ink-mute md:text-lg">
            {intro}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4"
        >
          {options.map((option, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -6,
                transition: { duration: 0.25, ease: easeOutExpo },
              }}
              whileTap={{ scale: 0.995 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-surface-1 p-6 transition-all duration-300 ease-out hover:border-violet/30 hover:bg-surface-2 hover:violet-glow md:p-7"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet to-violet-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div>
                <h3 className="text-lg font-semibold text-ink md:text-xl">
                  {option.option}
                </h3>
                <div className="mt-3 flex items-center gap-1.5 text-2xl font-bold tabular-nums text-violet md:text-3xl">
                  <DollarSign className="h-5 w-5 md:h-6 md:w-6" />
                  {option.cost}
                </div>
              </div>

              <div className="my-5 h-px bg-border/60" />

              <div className="flex flex-1 flex-col gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-soft">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Best For
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    {option.bestFor}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-mute">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Tradeoffs
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-mute">
                    {option.tradeoffs}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}