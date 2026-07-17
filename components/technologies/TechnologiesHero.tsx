"use client";

import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";

export function TechnologiesHero() {
  return (
    <section className="bg-background px-6 pb-20 pt-28 text-center text-white md:pb-24 md:pt-36">
      <div className="layout-container px-4 sm:px-6 md:px-18">
        <div className="mb-6 text-left md:mb-8">
          <Breadcrumb customLabels={{ technologies: 'Technologies' }} />
        </div>

        <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold tracking-wider md:px-4 md:py-2 md:text-xs">
          TECHNOLOGIES
        </span>

        <h1 className="mt-5 text-3xl font-bold leading-[1.06] md:mt-6 md:text-5xl lg:text-6xl">
          Technologies We Use
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70 md:mt-6 md:text-base md:leading-8 lg:text-lg">
          Explore the modern tools, frameworks and platforms we use to build
          fast, scalable and high-performing digital products.
        </p>
      </div>
    </section>
  );
}