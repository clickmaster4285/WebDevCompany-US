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
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          Process
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-ink mb-8 md:mb-10">
          {data.heading}
        </h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid sm:grid-cols-2 gap-4 md:gap-6"
        >
          {data.steps.map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group flex gap-4 bg-surface-1/50 rounded-2xl p-5 md:p-6 border border-border hover:border-violet/30 transition-all duration-500 hover:shadow-lg hover:shadow-violet/5"
            >
              <div className="flex-shrink-0">
                <div className="w-11 h-11 rounded-full bg-violet/10 flex items-center justify-center text-violet font-bold text-sm group-hover:bg-violet group-hover:text-white transition-all duration-300">
                  {step.number}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="text-base md:text-lg font-semibold text-ink group-hover:text-violet transition-colors">
                    {step.title}
                  </h3>
                  <ArrowRight className="w-4 h-4 text-ink-mute opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
                <p className="text-ink-mute text-sm leading-relaxed">
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