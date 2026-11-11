"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

/** CMS faq items, styled like the site's services FAQ (components/mainpageservices/FAQSection). */
export function CmsFaq({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div
            key={`${i}-${faq.question}`}
            className={`relative border transition-colors duration-300 ${
              isOpen
                ? "border-[var(--cms-border-strong)] bg-[var(--cms-card-hover)]"
                : "border-[var(--cms-border)] bg-[var(--cms-card)] hover:border-[var(--cms-border-strong)]"
            }`}
          >
            <span
              aria-hidden
              className={`absolute left-0 top-0 h-full w-px transition-all duration-300 ${
                isOpen ? "bg-[var(--cms-accent)]" : "bg-transparent"
              }`}
            />
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center gap-4 p-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary/70"
            >
              <span className="font-mono text-xs text-[var(--cms-accent)]">
                Q{String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 pr-4 font-medium text-[var(--cms-fg)]">
                {faq.question}
              </span>
              <Plus
                className={`h-5 w-5 shrink-0 text-[var(--cms-accent)] transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="whitespace-pre-line p-5 pl-14 pt-0 leading-relaxed text-[var(--cms-fg-muted)]">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
