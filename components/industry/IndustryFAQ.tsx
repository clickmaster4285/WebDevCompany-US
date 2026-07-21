"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface IndustryFAQProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export function IndustryFAQ({ faqs }: IndustryFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div className="py-12 sm:py-16 md:py-20 lg:py-24" id="faq">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] as const }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1.5 text-xs font-medium text-purple-400">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
          FAQ
        </div>
        <h2 className="mb-6 text-2xl font-bold text-ink md:mb-8 md:text-3xl lg:text-4xl text-balance">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-xl border border-border bg-surface-1/50 transition-colors duration-300 hover:border-purple-500/20 md:rounded-2xl"
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="group flex min-h-11 w-full items-center justify-between p-5 text-left transition-colors duration-200 hover:bg-surface-1/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/30 md:p-6"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3 pr-4 text-sm font-medium text-ink md:text-base">
                    <HelpCircle className="h-5 w-5 shrink-0 text-purple-400/60 transition-colors group-hover:text-purple-400" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-ink-mute transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-purple-400" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] as const }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-0 md:px-6 md:pb-6">
                        <div className="border-l-2 border-purple-500/20 pl-8">
                          <p className="text-sm leading-relaxed text-ink-soft md:text-base">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}