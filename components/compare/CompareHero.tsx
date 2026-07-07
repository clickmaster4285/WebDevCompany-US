"use client";

import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";

export function CompareHero() {
  return (
    <section className="bg-background px-6 pb-24 pt-36 text-center text-white">
      <div className="layout-container px-18">
        <div className="mb-8 text-left">
          <Breadcrumb customLabels={{ compare: 'Comparisons' }} />
        </div>

        <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold tracking-wider">
          COMPARE
        </span>

        <h1 className="mt-6 text-5xl font-bold md:text-6xl">
          Compare Technologies
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
          Clear, practical comparisons to help you choose the right technology,
          framework or platform for your next digital product.
        </p>
      </div>
    </section>
  );
}