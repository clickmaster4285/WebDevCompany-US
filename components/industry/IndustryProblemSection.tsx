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
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
          The Problem
        </div>

        <div className={`grid grid-cols-1 ${hasImage ? 'lg:grid-cols-2 gap-10 lg:gap-14' : ''} items-start`}>
          {/* Left: Content */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-ink mb-6">
              {data.heading}
            </h2>
            <div className="space-y-4 text-ink-soft leading-relaxed">
              {data.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          {hasImage && (
            <div className="relative mt-6 lg:mt-0">
              <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-1/60 shadow-xl">
                <Image
                  src={data.image!}
                  alt={data.imageAlt || "Industry visual"}
                  width={600}
                  height={400}
                  className="h-auto w-full object-cover"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
