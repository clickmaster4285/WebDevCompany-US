// components/services/CredibilityBar.tsx

"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface CredibilityBarProps {
  items: string[];
}

export function CredibilityBar({ items }: CredibilityBarProps) {
  if (!items.length) return null;

  // Triple for seamless loop
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <section className="overflow-hidden border-y border-border/60 bg-surface-1/50 py-5 backdrop-blur-sm">
      <div className="group relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface-1/80 to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface-1/80 to-transparent sm:w-24" />

        <motion.div
          className="flex items-center gap-8 whitespace-nowrap text-sm font-medium text-ink-soft sm:gap-12 md:text-base"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              duration: Math.max(20, items.length * 4),
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {duplicatedItems.map((item, index) => (
            <span key={index} className="inline-flex items-center gap-2.5">
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-violet/10">
                <Check className="h-3 w-3 text-violet" />
              </span>
              <span className="text-ink">{item}</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}