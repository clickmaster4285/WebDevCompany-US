"use client";

import { motion } from "framer-motion";
import { X, Check, Star, ShieldCheck } from "lucide-react";

interface IndustryComparisonProps {
  data: {
    heading: string;
    intro: string;
    options: Array<{
      option: string;
      whereWorks: string;
      whereFails: string;
      ourPosition: string;
    }>;
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
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

export function IndustryComparison({ data }: IndustryComparisonProps) {
  return (
    <div className="py-10 md:py-14" id="comparison">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] as const }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          Comparison
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-ink mb-4 max-w-3xl">
          {data.heading}
        </h2>
        <p className="text-ink-soft leading-relaxed mb-8 md:mb-10 max-w-2xl text-sm sm:text-base">
          {data.intro}
        </p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid md:grid-cols-2 gap-4 md:gap-6"
        >
          {data.options.map((option, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group bg-surface-1/50 rounded-2xl p-5 md:p-6 border border-border hover:border-amber-400/20 transition-all duration-500"
            >
              <h3 className="text-base md:text-lg font-semibold text-ink mb-4 group-hover:text-amber-400 transition-colors">
                {option.option}
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-ink-soft">
                    <span className="text-emerald-400 font-medium block mb-0.5">Works</span>
                    {option.whereWorks}
                  </span>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-red-500/5 border border-red-500/10">
                  <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-ink-soft">
                    <span className="text-red-400 font-medium block mb-0.5">Fails</span>
                    {option.whereFails}
                  </span>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-border">
                  <ShieldCheck className="w-4 h-4 text-violet flex-shrink-0 mt-0.5" />
                  <span>
                    <span className="text-violet font-medium">Our Position:</span>{" "}
                    <span className="text-ink-soft">{option.ourPosition}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}