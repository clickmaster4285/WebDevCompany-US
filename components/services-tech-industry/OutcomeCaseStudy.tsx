// components/sections/OutcomeCaseStudy.tsx
import { IndustryPageData } from '@/data/tech-serv-industry';

type Props = { data: IndustryPageData['outcome'] };

export function OutcomeCaseStudy({ data }: Props) {
  return (
    <section>
      <p className="text-[10px] sm:text-xs text-gray-500 italic text-center mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-4">{data.disclosure}</p>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12">
        <div className="bg-red-50 border border-red-200 p-4 sm:p-5 md:p-6 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-red-100 rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16 opacity-50" />
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-red-800 mb-2 sm:mb-3 flex items-center gap-2 relative z-10">
            <span>⚠️</span> The Challenge
          </h3>
          <p className="text-red-900/80 text-sm sm:text-base leading-relaxed relative z-10">{data.challenge}</p>
        </div>
        <div className="bg-green-50 border border-green-200 p-4 sm:p-5 md:p-6 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-green-100 rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16 opacity-50" />
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-green-800 mb-2 sm:mb-3 flex items-center gap-2 relative z-10">
            <span>✅</span> The Solution
          </h3>
          <p className="text-green-900/80 text-sm sm:text-base leading-relaxed relative z-10">{data.solution}</p>
        </div>
      </div>

      {/* Dashboard Style KPI Grid */}
      <div className="bg-slate-900 p-4 sm:p-5 md:p-6 lg:p-8 rounded-2xl">
        <h3 className="text-white text-center text-sm sm:text-base md:text-lg font-semibold mb-4 sm:mb-6 opacity-80">Key Performance Indicators</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {data.kpis.map((kpi, idx) => (
            <div key={idx} className="bg-slate-800 border border-slate-700 p-3 sm:p-4 md:p-5 rounded-xl text-center">
              <p className="text-[10px] sm:text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1 sm:mb-2">{kpi.kpi}</p>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">{kpi.result}</p>
              <p className="text-[10px] sm:text-xs text-slate-400 leading-snug">{kpi.whyMatters}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}