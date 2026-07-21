"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import type { TechnologySummary } from "@/data/technologies";
import { TechIcon } from "@/lib/technology-icons";

type Props = {
  parent: TechnologySummary;
  subPages: TechnologySummary[];
};

export function TechnologySubPagesMobile({ parent, subPages }: Props) {
  const pathname = usePathname();

  return (
    <section className="lg:hidden px-4 sm:px-6">
      <div className="layout-container rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-violet sm:tracking-[0.25em]">
            Industry Solutions
          </p>
          <span className="flex items-center gap-1.5 text-[10px] text-slate-400 sm:text-xs">
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
                className={`group shrink-0 w-[180px] snap-start rounded-xl border p-3.5 transition-all duration-200 sm:w-[200px] sm:p-4 ${
                  isActive
                    ? "border-violet/30 bg-violet/5"
                    : "border-slate-200 bg-white hover:border-violet/20 hover:bg-violet/[0.03]"
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm sm:h-8 sm:w-8">
                    <TechIcon slug={subPage.slug} className="h-4 w-4 sm:h-5 sm:w-5" fallback={subPage.icon || parent.icon || "⚙️"} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs font-semibold leading-tight line-clamp-2 sm:text-sm ${
                        isActive ? "text-violet" : "text-slate-700"
                      }`}
                    >
                      {subPage.title}
                    </p>
                    <p className="mt-0.5 text-[10px] text-slate-400 line-clamp-1 sm:text-xs">
                      {subPage.excerpt}
                    </p>
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-1 text-[10px] font-medium text-slate-400 transition-colors group-hover:text-violet sm:mt-3 sm:text-xs">
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
