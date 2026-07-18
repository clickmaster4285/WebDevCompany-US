"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface IndustryProcessProps {
  data: {
    heading: string;
    steps: Array<{
      number: number;
      title: string;
      description: string;
    }>;
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function IndustryProcess({ data }: IndustryProcessProps) {
  return (
    <div className="py-10 md:py-14" id="process">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] as const }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
          Process
        </div>
        <h2 className="mb-8 text-2xl font-bold text-ink md:mb-10 md:text-3xl lg:text-4xl text-balance">
          {data.heading}
        </h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-4 sm:grid-cols-2 md:gap-6"
        >
          {data.steps.map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group flex gap-4 rounded-2xl border border-border bg-surface-1/50 p-5 transition-all duration-500 hover:border-violet/30 hover:shadow-lg hover:shadow-violet/5 md:p-6"
            >
              <div className="flex-shrink-0">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet/10 text-sm font-bold text-violet transition-all duration-300 group-hover:bg-violet group-hover:text-white">
                  {step.number}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1.5 flex items-center gap-2">
                  <h3 className="text-base font-semibold text-ink transition-colors group-hover:text-violet md:text-lg">
                    {step.title}
                  </h3>
                  <ArrowRight className="h-4 w-4 -translate-x-2 text-ink-mute opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </div>
                <p className="text-sm leading-relaxed text-ink-mute">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}