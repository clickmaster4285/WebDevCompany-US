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
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          Outcome
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-ink mb-6 md:mb-8">
          Representative Outcome
        </h2>

        {/* Challenge / Solution Card */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-surface-1/50 rounded-2xl p-5 md:p-6 border border-border/60 border-l-4 border-l-red-400/60"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-red-400 mb-1.5 uppercase tracking-wide">
                  Challenge
                </h3>
                <p className="text-ink-soft text-sm leading-relaxed">{data.challenge}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-surface-1/50 rounded-2xl p-5 md:p-6 border border-border/60 border-l-4 border-l-green-400/60"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-green-400 mb-1.5 uppercase tracking-wide">
                  Solution
                </h3>
                <p className="text-ink-soft text-sm leading-relaxed">{data.solution}</p>
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
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        >
          {data.metrics.map((metric, index) => (
            <motion.div
              key={index}
              variants={metricVariants}
              className="group bg-surface-1/50 rounded-2xl p-5 md:p-6 border border-border hover:border-violet/30 transition-all duration-500 hover:shadow-lg hover:shadow-violet/5"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-violet/10 flex items-center justify-center group-hover:bg-violet/20 transition-colors">
                  <Target className="w-4 h-4 text-violet" />
                </div>
                <span className="text-xs font-medium text-ink-mute uppercase tracking-wide">
                  {metric.kpi}
                </span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-ink mb-2 group-hover:text-violet transition-colors">
                {metric.result}
              </div>
              <div className="flex items-start gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-ink-mute leading-relaxed">{metric.whyItMatters}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}