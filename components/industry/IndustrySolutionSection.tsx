"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface IndustrySolutionSectionProps {
  data: {
    heading: string;
    content: string;
    pillars: Array<{
      title: string;
      description: string;
    }>;
  };
}

export function IndustrySolutionSection({ data }: IndustrySolutionSectionProps) {
  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet/10 border border-violet/20 text-violet text-xs font-medium mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-violet" />
          Our Solution
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-ink mb-4">
          {data.heading}
        </h2>
        <p className="text-ink-soft leading-relaxed mb-8">
          {data.content}
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {data.pillars.map((pillar, index) => (
            <div
              key={index}
              className="bg-surface-1/50 rounded-xl p-6 border border-border hover:border-violet/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-5 h-5 text-violet flex-shrink-0" />
                <h3 className="text-lg font-semibold text-white">
                  {pillar.title}
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
