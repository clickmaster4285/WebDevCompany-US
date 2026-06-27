// components/services/CTASection.tsx

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Clock, Shield, FileText } from "lucide-react";
import { PricingData } from "@/lib/data/services";
import { Button } from "@/components/ui/Button";

interface CTASectionProps {
  heading: string;
  primary: string;
  secondary: string;
  pricing: PricingData;
}

const trustBadges = [
  { icon: Shield, text: "No obligation" },
  { icon: Clock, text: "30-minute consultation" },
  { icon: FileText, text: "Clear scope & pricing" },
];

export function CTASection({ heading, primary, secondary, pricing }: CTASectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="cta-section" id="consultation">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="cta-content relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={
            shouldReduceMotion
              ? { duration: 0.3 }
              : { duration: 0.6, type: "spring", stiffness: 100, damping: 20 }
          }
        >
          <motion.h2
            className="heading-2 relative z-10 mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {heading}
          </motion.h2>

          <motion.div
            className="relative z-10 mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
            >
              <Button variant="white" size="lg" href="#consultation">
                {primary}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>

            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
            >
              <Button variant="outline-white" size="lg" href="#estimate">
                {secondary}
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative z-10 space-y-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <p className="text-lg text-white/90">
              Typical investment:{" "}
              <strong className="text-white">{pricing.range}</strong>
            </p>
            <p className="mx-auto max-w-2xl text-sm text-white/70">
              {pricing.note}
            </p>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-6 border-t border-white/10 pt-8 sm:gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            {trustBadges.map((badge, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 text-white/70"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05, color: "#ffffff" }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <badge.icon className="h-5 w-5" />
                <span className="text-sm">{badge.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}