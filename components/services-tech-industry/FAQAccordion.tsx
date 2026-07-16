'use client';
import { useState } from 'react';
import { IndustryPageData } from '@/data/tech-serv-industry';

type Props = { items: IndustryPageData['faqs'] };

export function FAQAccordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section>
      <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto space-y-3">
        {items.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className={`rounded-xl border transition-all duration-300 overflow-hidden ${isOpen ? 'bg-blue-50 border-blue-200 shadow-md' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
              <button
                className="w-full text-left p-5 font-semibold flex justify-between items-center gap-4"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
              >
                <span className={isOpen ? 'text-blue-900' : 'text-slate-900'}>{faq.question}</span>
                <svg 
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                  <div className="p-5 pt-0 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}