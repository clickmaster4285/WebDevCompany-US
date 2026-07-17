type TechnologyRiskReversalProps = {
  content?: string;
};

export function TechnologyRiskReversal({
  content,
}: TechnologyRiskReversalProps) {
  if (!content) return null;

  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-5xl rounded-[1.5rem] bg-slate-950 p-5 text-white shadow-2xl md:rounded-[2rem] md:p-8">
        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-violet md:text-sm md:tracking-[0.25em]">
          Risk Reversal
        </p>

        <p className="mt-3 text-base leading-7 text-white/75 md:mt-4 md:text-lg md:leading-8">
          {content}
        </p>
      </div>
    </section>
  );
}