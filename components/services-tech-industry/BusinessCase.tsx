// components/sections/BusinessCase.tsx
type Props = { text: string };

export function BusinessCase({ text }: Props) {
  return (
    <section className="relative bg-slate-900 text-white rounded-2xl p-8 md:p-12 shadow-xl overflow-hidden border-l-8 border-amber-500">
      {/* Subtle gradient overlay */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-6 text-amber-400 flex items-center gap-3">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          The Business Case & ROI
        </h2>
        <p className="text-lg text-slate-300 leading-relaxed max-w-4xl">
          {text}
        </p>
      </div>
    </section>
  );
}