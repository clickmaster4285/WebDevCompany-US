import { technologies as importedTechnologies } from "../../data/technologies";
import type { TechnologySummary } from "../../data/technologies";

type TechnologiesSearchProps = {
  technologies?: TechnologySummary[];
};

export function TechnologiesSearch({ technologies }: TechnologiesSearchProps) {
  const techCount = technologies?.length ?? importedTechnologies.length;

  return (
    <section className="relative z-20 -mt-10 px-6">
      <div className="mx-auto max-w-5xl rounded-[1.75rem] border border-slate-200 bg-white/95 p-3 shadow-[0_24px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-2">
          <p className="text-sm font-semibold text-slate-500">
            <span className="text-violet">{techCount}</span> technologies
          </p>
          <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
            <input
              type="text"
              placeholder="Search technologies, frameworks, platforms..."
              className="h-13 w-full rounded-full border border-slate-200 bg-slate-50 px-5 text-sm font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet focus:bg-white"
            />
            <button className="h-13 rounded-full bg-violet px-7 text-sm font-black text-white shadow-lg shadow-violet/20 transition hover:-translate-y-0.5 hover:bg-violet/90">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}