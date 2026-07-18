// components/sections/WhatIncludes.tsx
import { IndustryPageData } from '@/data/tech-serv-industry';

type Props = { items: IndustryPageData['whatIncludes'] };

export function WhatIncludes({ items }: Props) {
  return (
    <section>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-12 text-slate-900 px-4">What's Included</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {items.map((item, idx) => (
          <div key={idx} className="group p-4 sm:p-5 md:p-6 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-blue-600 group-hover:text-white transition shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 mb-2">{item.element}</h3>
            <p className="text-gray-600 mb-3 text-xs sm:text-sm">{item.whatItMeans}</p>
            <p className="text-[10px] sm:text-xs text-blue-600 font-medium pt-3 border-t border-slate-100">{item.forIndustry}</p>
          </div>
        ))}
      </div>
    </section>
  );
}