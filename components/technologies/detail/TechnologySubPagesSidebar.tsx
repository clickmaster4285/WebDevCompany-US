"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { TechnologySummary } from "@/data/technologies";
import { TechIcon } from "@/lib/technology-icons";

type Props = {
  parent: TechnologySummary;
  subPages: TechnologySummary[];
};

export function TechnologySubPagesSidebar({ parent, subPages }: Props) {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-[1.35rem] border border-slate-200 bg-white/90 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.07)] backdrop-blur-xl xl:p-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-violet xl:tracking-[0.25em]">
            Industry Solutions
          </p>
          <span className="h-1.5 w-1.5 rounded-full bg-violet shadow-[0_0_16px_rgba(124,92,255,0.8)] shrink-0" />
        </div>

        <div className="mt-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center text-lg">
              <TechIcon slug={parent.slug} className="h-5 w-5" fallback={parent.icon || "⚙️"} />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 leading-tight truncate">
                {parent.title}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {subPages.length} industry applications
              </p>
            </div>
          </div>
        </div>

        {/* Sub-page list */}
        <div className="mt-3 space-y-0.5">
          {subPages.map((subPage) => {
            const isActive = pathname === `/technologies/${subPage.slug}`;

            return (
              <Link
                key={subPage.id}
                href={`/technologies/${subPage.slug}`}
                className={`group relative flex items-center gap-2.5 rounded-xl px-2.5 py-2.5 transition-all duration-200 xl:gap-3 xl:px-3 ${
                  isActive
                    ? "bg-violet/10 text-violet"
                    : "hover:bg-violet/5 hover:text-violet"
                }`}
              >
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute -left-[9px] top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-violet shadow-[0_0_14px_rgba(124,92,255,0.75)]" />
                )}

                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm transition-colors group-hover:border-violet/30 group-hover:bg-violet/5 xl:h-8 xl:w-8">
                  <TechIcon slug={subPage.slug} className="h-4 w-4 xl:h-5 xl:w-5" fallback={subPage.icon || parent.icon || "⚙️"} />
                </span>

                <div className="flex-1 min-w-0">
                  <p
                    className={`text-xs font-semibold leading-tight transition-colors line-clamp-2 xl:text-sm ${
                      isActive ? "text-violet" : "text-slate-700"
                    } group-hover:text-violet`}
                  >
                    {subPage.title}
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-400 line-clamp-1 xl:text-xs">
                    {subPage.excerpt}
                  </p>
                </div>

                <span
                  className={`shrink-0 text-xs transition-colors xl:text-sm ${
                    isActive ? "text-violet" : "text-slate-300"
                  } group-hover:text-violet`}
                >
                  →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
