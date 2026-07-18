import { TechnologyTable } from "./TechnologyTable";
import { TechnologyOutcome } from "./TechnologyOutcome";
import { TechnologyFAQ } from "./TechnologyFAQ";
import { TechnologyCTA } from "./TechnologyCTA";
import { createSectionId } from "./createSectionId";

type TechnologySectionRendererProps = {
  section: any;
  index: number;
};

export function TechnologySectionRenderer({
  section,
  index,
}: TechnologySectionRendererProps) {
  return (
<section
  id={createSectionId(section.heading)}
  className="scroll-mt-28 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.045)] md:rounded-[2rem] md:p-6 lg:p-8"
>      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-[11px] font-black text-slate-300 md:text-xs">
            / {String(index + 1).padStart(2, "0")}
          </p>

          <h2 className="mt-2 text-2xl font-black leading-tight tracking-[-0.03em] text-slate-950 md:mt-3 md:text-3xl md:tracking-[-0.04em] lg:text-4xl">
            {section.heading}
          </h2>

          {section.subheading && (
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-500 md:mt-3 md:text-base">
              {section.subheading}
            </p>
          )}
        </div>
      </div>

      {section.content && (
        <div className="mt-5 space-y-4 md:mt-7 md:space-y-5">
          {section.content.split("\n\n").map((paragraph: string) => (
            <p
              key={paragraph}
              className="text-sm leading-7 text-slate-600 md:text-[15px] md:leading-8"
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}

      <TechnologyTable table={section.table} />

      {section.steps && (
        <div className="mt-6 grid gap-3 md:mt-8 md:gap-4 md:grid-cols-2">
          {section.steps.map((step: string, stepIndex: number) => (
            <div
              key={step}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 md:p-5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-violet text-xs font-black text-white md:h-10 md:w-10 md:text-sm">
                {stepIndex + 1}
              </span>

              <p className="mt-3 text-xs font-bold leading-6 text-slate-700 md:mt-4 md:text-sm">
                {step}
              </p>
            </div>
          ))}
        </div>
      )}

      <TechnologyOutcome
        challenge={section.challenge}
        solution={section.solution}
        results={section.results}
      />

      <TechnologyFAQ faqs={section.faqs} />

      <TechnologyCTA
        primaryCTA={section.primaryCTA}
        secondaryCTA={section.secondaryCTA}
      />
    </section>
  );
}