"use client";

import { motion } from "framer-motion";
import { DollarSign, TrendingUp, PiggyBank, BarChart3 } from "lucide-react";

interface IndustryBusinessCaseProps {
  data: {
    heading: string;
    content: string;
    valueStreams: string[];
  };
}

const icons = [TrendingUp, PiggyBank, BarChart3, DollarSign];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function IndustryBusinessCase({ data }: IndustryBusinessCaseProps) {
  return (
    <div className="py-10 md:py-14" id="business-case">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          Business Case
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-ink mb-4 max-w-3xl">
          {data.heading}
        </h2>
        <p className="text-ink-soft leading-relaxed mb-6 md:mb-8 max-w-2xl text-sm sm:text-base">
          {data.content}
        </p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid sm:grid-cols-2 gap-3 md:gap-4"
        >
          {data.valueStreams.map((stream, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group flex items-center gap-3.5 bg-surface-1/50 rounded-xl p-4 md:p-5 border border-border hover:border-emerald-400/30 transition-all duration-500 hover:shadow-lg hover:shadow-emerald-500/5"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-400 group-hover:text-white transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm text-ink-soft group-hover:text-ink transition-colors">
                  {stream}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}