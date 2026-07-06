// components/cost/CostFAQ.tsx

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

interface CostFAQ {
  question: string;
  answer: string;
}

interface CostFAQProps {
  heading: string;
  faqs: CostFAQ[];
  className?: string;
}

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const faqVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: easeOutExpo,
    },
  }),
};

export function CostFAQ({ heading, faqs, className }: CostFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className={cn("relative overflow-hidden bg-background py-24 md:py-32", className)}
      aria-labelledby="cost-faq-heading"
    >
      <div className="layout-container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mb-12 text-center md:mb-16"
        >
          <span className="text-eyebrow mb-4 block">Frequently Asked Questions</span>
          <h2
            id="cost-faq-heading"
            className="text-display text-3xl md:text-4xl lg:text-5xl text-balance"
          >
            {heading}
          </h2>
        </motion.div>

        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                custom={index}
                variants={faqVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className={cn(
                  "group overflow-hidden rounded-3xl border border-border bg-surface-1 transition-all duration-300 ease-out",
                  isOpen ? "violet-glow" : "hover:border-violet/30 hover:bg-surface-2"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors md:px-7 md:py-6"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-violet/10 text-violet transition-colors group-hover:bg-violet/15">
                      <MessageCircleQuestion className="h-4 w-4" />
                    </span>
                    <span
                      className={cn(
                        "text-base font-semibold leading-snug transition-colors duration-300 md:text-lg",
                        isOpen ? "text-violet" : "text-ink group-hover:text-violet"
                      )}
                    >
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 flex-shrink-0 text-ink-mute transition-transform duration-300 ease-out",
                      isOpen ? "rotate-180 text-violet" : "group-hover:text-violet"
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: easeOutExpo }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border px-6 pb-6 pt-4 text-sm leading-7 text-ink-soft md:px-7 md:text-base">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}