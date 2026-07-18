// components/sections/WhySector.tsx
type Props = { items: string[] };

export function WhySector({ items }: Props) {
  return (
    <section className="bg-white py-8 sm:py-12">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-12 text-slate-900 px-4">The Sector Reality</h2>
      <div className="space-y-4 sm:space-y-6 md:space-y-8 max-w-4xl mx-auto px-4 sm:px-6">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-3 sm:gap-4 md:gap-6 p-4 sm:p-5 md:p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-red-200 transition">
            <span className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-sm sm:text-base md:text-lg shadow-sm">
              {idx + 1}
            </span>
            <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed pt-1 sm:pt-1.5 md:pt-2 min-w-0">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}