// components/services/RiskReversal.tsx

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, BadgeCheck } from "lucide-react";

interface RiskReversalProps {
  text: string;
}

export function RiskReversal({ text }: RiskReversalProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="border-t border-border/60 bg-background py-10 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="group relative overflow-hidden rounded-2xl border border-green-500/20 bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-5 backdrop-blur-sm transition-all duration-300 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/10 md:p-6">
            <div className="relative z-10 flex items-start gap-4">
              <motion.div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-500/15 text-green-600"
                whileHover={shouldReduceMotion ? {} : { rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <ShieldCheck className="h-6 w-6" />
              </motion.div>

              <div className="flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-green-700">
                    Risk Reversal
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-500/15 px-2 py-0.5 text-xs font-medium text-green-700">
                    <BadgeCheck className="h-3 w-3" />
                    Our Guarantee
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-foreground md:text-base">
                  {text}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}