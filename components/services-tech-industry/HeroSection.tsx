// components/sections/HeroSection.tsx
import Link from 'next/link';
import { IndustryPageData } from '@/data/tech-serv-industry';
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";

type HeroProps = IndustryPageData['hero'];

export function HeroSection({ heading, description, primaryCTA, secondaryCTA, socialProof }: HeroProps) {
  return (
    <section className="relative bg-slate-950 text-white py-24 px-4 overflow-hidden">
      {/* Background Pattern: Dot Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 rounded-full blur-3xl -z-0" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Breadcrumb — left aligned above content */}
        <div className="mb-8 md:pt-10 text-left">
          <Breadcrumb />
        </div>

        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            {heading}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">{description}</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition shadow-lg shadow-blue-600/20"
            >
              {primaryCTA}
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-semibold transition backdrop-blur-sm"
            >
              {secondaryCTA}
            </Link>
          </div>
          
          {/* <p className="text-sm text-slate-500 pt-10">{socialProof}</p> */}
        </div>
      </div>
    </section>
  );
}