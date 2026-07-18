"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface IndustryProblemSectionProps {
  data: {
    heading: string;
    content: string[];
    image?: string;
    imageAlt?: string;
  };
}

export function IndustryProblemSection({ data }: IndustryProblemSectionProps) {
  const hasImage = Boolean(data.image);

  return (
    <div className="py-10 md:py-14" id="problem">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] as const }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          The Problem
        </div>

        <div
          className={`grid grid-cols-1 items-start gap-8 ${
            hasImage ? "lg:grid-cols-2 gap-10 lg:gap-14" : ""
          }`}
        >
          {/* Left: Content */}
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-ink mb-5 md:mb-6">
              {data.heading}
            </h2>
            <div className="space-y-4 text-ink-soft leading-relaxed text-sm sm:text-base">
              {data.content.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          {hasImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] as const }}
              viewport={{ once: true, margin: "-60px" }}
              className="relative mt-4 lg:mt-0"
            >
              <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-1/60 shadow-xl group">
                <Image
                  src={data.image!}
                  alt={data.imageAlt || "Industry visual"}
                  width={600}
                  height={400}
                  className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}