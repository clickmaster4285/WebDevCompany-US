"use client";

import { motion } from "framer-motion";
import { CheckCircle, ArrowUpRight } from "lucide-react";

interface IndustrySolutionSectionProps {
  data: {
    heading: string;
    content: string;
    pillars: Array<{
      title: string;
      description: string;
    }>;
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function IndustrySolutionSection({ data }: IndustrySolutionSectionProps) {
  return (
    <div className="py-12 sm:py-16 md:py-20 lg:py-24" id="solution">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] as const }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet/20 bg-violet/10 px-3 py-1.5 text-xs font-medium text-violet">
          <span className="h-1.5 w-1.5 rounded-full bg-violet" />
          Our Solution
        </div>
        <h2 className="mb-4 max-w-3xl text-2xl font-bold text-ink md:text-3xl lg:text-4xl text-balance">
          {data.heading}
        </h2>
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-base md:mb-10">
          {data.content}
        </p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6"
        >
          {data.pillars.map((pillar, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative rounded-2xl border border-border bg-surface-1/50 p-5 transition-all duration-500 hover:border-violet/40 hover:shadow-lg hover:shadow-violet/5 md:p-6"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet/10 text-violet transition-colors group-hover:bg-violet/20">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-ink transition-colors group-hover:text-violet md:text-lg">
                  {pillar.title}
                </h3>
              </div>
              <p className="pr-4 text-sm leading-relaxed text-ink-soft">
                {pillar.description}
              </p>
              <div className="absolute right-4 top-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <ArrowUpRight className="h-4 w-4 text-violet/60" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}