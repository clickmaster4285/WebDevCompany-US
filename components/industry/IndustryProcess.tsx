"use client";

import { motion } from "framer-motion";

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

export function IndustryProcess({ data }: IndustryProcessProps) {
  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          Process
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-ink mb-8">
          {data.heading}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {data.steps.map((step, index) => (
            <div
              key={index}
              className="flex gap-4 bg-surface-1/50 rounded-xl p-6 border border-border hover:border-violet/30 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-violet/20 flex items-center justify-center text-violet font-bold text-sm">
                {step.number}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ink mb-1">
                  {step.title}
                </h3>
                <p className="text-ink-mute text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
