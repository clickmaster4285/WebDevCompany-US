// components/sections/WhySector.tsx
type Props = { items: string[] };

export function WhySector({ items }: Props) {
  return (
    <section className="bg-white py-12">
      <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">The Sector Reality</h2>
      <div className="space-y-8 max-w-4xl mx-auto">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-6 p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-red-200 transition">
            <span className="flex-shrink-0 w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
              {idx + 1}
            </span>
            <p className="text-gray-700 text-lg leading-relaxed pt-2">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}