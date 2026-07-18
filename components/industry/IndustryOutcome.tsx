"use client";

import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle, CheckCircle2, Target } from "lucide-react";

interface IndustryOutcomeProps {
  data: {
    challenge: string;
    solution: string;
    metrics: Array<{
      kpi: string;
      result: string;
      whyItMatters: string;
    }>;
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const metricVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] as const },
  },
};

export function IndustryOutcome({ data }: IndustryOutcomeProps) {
  return (
    <div className="py-10 md:py-14" id="outcome">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] as const }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-400">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
          Outcome
        </div>
        <h2 className="mb-6 text-2xl font-bold text-ink md:mb-8 md:text-3xl lg:text-4xl text-balance">
          Representative Outcome
        </h2>

        {/* Challenge / Solution Card */}
        <div className="mb-6 grid gap-4 md:mb-8 md:grid-cols-2 md:gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border/60 border-l-4 border-l-red-400/60 bg-surface-1/50 p-5 md:p-6"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-red-400">
                  Challenge
                </h3>
                <p className="text-sm leading-relaxed text-ink-soft">{data.challenge}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border/60 border-l-4 border-l-green-400/60 bg-surface-1/50 p-5 md:p-6"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-green-400">
                  Solution
                </h3>
                <p className="text-sm leading-relaxed text-ink-soft">{data.solution}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Metrics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5"
        >
          {data.metrics.map((metric, index) => (
            <motion.div
              key={index}
              variants={metricVariants}
              className="group rounded-2xl border border-border bg-surface-1/50 p-5 transition-all duration-500 hover:border-violet/30 hover:shadow-lg hover:shadow-violet/5 md:p-6"
            >
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet/10 transition-colors group-hover:bg-violet/20">
                  <Target className="h-4 w-4 text-violet" />
                </div>
                <span className="text-xs font-medium uppercase tracking-wide text-ink-mute">
                  {metric.kpi}
                </span>
              </div>
              <div className="mb-2 text-2xl font-bold text-ink transition-colors group-hover:text-violet md:text-3xl">
                {metric.result}
              </div>
              <div className="flex items-start gap-1.5">
                <TrendingUp className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-400" />
                <p className="text-sm leading-relaxed text-ink-mute">{metric.whyItMatters}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}