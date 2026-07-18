"use client";

import { motion } from "framer-motion";
import { X, Check, ShieldCheck } from "lucide-react";

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
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-400">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          Comparison
        </div>
        <h2 className="mb-4 max-w-3xl text-2xl font-bold text-ink md:text-3xl lg:text-4xl text-balance">
          {data.heading}
        </h2>
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-base md:mb-10">
          {data.intro}
        </p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid gap-4 md:grid-cols-2 md:gap-6"
        >
          {data.options.map((option, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group rounded-2xl border border-border bg-surface-1/50 p-5 transition-all duration-500 hover:border-amber-400/20 md:p-6"
            >
              <h3 className="mb-4 text-base font-semibold text-ink transition-colors group-hover:text-amber-400 md:text-lg">
                {option.option}
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-3">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                  <span className="text-ink-soft">
                    <span className="mb-0.5 block font-medium text-emerald-400">Works</span>
                    {option.whereWorks}
                  </span>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-red-500/10 bg-red-500/5 p-3">
                  <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                  <span className="text-ink-soft">
                    <span className="mb-0.5 block font-medium text-red-400">Fails</span>
                    {option.whereFails}
                  </span>
                </div>

                <div className="flex items-start gap-3 border-t border-border pt-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-violet" />
                  <span>
                    <span className="font-medium text-violet">Our Position:</span>{" "}
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