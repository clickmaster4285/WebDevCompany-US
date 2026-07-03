"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";

interface IndustryHeroProps {
  data: {
    heading: string;
    subheading: string;
    credibilityBar: string[];
    primaryCTA: string;
    secondaryCTA: string;
    socialProof: string;
  };
  title: string;
}

export function IndustryHero({ data, title }: IndustryHeroProps) {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-20 bg-linear-to-br from-surface-0 via-surface-1 to-surface-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-violet/5 via-transparent to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-4xl">
          <div className="mb-6">
            <Breadcrumb customLabels={{ industries: 'Industries' }} />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink leading-tight mb-4">
              {data.heading}
            </h1>
            <p className="text-lg md:text-xl text-ink-soft leading-relaxed mb-6 max-w-2xl">
              {data.subheading}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            {data.credibilityBar.map((item, index) => (
              <span key={index} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-ink-soft">
                <CheckCircle className="w-4 h-4 text-violet" />
                {item}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet hover:bg-violet/90 text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-violet/25"
            >
              {data.primaryCTA}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#overview"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:bg-white/5 text-ink font-medium rounded-full transition-all duration-300"
            >
              {data.secondaryCTA}
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-sm text-ink-mute"
          >
            {data.socialProof}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
