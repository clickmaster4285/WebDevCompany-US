// components/sections/WhatIncludes.tsx
import { IndustryPageData } from '@/data/tech-serv-industry';

type Props = { items: IndustryPageData['whatIncludes'] };

export function WhatIncludes({ items }: Props) {
  return (
    <section>
      <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">What's Included</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <div key={idx} className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{item.element}</h3>
            <p className="text-gray-600 mb-3 text-sm">{item.whatItMeans}</p>
            <p className="text-xs text-blue-600 font-medium pt-3 border-t border-slate-100">{item.forIndustry}</p>
          </div>
        ))}
      </div>
    </section>
  );
}