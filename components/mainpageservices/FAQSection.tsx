import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/data/services-data";
import { PlateHeader, CornerBrackets } from "./Primitives";

export function FAQSection() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <section className="mb-32">
      <PlateHeader plate="04" label="Questions" title="Frequently Asked Questions" />

      {/* 
        NOTE: Removed `items-start` so both columns stretch to the same height.
        The right column now matches the FAQ list height exactly.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-12 lg:gap-16">

        {/* Left Side: FAQ Accordion */}
        <div className="space-y-2">
          {faqs.map((faq, i) => {
            const isOpen = activeFaq === i;
            return (
              <div key={i} className="relative border border-white/10 bg-white/[0.02] transition-colors duration-300 hover:border-primary/20">
                <span className={`absolute left-0 top-0 h-full w-px transition-colors duration-300 ${isOpen ? "bg-primary" : "bg-transparent"}`} />
                <button
                  onClick={() => setActiveFaq(isOpen ? null : i)}
                  className="flex w-full items-center gap-4 p-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary/70"
                  aria-expanded={isOpen}
                >
                  <span className="font-mono text-xs text-primary/50">Q{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 pr-4 font-medium text-white">{faq.q}</span>
                  <Plus className={`h-5 w-5 flex-shrink-0 text-primary transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="p-5 pl-14 pt-0 text-white/60">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Right Side: Height-Matched FAQ Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden lg:block"
        >
          {/* h-full = stretches to exactly match the FAQ column height */}
          <div className="group relative h-full min-h-[480px] w-full overflow-hidden border border-white/10 bg-surface-1 shadow-2xl shadow-black/50">
            <CornerBrackets active />

            {/* The Actual Image */}
            <Image
              src="/services/faq.png"
              alt="ClickMasters Frequently Asked Questions"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Overlays for depth and theme integration */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Subtle Blueprint Grid Overlay */}
            <div
              className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)
                `,
                backgroundSize: "32px 32px",
              }}
            />

            {/* Tech Readouts (Glassmorphic Badges) */}
            <div className="absolute top-4 left-4 font-mono text-[10px] tracking-widest text-white/80 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
              SYS.KNOWLEDGE // Q&A
            </div>

            <div className="absolute bottom-4 right-4 font-mono text-[11px] tracking-widest text-white/90 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
              {String(faqs.length).padStart(2, "0")} QUESTIONS // ANSWERED
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}