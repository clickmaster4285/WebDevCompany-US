"use client";

import { motion } from "framer-motion";

interface IndustryFeaturedAnswerProps {
  data: {
    question: string;
    answer: string;
  };
}

export function IndustryFeaturedAnswer({ data }: IndustryFeaturedAnswerProps) {
  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-surface-1/50 rounded-2xl p-8 border border-border"
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-violet/20 flex items-center justify-center text-2xl">
            💡
          </div>
          <div>
            <h2 className="text-xl font-semibold text-ink mb-3">
              {data.question}
            </h2>
            <p className="text-ink-soft leading-relaxed">
              {data.answer}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
