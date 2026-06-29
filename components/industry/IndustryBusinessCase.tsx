"use client";

import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";

interface IndustryBusinessCaseProps {
  data: {
    heading: string;
    content: string;
    valueStreams: string[];
  };
}

export function IndustryBusinessCase({ data }: IndustryBusinessCaseProps) {
  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          Business Case
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-ink mb-4">
          {data.heading}
        </h2>
        <p className="text-ink-soft leading-relaxed mb-6">
          {data.content}
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {data.valueStreams.map((stream, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-surface-1/50 rounded-xl p-4 border border-border"
            >
              <DollarSign className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span className="text-sm text-ink-soft">{stream}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
