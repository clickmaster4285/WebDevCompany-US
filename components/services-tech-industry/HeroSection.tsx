"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";

type HeroSectionProps = {
  heading: string;
  description: string;
  credibilityBar?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  socialProof?: string;
};

export function HeroSection({
  heading,
  description,
  credibilityBar,
  primaryCTA,
  secondaryCTA,
  socialProof,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
      <div className="layout-container px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl lg:w-1/2"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-5 self-start"
            >
              <Breadcrumb className="[&_a]:text-white/70 [&_a:hover]:text-white [&_[aria-current]]:text-white/90 [&_svg]:text-white/40" />
            </motion.div>
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-slate-200 backdrop-blur">
              Services • Industry expertise
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              {heading}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
              {description}
            </p>
            {(primaryCTA || secondaryCTA) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {primaryCTA && (
                  <Link
                    href="#contact"
                    className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                  >
                    {primaryCTA}
                  </Link>
                )}
                {secondaryCTA && (
                  <Link
                    href="#services"
                    className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/20"
                  >
                    {secondaryCTA}
                  </Link>
                )}
              </div>
            )}
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block lg:w-5/12"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-blue-500/20 blur-3xl"></div>
              <div className="relative aspect-[1408/768] w-full">
                <Image
                  src="/batch9.png"
                  alt="Service illustration"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 704px"
                  className="rounded-3xl object-cover shadow-2xl shadow-blue-900/50"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}