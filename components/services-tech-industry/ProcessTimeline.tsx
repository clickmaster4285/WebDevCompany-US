// components/sections/ProcessTimeline.tsx
type Props = { steps: string[] };

const stepIcons = [
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />, // Discovery
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 11-7.072 0l-.548-.547z" />, // Strategy
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />, // Arch
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />, // Design
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />, // Dev
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />, // QA
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />, // Launch
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /> // Optimize
];

export function ProcessTimeline({ steps }: Props) {
  return (
    <section>
      <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Our Process</h2>
      <div className="max-w-3xl mx-auto space-y-0">
        {steps.map((step, idx) => {
          const parts = step.split('—');
          const title = parts[0]?.trim().replace(/^\d+\.\s*/, '');
          const desc = parts.slice(1).join('—').trim();

          return (
            <div key={idx} className="flex gap-6 pb-10 relative">
              {idx !== steps.length - 1 && (
                <div className="absolute left-[23px] top-12 bottom-0 w-0.5 border-l-2 border-dashed border-slate-300" />
              )}
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white z-10 shadow-md ring-4 ring-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {stepIcons[idx % stepIcons.length]}
                </svg>
              </div>
              <div className="pt-1.5">
                <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                {desc && <p className="text-gray-600 mt-2 leading-relaxed">{desc}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}