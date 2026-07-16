// components/sections/CredibilityBar.tsx
type Props = {
  text: string;
};

export function CredibilityBar({ text }: Props) {
  // Split the string by " · " to get individual credibility points
  const items = text.split(' · ');
  
  // Duplicate the array to create a seamless infinite loop
  const loopItems = [...items, ...items];

  return (
    <section className="relative w-full bg-slate-900 border-y border-slate-800 py-5 overflow-hidden">
      {/* Fade edges to hide the start/end of the marquee */}
      <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

      <div 
        className="flex whitespace-nowrap will-change-transform hover:[animation-play-state:paused]"
        style={{
          animation: 'marquee 25s linear infinite',
        }}
      >
        {loopItems.map((item, idx) => (
          <span key={idx} className="mx-6 text-sm md:text-base font-medium text-slate-300 uppercase tracking-wider flex items-center gap-6 flex-shrink-0">
            {item}
            <span className="text-blue-500 text-xs">✦</span>
          </span>
        ))}
      </div>
      
      {/* Inline keyframes so you don't need to edit tailwind.config.js or globals.css */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}