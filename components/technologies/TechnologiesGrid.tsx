"use client";

import { useState } from "react";
import { technologies } from "../../data/technologies";
import { TechnologyCard } from "./TechnologyCard";

const TECHNOLOGIES_PER_PAGE = 12;

export function TechnologiesGrid() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(technologies.length / TECHNOLOGIES_PER_PAGE);
  const startIndex = (currentPage - 1) * TECHNOLOGIES_PER_PAGE;
  const visibleTechnologies = technologies.slice(
    startIndex,
    startIndex + TECHNOLOGIES_PER_PAGE
  );

  return (
    <section
      id="technologies"
      className="relative overflow-hidden px-6 py-20 md:py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,92,255,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.06),transparent_35%)]" />

      <div className="relative layout-container">
        <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-[0_24px_90px_rgba(15,23,42,0.06)] backdrop-blur-xl md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-violet">
                Technology Library
              </p>

              <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.05em] text-slate-950 md:text-5xl">
                Explore our technology stack
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-7 text-black">
                A curated collection of technologies we use across websites,
                SaaS products, eCommerce platforms, automation systems, and
                modern digital experiences.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                Showing
              </p>

              <p className="mt-1 text-sm font-bold text-slate-700">
                <span className="text-violet">{visibleTechnologies.length}</span>{" "}
                of <span className="text-slate-950">{technologies.length}</span>{" "}
                technologies
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visibleTechnologies.map((technology) => (
              <TechnologyCard key={technology.id} technology={technology} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
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
                    className={`h-11 min-w-11 rounded-full px-4 text-sm font-black transition ${
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