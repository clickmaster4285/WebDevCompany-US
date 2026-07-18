type TechnologyFAQProps = {
  faqs?: {
    question: string;
    answer: string;
  }[];
};

export function TechnologyFAQ({ faqs }: TechnologyFAQProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="mt-6 grid gap-3 md:mt-8 md:gap-4">
      {faqs.map((faq) => (
        <details
          key={faq.question}
          className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 md:p-5"
        >
          <summary className="cursor-pointer list-none text-sm font-black text-slate-950 md:text-base">
            {faq.question}
          </summary>

          <p className="mt-3 text-xs leading-7 text-slate-600 md:mt-4 md:text-sm">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}