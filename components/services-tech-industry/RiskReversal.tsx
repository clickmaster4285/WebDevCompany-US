// components/sections/RiskReversal.tsx
type Props = { text: string };

export function RiskReversal({ text }: Props) {
  return (
    <section className="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 shadow-lg shadow-emerald-500/20">
      <div className="flex-shrink-0 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/30">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
      <div className="text-center md:text-left">
        <h3 className="text-2xl font-bold text-white mb-2">Our Guarantee & Risk Reversal</h3>
        <p className="text-emerald-50 leading-relaxed text-lg">{text}</p>
      </div>
    </section>
  );
}