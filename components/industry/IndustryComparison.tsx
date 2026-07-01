"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

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

export function IndustryComparison({ data }: IndustryComparisonProps) {
  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          Comparison
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-ink mb-4">
          {data.heading}
        </h2>
        <p className="text-ink-soft leading-relaxed mb-8">
          {data.intro}
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {data.options.map((option, index) => (
            <div
              key={index}
              className="bg-surface-1/50 rounded-xl p-6 border border-border"
            >
              <h3 className="text-lg font-semibold text-ink mb-3">
                {option.option}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-ink-soft">
                    <span className="text-emerald-400 font-medium">Works:</span> {option.whereWorks}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-ink-soft">
                    <span className="text-red-400 font-medium">Fails:</span> {option.whereFails}
                  </span>
                </div>
                <div className="flex items-start gap-2 pt-2 border-t border-border">
                  <span className="text-violet font-medium">Our Position:</span>
                  <span className="text-ink-soft">{option.ourPosition}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
