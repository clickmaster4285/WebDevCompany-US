"use client";

import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Technology } from "@/data/technologies";

type Props = {
  technology: Technology;
};

export function TechnologyHero({ technology }: Props) {
  const title = technology.title || "Technology";
  const headline =
    technology.page?.completePageCopy?.aboveTheFold?.headline || title;
  const subheadline =
    technology.page?.completePageCopy?.aboveTheFold?.subheadline || "";
  const imageSrc = "/assets/technologies-hero.webp";

  return (
    <section className="relative overflow-hidden bg-background px-6 pb-20 pt-36 text-white">
      <div className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-violet/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-10 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

      <div className="relative layout-container px-18 grid items-center gap-12 lg:grid-cols-[1fr_480px]">
        <div>
          <div className="mb-6">
            <Breadcrumb
              customLabels={{
                technologies: 'Technologies',
                [technology.slug]: technology.title,
              }}
            />
          </div>

          <p className="text-sm font-bold uppercase tracking-[0.28em] text-violet">
            {technology.category}
          </p>

          <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.06em] text-white md:text-7xl">
            {headline}
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68 md:text-xl md:leading-9">
            {subheadline}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="#technologies"
              className="rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-violet hover:text-white"
            >
              Explore Technologies →
            </Link>

            <Link
              href="/#contact"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-bold text-white/80 transition hover:border-white/30 hover:text-white"
            >
              Talk to an Expert
            </Link>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {[
              ["Modern", "Stack"],
              ["Scalable", "Systems"],
              ["Secure", "Delivery"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 backdrop-blur"
              >
                <p className="text-xl font-black text-white">{value}</p>
                <p className="mt-1 text-xs font-semibold text-white/45">
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
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="absolute -inset-6 rounded-[2.5rem] bg-violet/20 blur-3xl"
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
            className="relative z-10"
          >
            <Image
              src={imageSrc}
              alt="Technologies Hero"
              width={520}
              height={620}
              priority
              className="h-auto w-full max-w-[520px] rounded-[2rem] object-contain drop-shadow-[0_35px_90px_rgba(0,0,0,0.35)]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
