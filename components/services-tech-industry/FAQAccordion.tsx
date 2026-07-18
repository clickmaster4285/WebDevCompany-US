"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IndustryPageData } from "@/data/tech-serv-industry";

type Props = { items: IndustryPageData["faqs"] };

export function FAQAccordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section>
      <motion.h2
        className="text-3xl font-bold text-center mb-12 text-slate-900"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Frequently Asked Questions
      </motion.h2>

      <motion.div
        className="max-w-3xl mx-auto space-y-3"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Accordion type="single" collapsible className="w-full space-y-3">
          {items.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
              >
                <AccordionItem
                  value={`item-${idx}`}
                  className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-blue-50 border-blue-200 shadow-md"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                >
                  <AccordionTrigger className="w-full text-left p-5 font-semibold flex justify-between items-center gap-4 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                    <span className={isOpen ? "text-blue-900" : "text-slate-900"}>
                      {faq.question}
                    </span>
                  </AccordionTrigger>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <AccordionContent asChild forceMount>
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 pt-0 text-gray-700 leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      </AccordionContent>
                    )}
                  </AnimatePresence>
                </AccordionItem>
              </motion.div>
            );
          })}
        </Accordion>
      </motion.div>
    </section>
  );
}