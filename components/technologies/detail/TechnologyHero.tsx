"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, ArrowLeft } from "lucide-react";
import type { TechnologySummary } from "@/data/technologies";

type Props = {
  technology: TechnologySummary;
  parentTechnology?: TechnologySummary;
};

export function TechnologyHero({ technology, parentTechnology }: Props) {
  const title = technology.title || "Technology";
  const headline =
    technology.page?.completePageCopy?.aboveTheFold?.headline || title;
  const subheadline =
    technology.page?.completePageCopy?.aboveTheFold?.subheadline || "";
  const imageSrc = "/assets/technologies-hero.webp";

  // Shared breadcrumb link styles — transparent base, white on hover
  const linkClass =
    "text-white/50 transition-colors duration-200 hover:text-white";

  return (
    <section className="relative overflow-hidden bg-background px-6 pb-16 pt-28 text-white md:pb-20 md:pt-36">
      <div className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-violet/30 blur-3xl max-lg:-right-40 max-lg:h-60 max-lg:w-60" />
      <div className="pointer-events-none absolute -left-24 bottom-10 h-80 w-80 rounded-full bg-white/10 blur-3xl max-lg:-left-40 max-lg:h-60 max-lg:w-60" />

      <div className="relative layout-container px-6 grid items-center gap-10 lg:grid-cols-[1fr_480px] lg:px-18 lg:gap-12">
        <div className="min-w-0">
          {/* Breadcrumb nav — inside the hero, on the dark background */}
          <nav
            className="mb-4 flex items-center gap-1.5 text-xs flex-wrap md:mb-6 md:text-sm"
            aria-label="Breadcrumb"
          >
            <Link href="/" className={linkClass}>
              Home
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0 text-white/25 md:h-3.5 md:w-3.5" />
            <Link href="/technologies" className={linkClass}>
              Technologies
            </Link>

            {parentTechnology && (
              <>
                <ChevronRight className="h-3 w-3 shrink-0 text-white/25 md:h-3.5 md:w-3.5" />
                <Link
                  href={`/technologies/${parentTechnology.slug}`}
                  className={`${linkClass} truncate max-w-[120px] md:max-w-[160px]`}
                >
                  {parentTechnology.title}
                </Link>
              </>
            )}

            <ChevronRight className="h-3 w-3 shrink-0 text-white/25 md:h-3.5 md:w-3.5" />
            <span className="font-medium text-white/80 truncate max-w-[140px] md:max-w-[200px]">
              {technology.title}
            </span>
          </nav>

          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-violet md:text-sm md:tracking-[0.28em]">
            {technology.category}
          </p>

          <h1 className="mt-5 max-w-3xl text-[2.25rem] font-black leading-[0.98] tracking-[-0.05em] text-white md:mt-7 md:text-5xl md:tracking-[-0.06em] lg:text-7xl">
            {headline}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/68 md:mt-7 md:text-lg md:leading-8 lg:text-xl lg:leading-9">
            {subheadline}
          </p>

          <div className="mt-7 flex flex-wrap gap-3 md:mt-9 md:gap-4">
            <Link
              href="#technologies"
              className="rounded-full bg-white px-5 py-2.5 text-xs font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-violet hover:text-white md:px-6 md:py-3 md:text-sm"
            >
              Explore Technologies →
            </Link>

            <Link
              href="/#contact"
              className="rounded-full border border-white/15 px-5 py-2.5 text-xs font-bold text-white/80 transition hover:border-white/30 hover:text-white md:px-6 md:py-3 md:text-sm"
            >
              Talk to an Expert
            </Link>
          </div>

          <div className="mt-8 grid max-w-xl grid-cols-3 gap-2 md:mt-10 md:gap-3">
            {[
              ["Modern", "Stack"],
              ["Scalable", "Systems"],
              ["Secure", "Delivery"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/[0.055] p-3 backdrop-blur md:p-4"
              >
                <p className="text-base font-black text-white md:text-xl">
                  {value}
                </p>
                <p className="mt-0.5 text-[10px] font-semibold text-white/45 md:mt-1 md:text-xs">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          className="relative flex justify-center"
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
        >
          <motion.div
            className="absolute -inset-4 rounded-[2rem] bg-violet/20 blur-3xl md:-inset-6 md:rounded-[2.5rem]"
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.55, 0.85, 0.55],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            animate={{
              y: [0, -14, 0],
              rotate: [0, 1.2, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.03,
              rotate: 0,
            }}
            className="relative z-10 w-full max-w-[360px] md:max-w-[480px] lg:max-w-[520px]"
          >
            <Image
              src={imageSrc}
              alt="Technologies Hero"
              width={520}
              height={620}
              priority
              className="h-auto w-full rounded-[1.5rem] object-contain drop-shadow-[0_35px_90px_rgba(0,0,0,0.35)] md:rounded-[2rem]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
