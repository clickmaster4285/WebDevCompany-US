// components/cost/CostBreakdown.tsx

"use client";

import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface CostBreakdownItem {
  item: string;
  estimatedCost: string;
  description: string;
}

interface CostBreakdownProps {
  heading: string;
  items: CostBreakdownItem[];
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

export function CostBreakdown({
  heading,
  items,
  className,
}: CostBreakdownProps) {
  return (
    <section
      className={cn("relative overflow-hidden bg-background py-24 md:py-32", className)}
      aria-labelledby="cost-breakdown-heading"
    >
      <div className="layout-container px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="text-center"
        >
          <span className="text-eyebrow mb-4 block">Cost Estimation</span>
          <h2
            id="cost-breakdown-heading"
            className="text-display text-3xl md:text-4xl lg:text-5xl text-balance"
          >
            {heading}
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mt-12 grid max-w-4xl gap-4 md:gap-5"
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -4,
                transition: { duration: 0.25, ease: easeOutExpo },
              }}
              whileTap={{ scale: 0.995 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-surface-1 p-6 transition-all duration-300 ease-out hover:border-violet/30 hover:bg-surface-2 hover:violet-glow md:p-8"
            >
              {/* Left accent gradient on hover */}
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-violet to-violet-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold leading-snug text-ink md:text-xl">
                    {item.item}
                  </h3>
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink-mute md:text-base">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start rounded-full bg-violet/10 px-3 py-1.5 text-lg font-bold text-violet tabular-nums ring-1 ring-violet/20">
                  <DollarSign className="h-4 w-4 md:h-5 md:w-5" />
                  {item.estimatedCost}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}