// components/cost/CostCredibilityBar.tsx

"use client";

import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CostCredibilityBarProps {
  items: string[];
  className?: string;
  speed?: number;
  pauseOnHover?: boolean;
}

export function CostCredibilityBar({
  items,
  className,
  speed = 30,
  pauseOnHover = true,
}: CostCredibilityBarProps) {
  if (!items || items.length === 0) return null;

  const duplicatedItems = [...items, ...items];

  return (
    <section
      className={cn(
        "cost-credibility group relative overflow-hidden border-y border-border bg-background py-4 sm:py-5",
        className
      )}
      aria-label="Trust indicators"
    >
      <style>{`
        @keyframes cost-credibility-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .cost-credibility-track {
          animation: cost-credibility-scroll ${Math.max(20, speed)}s linear infinite;
        }
        .cost-credibility:hover .cost-credibility-track {
          animation-play-state: ${pauseOnHover ? "paused" : "running"};
        }
        @media (prefers-reduced-motion: reduce) {
          .cost-credibility-track {
            animation: none;
          }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background via-background/90 to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background via-background/90 to-transparent sm:w-20" />

      <div className="cost-credibility-track flex w-fit items-center gap-8 sm:gap-12 md:gap-16">
        {duplicatedItems.map((item, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-3 whitespace-nowrap"
          >
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-violet/10 ring-1 ring-violet/20">
              <CheckCircle2 className="h-3.5 w-3.5 text-violet" />
            </span>
            <span className="text-sm font-medium text-ink-soft sm:text-base">
              {item}
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}