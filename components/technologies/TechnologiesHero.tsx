"use client";

import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";

export function TechnologiesHero() {
  return (
    <section className="bg-background px-6 pb-24 pt-36 text-center text-white">
      <div className="layout-container">
        <div className="mb-8 text-left">
          <Breadcrumb customLabels={{ technologies: 'Technologies' }} />
        </div>

        <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold tracking-wider">
          TECHNOLOGIES
        </span>

        <h1 className="mt-6 text-5xl font-bold md:text-6xl">
          Technologies We Use
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
          Explore the modern tools, frameworks and platforms we use to build
          fast, scalable and high-performing digital products.
        </p>
      </div>
    </section>
  );
}