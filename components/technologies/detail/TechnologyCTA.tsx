import Link from "next/link";

type TechnologyCTAProps = {
  primaryCTA?: string;
  secondaryCTA?: string;
};

export function TechnologyCTA({
  primaryCTA,
  secondaryCTA,
}: TechnologyCTAProps) {
  if (!primaryCTA && !secondaryCTA) return null;

  return (
    <div className="mt-6 flex flex-wrap gap-3 md:mt-8">
      {primaryCTA && (
        <Link
          href="/contact"
          className="rounded-full bg-violet px-5 py-2.5 text-xs font-black text-white shadow-lg shadow-violet/20 transition hover:bg-violet/90 md:px-6 md:py-3 md:text-sm"
        >
          {primaryCTA}
        </Link>
      )}

      {secondaryCTA && (
        <Link
          href="/contact"
          className="rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-xs font-black text-slate-700 transition hover:border-violet hover:text-violet md:px-6 md:py-3 md:text-sm"
        >
          {secondaryCTA}
        </Link>
      )}
    </div>
  );
}