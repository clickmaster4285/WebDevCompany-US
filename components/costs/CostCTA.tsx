// components/cost/CostCTA.tsx

"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CostCTAProps {
  heading: string;
  primary: string;
  secondary: string;
  primaryLink?: string;
  secondaryLink?: string;
  className?: string;
}

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function CostCTA({
  heading,
  primary,
  secondary,
  primaryLink = "/contact",
  secondaryLink = "/contact",
  className,
}: CostCTAProps) {
  return (
    <section
      className={cn("relative overflow-hidden py-24 md:py-32", className)}
      aria-label="Call to action"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet via-violet to-violet-soft" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,_oklch(1_0_0/0.15),_transparent_70%)]" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-[120px]" />

      {/* Proper grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
        }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-eyebrow mb-4 block text-white/70">
            Ready to Get Started?
          </span>

          <h2 className="text-display text-3xl text-white md:text-4xl lg:text-5xl text-balance">
            {heading}
          </h2>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:mt-10">
            <motion.a
              href={primaryLink}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: easeOutExpo }}
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-violet shadow-lg shadow-black/20 transition-shadow duration-300 hover:violet-glow"
            >
              {primary}
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>

            <motion.a
              href={secondaryLink}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: easeOutExpo }}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/50"
            >
              {secondary}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}