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
    <div className="py-10 md:py-14" id="solution">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] as const }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet/10 border border-violet/20 text-violet text-xs font-medium mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-violet" />
          Our Solution
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-ink mb-4 max-w-3xl">
          {data.heading}
        </h2>
        <p className="text-ink-soft leading-relaxed mb-8 md:mb-10 max-w-2xl text-sm sm:text-base">
          {data.content}
        </p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {data.pillars.map((pillar, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative bg-surface-1/50 rounded-2xl p-5 md:p-6 border border-border hover:border-violet/40 transition-all duration-500 hover:shadow-lg hover:shadow-violet/5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet/10 text-violet transition-colors group-hover:bg-violet/20">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-ink group-hover:text-violet transition-colors">
                  {pillar.title}
                </h3>
              </div>
              <p className="text-ink-soft text-sm leading-relaxed">
                {pillar.description}
              </p>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-4 h-4 text-violet/60" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}