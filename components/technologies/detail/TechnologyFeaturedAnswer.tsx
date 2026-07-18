type TechnologyFeaturedAnswerProps = {
  content?: string;
};

export function TechnologyFeaturedAnswer({
  content,
}: TechnologyFeaturedAnswerProps) {
  if (!content) return null;

  return (
    <section className="px-6 py-10 md:py-12">
      <div className="mx-auto max-w-5xl rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.06)] md:rounded-[2rem] md:p-8">
        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-violet md:text-sm md:tracking-[0.25em]">
          Featured Answer
        </p>

        <p className="mt-3 text-base leading-7 text-slate-700 md:mt-4 md:text-lg md:leading-8">
          {content}
        </p>
      </div>
    </section>
  );
}