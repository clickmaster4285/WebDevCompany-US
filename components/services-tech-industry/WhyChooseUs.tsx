// components/sections/WhyChooseUs.tsx
import { IndustryPageData } from '@/data/tech-serv-industry';

type Props = { items: IndustryPageData['whyChooseUs'] };

export function WhyChooseUs({ items }: Props) {
  return (
    <section>
      <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Why Choose Us Over Alternatives</h2>
      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white">
              <th className="p-4 font-semibold">Option</th>
              <th className="p-4 font-semibold">Where it Works</th>
              <th className="p-4 font-semibold text-red-300">Where it Falls Short</th>
              <th className="p-4 font-semibold text-emerald-300">Our Position</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row, idx) => (
              <tr key={idx} className={`border-b border-slate-100 hover:bg-slate-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                <td className="p-4 font-bold text-slate-900">{row.option}</td>
                <td className="p-4 text-gray-600">{row.whereWorks}</td>
                <td className="p-4 text-red-600">{row.whereFallsShort}</td>
                <td className="p-4">
                  <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-bold rounded-full">
                    {row.ourPosition}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}