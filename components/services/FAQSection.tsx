// components/services/FAQSection.tsx

"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";
import { FAQ } from "@/lib/data/services";
import { Section } from "@/components/ui/Section";

interface FAQSectionProps {
  faqs: FAQ[];
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24,
      delay: i * 0.06,
    },
  }),
};

export function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section background="gray" padding="lg">
      <div className="mx-auto max-w-3xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <HelpCircle className="h-4 w-4" />
            Common Questions
          </span>
          <h2 className="heading-2 mt-4">Questions Serious Buyers Ask</h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm transition-colors hover:border-primary/20"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={itemVariants}
            >
              <button
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-muted/30 md:px-6"
                onClick={() => toggle(index)}
                aria-expanded={openIndex === index}
              >
                <span className="text-base font-semibold text-foreground md:text-lg">
                  {faq.question}
                </span>
                <motion.span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-5 w-5" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                    }
                  >
                    <div className="border-t border-border/50 px-5 pb-6 pt-2 text-muted-foreground md:px-6">
                      <p className="leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}