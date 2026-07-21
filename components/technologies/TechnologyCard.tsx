import Link from "next/link";
import { TechIcon } from "@/lib/technology-icons";

type TechnologyCardProps = {
  technology: {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    icon: string;
    level: string;
  };
};

export function TechnologyCard({ technology }: TechnologyCardProps) {
  return (
    <Link href={`/technologies/${technology.slug}`} className="group block h-full">
      <article className="relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-[1.4rem] border border-slate-200 bg-white p-4 shadow-[0_14px_45px_rgba(15,23,42,0.045)] transition-all duration-300 hover:-translate-y-1.5 hover:border-violet/25 hover:shadow-[0_24px_70px_rgba(124,92,255,0.11)] sm:min-h-[315px] sm:p-5 sm:rounded-[1.6rem]">
        <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-violet/10 blur-3xl transition group-hover:bg-violet/20 sm:-right-16 sm:-top-16 sm:h-36 sm:w-36" />

        <div className="relative flex items-start justify-between gap-3 sm:gap-4">
          <div className="min-w-0">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-violet sm:text-[10px] sm:tracking-[0.24em]">
              {technology.category}
            </p>

            <p className="mt-1.5 font-mono text-[10px] font-bold text-slate-300 sm:mt-2 sm:text-[11px]">
              / {String(technology.id).padStart(2, "0")}
            </p>
          </div>

          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-base font-black text-slate-700 transition group-hover:border-violet group-hover:bg-violet group-hover:text-white sm:h-12 sm:w-12 sm:rounded-2xl sm:text-lg">
            <TechIcon slug={technology.slug} className="h-5 w-5 sm:h-6 sm:w-6" fallback={technology.icon} />
          </span>
        </div>

        <div className="relative mt-5 sm:mt-7">
          <h3 className="text-xl font-black leading-[1.08] tracking-[-0.04em] text-slate-950 transition-colors group-hover:text-violet sm:text-[24px] sm:tracking-[-0.045em]">
            {technology.title}
          </h3>

          <svg
            className="mt-3 h-2.5 w-24 text-slate-950/80 transition group-hover:text-violet sm:mt-4 sm:h-3 sm:w-28"
            viewBox="0 0 160 18"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 11C31 4 68 5 94 8C119 11 137 12 157 5"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>

          <p className="mt-3 line-clamp-3 text-[13px] leading-6 text-slate-600 sm:mt-4 sm:text-[14px]">
            {technology.excerpt}
          </p>
        </div>

        <div className="relative mt-auto pt-5 sm:pt-7">
          <div className="flex items-center justify-between border-t border-slate-100 pt-3 sm:pt-4">
            <p className="text-xs font-bold text-slate-950 sm:text-sm">
              {technology.level}
            </p>

            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-xs font-black text-slate-500 transition group-hover:border-violet group-hover:bg-violet group-hover:text-white sm:h-8 sm:w-8 sm:text-sm">
              ↗
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}