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

  const toggleIndex = useCallback(
    (index: number) => {
      setOpenIndex((prev) => (prev === index ? null : index));
    },
    []
  );

  return (
    <div className="py-10 md:py-14" id="faq">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] as const }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          FAQ
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-ink mb-6 md:mb-8">
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
                className="bg-surface-1/50 rounded-xl md:rounded-2xl border border-border overflow-hidden transition-colors duration-300 hover:border-purple-500/20"
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-surface-1/70 transition-colors duration-200 group"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3 text-ink font-medium pr-4 text-sm md:text-base">
                    <HelpCircle className="w-5 h-5 text-purple-400/60 flex-shrink-0 group-hover:text-purple-400 transition-colors" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-ink-mute flex-shrink-0 transition-transform duration-300 ${
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
                      <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                        <div className="pl-8 border-l-2 border-purple-500/20">
                          <p className="text-ink-soft leading-relaxed text-sm md:text-base">
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