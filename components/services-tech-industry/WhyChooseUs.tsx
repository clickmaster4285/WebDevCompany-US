// components/sections/WhyChooseUs.tsx
import { IndustryPageData } from '@/data/tech-serv-industry';

type Props = { items: IndustryPageData['whyChooseUs'] };

export function WhyChooseUs({ items }: Props) {
  return (
    <section>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-12 text-slate-900 px-4">Why Choose Us Over Alternatives</h2>
      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm -mx-4 sm:mx-0">
        <div className="min-w-[640px] md:min-w-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="p-3 sm:p-4 text-xs sm:text-sm font-semibold whitespace-nowrap">Option</th>
                <th className="p-3 sm:p-4 text-xs sm:text-sm font-semibold whitespace-nowrap">Where it Works</th>
                <th className="p-3 sm:p-4 text-xs sm:text-sm font-semibold text-red-300 whitespace-nowrap">Where it Falls Short</th>
                <th className="p-3 sm:p-4 text-xs sm:text-sm font-semibold text-emerald-300 whitespace-nowrap">Our Position</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row, idx) => (
                <tr key={idx} className={`border-b border-slate-100 hover:bg-slate-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                  <td className="p-3 sm:p-4 text-xs sm:text-sm font-bold text-slate-900">{row.option}</td>
                  <td className="p-3 sm:p-4 text-xs sm:text-sm text-gray-600">{row.whereWorks}</td>
                  <td className="p-3 sm:p-4 text-xs sm:text-sm text-red-600">{row.whereFallsShort}</td>
                  <td className="p-3 sm:p-4 text-xs sm:text-sm">
                    <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-emerald-100 text-emerald-800 text-[10px] sm:text-sm font-bold rounded-full">
                      {row.ourPosition}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}