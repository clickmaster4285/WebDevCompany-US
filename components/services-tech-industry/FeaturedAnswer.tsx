// components/sections/FeaturedAnswer.tsx
type Props = { text: string };

export function FeaturedAnswer({ text }: Props) {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-white border-l-4 border-blue-600 p-8 md:p-10 rounded-r-xl shadow-sm overflow-hidden">
      {/* Watermark Quote Icon */}
      <svg className="absolute top-4 right-4 w-24 h-24 text-blue-100 opacity-50" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      
      <p className="relative z-10 text-lg md:text-xl text-slate-800 leading-relaxed font-medium italic">
        "{text}"
      </p>
    </section>
  );
}