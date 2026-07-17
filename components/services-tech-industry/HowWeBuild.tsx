// components/sections/HowWeBuild.tsx
type Props = { text: string };

export function HowWeBuild({ text }: Props) {
  return (
    <section className="relative bg-slate-100 rounded-2xl p-5 sm:p-6 md:p-8 lg:p-12 overflow-hidden border border-slate-200">
      {/* Blueprint Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30" />
      
      <div className="relative z-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-slate-900 flex items-center gap-3">
          <span className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shrink-0">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          </span>
          How We Build
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-line max-w-4xl">
          {text}
        </p>
      </div>
    </section>
  );
}