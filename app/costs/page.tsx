// app/costs/page.tsx

import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { getAllCostSlugs, costData } from "@/data/costdata";
import Link from "next/link";
import { ArrowRight, DollarSign, Clock } from "lucide-react";
import type { Metadata } from "next";
import { getMetadata } from "@/lib/metadata";

export const metadata: Metadata = getMetadata({
  title: "Web Development Cost Guides — Pricing & Estimates",
  description:
    "Complete cost guides for web development, eCommerce, Shopify, SaaS, and more. Get transparent pricing estimates for your next project.",
  slug: "costs",
});

export default function CostsPage() {
  const slugs = getAllCostSlugs();
  const costs = slugs.map((slug) => costData[slug]);

  return (
    <main className="relative overflow-hidden">
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>

      {/* Ambient violet glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[30%] w-[60%] -translate-x-1/2 rounded-full bg-violet/8 blur-[120px]" />
      </div>

      <section className="layout-container px-4 py-24 sm:px-6 md:py-20 md:px-18">
        {/* Breadcrumb */}
        <div className="mb-6 md:pt-10 text-left">
          <Breadcrumb customLabels={{ costs: 'Cost Guides' }} />
        </div>

        {/* Header */}
        <div className="mx-auto mb-16 max-w-4xl text-center md:mb-20">
          <span className="text-eyebrow mb-4 block">Cost Guides</span>
          <h1 className="text-display text-4xl md:text-5xl lg:text-6xl text-balance">
            Web Development Cost Guides
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-lg leading-relaxed text-ink-mute md:text-xl">
            Transparent pricing guides to help you budget for your next web
            project.
          </p>
        </div>

        {/* Stats */}
        <div className="mx-auto mb-16 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3 md:mb-20">
          <StatCard value={`${costs.length}+`} label="Cost Guides" />
          <StatCard value="$0" label="Starting Price" />
          <StatCard value="100%" label="Transparent" />
        </div>

        {/* Cost Cards Grid */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {costs.map((cost, index) => (
            <CostCard key={cost.slug} cost={cost} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mx-auto mt-20 max-w-2xl text-center">
          <div className="glass relative overflow-hidden rounded-3xl p-8 md:p-12">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-violet to-transparent" />
            <h3 className="text-2xl font-semibold text-ink md:text-3xl">
              Need a Custom Quote?
            </h3>
            <p className="mx-auto mt-3 max-w-md text-balance text-ink-mute">
              Get a personalized cost estimate for your specific project
              requirements.
            </p>
            <Link
              href="/contact"
              className="group mt-8 inline-flex items-center gap-2 rounded-2xl bg-violet px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:violet-glow"
            >
              Get a Free Quote
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="glass flex flex-col items-center justify-center rounded-3xl p-6 transition-all duration-300 hover:bg-surface-2/50">
      <div className="text-3xl font-bold text-violet tabular-nums md:text-4xl">
        {value}
      </div>
      <div className="mt-1 text-sm text-ink-mute">{label}</div>
    </div>
  );
}

function CostCard({
  cost,
  index,
}: {
  cost: (typeof costData)[string];
  index: number;
}) {
  // Extract the starting price from a range like "$500 – $5,000"
  const startingPrice = cost.priceRange.split("–")[0].trim();

  return (
    <Link
      href={`/costs/${cost.slug}`}
      className="group animate-fade-in-up glass relative flex flex-col overflow-hidden rounded-3xl p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-surface-2/50 hover:violet-glow"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Top accent gradient on hover */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet to-violet-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex flex-1 flex-col">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold text-ink transition-colors duration-300 group-hover:text-violet md:text-xl">
            {cost.title}
          </h2>
          <div className="flex shrink-0 items-center gap-1 rounded-full bg-violet/10 px-3 py-1.5 text-sm font-semibold text-violet ring-1 ring-violet/20">
            <DollarSign className="h-3.5 w-3.5" />
            <span className="tabular-nums">{startingPrice}</span>
          </div>
        </div>

        <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-ink-mute">
          {cost.description}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-border/40 pt-4">
          <div className="flex items-center gap-1.5 text-sm text-ink-mute">
            <Clock className="h-4 w-4" />
            <span>{cost.timeline}</span>
          </div>
          <div className="flex items-center gap-1 text-sm font-medium text-violet transition-all duration-300 group-hover:gap-2">
            <span>View Guide</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}