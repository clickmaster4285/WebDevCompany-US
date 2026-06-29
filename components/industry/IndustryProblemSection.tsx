"use client";

import { motion } from "framer-motion";

interface IndustryProblemSectionProps {
  data: {
    heading: string;
    content: string[];
  };
}

export function IndustryProblemSection({ data }: IndustryProblemSectionProps) {
  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
          The Problem
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-ink mb-6">
          {data.heading}
        </h2>
        <div className="space-y-4 text-ink-soft leading-relaxed">
          {data.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
