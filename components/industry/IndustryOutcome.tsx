"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

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

export function IndustryOutcome({ data }: IndustryOutcomeProps) {
  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          Outcome
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-ink mb-6">
          Representative Outcome
        </h2>
        
        <div className="bg-surface-1/50 rounded-xl p-6 border border-border mb-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 text-sm font-bold">!</div>
            <div>
              <h3 className="text-sm font-semibold text-red-400 mb-1">Challenge</h3>
              <p className="text-ink-soft text-sm leading-relaxed">{data.challenge}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-sm font-bold">✓</div>
            <div>
              <h3 className="text-sm font-semibold text-green-400 mb-1">Solution</h3>
              <p className="text-ink-soft text-sm leading-relaxed">{data.solution}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {data.metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-surface-1/50 rounded-xl p-6 border border-border"
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-violet" />
                <span className="text-sm font-medium text-ink-mute">{metric.kpi}</span>
              </div>
              <div className="text-2xl font-bold text-ink mb-2">{metric.result}</div>
              <p className="text-sm text-ink-mute">{metric.whyItMatters}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
