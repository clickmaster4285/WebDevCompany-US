// components/sections/OutcomeCaseStudy.tsx
import { IndustryPageData } from '@/data/tech-serv-industry';

type Props = { data: IndustryPageData['outcome'] };

export function OutcomeCaseStudy({ data }: Props) {
  return (
    <section>
      <p className="text-xs text-gray-500 italic text-center mb-10 max-w-2xl mx-auto">{data.disclosure}</p>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-red-50 border border-red-200 p-6 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-100 rounded-full -mr-16 -mt-16 opacity-50" />
          <h3 className="text-xl font-bold text-red-800 mb-3 flex items-center gap-2 relative z-10">
            <span>⚠️</span> The Challenge
          </h3>
          <p className="text-red-900/80 leading-relaxed relative z-10">{data.challenge}</p>
        </div>
        <div className="bg-green-50 border border-green-200 p-6 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full -mr-16 -mt-16 opacity-50" />
          <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2 relative z-10">
            <span>✅</span> The Solution
          </h3>
          <p className="text-green-900/80 leading-relaxed relative z-10">{data.solution}</p>
        </div>
      </div>

      {/* Dashboard Style KPI Grid */}
      <div className="bg-slate-900 p-8 rounded-2xl">
        <h3 className="text-white text-center text-lg font-semibold mb-6 opacity-80">Key Performance Indicators</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {data.kpis.map((kpi, idx) => (
            <div key={idx} className="bg-slate-800 border border-slate-700 p-5 rounded-xl text-center">
              <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">{kpi.kpi}</p>
              <p className="text-2xl font-bold text-white mb-2">{kpi.result}</p>
              <p className="text-xs text-slate-400 leading-snug">{kpi.whyMatters}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}