"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import type { TechnologySummary } from "@/data/technologies";

type Props = {
  parent: TechnologySummary;
  subPages: TechnologySummary[];
};

export function TechnologySubPagesMobile({ parent, subPages }: Props) {
  const pathname = usePathname();

  return (
    <section className="lg:hidden px-6">
      <div className="layout-container rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-violet">
            Industry Solutions
          </p>
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="flex h-1.5 w-1.5 rounded-full bg-violet shadow-[0_0_8px_rgba(124,92,255,0.6)]" />
            {subPages.length} available
          </span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory scrollbar-hide">
          {subPages.map((subPage) => {
            const isActive = pathname === `/technologies/${subPage.slug}`;

            return (
              <Link
                key={subPage.id}
                href={`/technologies/${subPage.slug}`}
                className={`group flex-shrink-0 w-[200px] snap-start rounded-xl border p-4 transition-all duration-200 ${
                  isActive
                    ? "border-violet/30 bg-violet/5"
                    : "border-slate-200 bg-white hover:border-violet/20 hover:bg-violet/[0.03]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm shadow-sm">
                    {subPage.icon || parent.icon || "⚙️"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-semibold leading-tight line-clamp-2 ${
                        isActive ? "text-violet" : "text-slate-700"
                      }`}
                    >
                      {subPage.title}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400 line-clamp-1">
                      {subPage.excerpt}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-1 text-xs font-medium text-slate-400 transition-colors group-hover:text-violet">
                  <span>View details</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
