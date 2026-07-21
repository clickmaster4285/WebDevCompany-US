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
    <div className="py-12 sm:py-16 md:py-20 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] as const }}
        viewport={{ once: true, margin: "-80px" }}
        className="relative overflow-hidden rounded-2xl border border-border bg-surface-1/50 p-5 sm:p-6 md:rounded-3xl md:p-8 lg:p-10"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-violet/3 blur-[80px] -translate-y-1/2 translate-x-1/2" />

        <div className="relative flex flex-col md:flex-row items-start gap-5 md:gap-6">
          <div className="shrink-0">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-violet/10 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 md:w-7 md:h-7 text-violet" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 mb-3">
              <Quote className="mt-1 h-5 w-5 shrink-0 text-violet/40" />
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