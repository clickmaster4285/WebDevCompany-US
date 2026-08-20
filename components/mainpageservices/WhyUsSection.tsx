import { whyUs } from "@/data/services-data";
import { PlateHeader, CornerBrackets } from "./Primitives";

export function WhyUsSection() {
  return (
    <section className="mb-32 max-w-5xl">
      <PlateHeader plate="02" label="Why us" title="Why Businesses Choose Clickmasters for Web Development" />
      <div className="grid gap-20 px-10 md:grid-cols-3">
        {whyUs.map((item) => (
          <div key={item.label} className="group relative border border-white/10 bg-white/[0.02] p-6">
            <CornerBrackets />
            <item.icon className="mb-4 h-6 w-6 text-primary/70" />
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">{item.label}</div>
            <p className="leading-relaxed text-white/60">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}