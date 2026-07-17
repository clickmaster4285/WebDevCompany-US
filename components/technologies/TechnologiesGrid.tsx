"use client";

import { useState } from "react";
import { technologies as importedTechnologies } from "../../data/technologies";
import type { TechnologySummary } from "../../data/technologies";
import { TechnologyCard } from "./TechnologyCard";

type TechnologiesGridProps = {
  technologies?: TechnologySummary[];
};

const TECHNOLOGIES_PER_PAGE = 12;

export function TechnologiesGrid({ technologies }: TechnologiesGridProps) {
  const techs = technologies ?? importedTechnologies;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(techs.length / TECHNOLOGIES_PER_PAGE);
  const startIndex = (currentPage - 1) * TECHNOLOGIES_PER_PAGE;
  const visibleTechnologies = techs.slice(
    startIndex,
    startIndex + TECHNOLOGIES_PER_PAGE
  );

  return (
    <section
      id="technologies"
      className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,92,255,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.06),transparent_35%)]" />

      <div className="relative layout-container px-4 sm:px-6 md:px-18">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-4 shadow-[0_24px_90px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:p-6 md:rounded-[2rem] md:p-8">
          <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-violet md:text-sm md:tracking-[0.25em]">
                Technology Library
              </p>

              <h2 className="mt-3 max-w-3xl text-[1.75rem] font-black tracking-[-0.04em] text-slate-950 md:mt-4 md:text-4xl md:tracking-[-0.05em] lg:text-5xl">
                Explore our technology stack
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-black md:mt-4 md:text-base">
                A curated collection of technologies we use across websites,
                SaaS products, eCommerce platforms, automation systems, and
                modern digital experiences.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 md:px-5 md:py-4">
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 md:text-xs md:tracking-[0.18em]">
                Showing
              </p>

              <p className="mt-0.5 text-xs font-bold text-slate-700 md:mt-1 md:text-sm">
                <span className="text-violet">{visibleTechnologies.length}</span>{" "}
                of <span className="text-slate-950">{techs.length}</span>{" "}
                technologies
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visibleTechnologies.map((technology) => (
              <TechnologyCard key={technology.id} technology={technology} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:mt-12">
              {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;
                const isActive = currentPage === page;

                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => {
                      setCurrentPage(page);
                      document
                        .getElementById("technologies")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`h-9 min-w-9 rounded-full px-3 text-xs font-black transition sm:h-11 sm:min-w-11 sm:px-4 sm:text-sm ${
                      isActive
                        ? "bg-violet text-white shadow-lg shadow-violet/20"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-violet hover:text-violet"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}