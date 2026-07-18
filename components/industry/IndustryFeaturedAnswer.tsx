"use client";

import { motion } from "framer-motion";
import { Lightbulb, Quote } from "lucide-react";

interface IndustryFeaturedAnswerProps {
  data: {
    question: string;
    answer: string;
  };
}

export function IndustryFeaturedAnswer({ data }: IndustryFeaturedAnswerProps) {
  return (
    <div className="py-10 md:py-14">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] as const }}
        viewport={{ once: true, margin: "-80px" }}
        className="relative bg-surface-1/50 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 border border-border overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet/[0.03] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

        <div className="relative flex flex-col md:flex-row items-start gap-5 md:gap-6">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-violet/10 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 md:w-7 md:h-7 text-violet" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 mb-3">
              <Quote className="w-5 h-5 text-violet/40 flex-shrink-0 mt-1" />
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-ink leading-snug">
                {data.question}
              </h2>
            </div>
            <div className="pl-7 border-l-2 border-violet/20">
              <p className="text-ink-soft leading-relaxed text-sm md:text-base">
                {data.answer}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}