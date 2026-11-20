"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqItems } from "@/content/faq";
import { getFaqJsonLd } from "@/lib/schema";

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqJsonLd = getFaqJsonLd();

  return (
    <section className="mx-auto max-w-4xl px-6 py-20 lg:px-12 lg:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="text-center">
        <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-primary)] uppercase">
          07 // FREQUENTLY ASKED QUESTIONS
        </span>
        <h2 className="mt-3 font-display text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
          Common Technical &amp; Engagement Questions
        </h2>
      </div>

      <div className="mt-10 divide-y divide-[var(--border-subtle)] rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)]">
        {faqItems.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={item.question} className="p-5 sm:p-6">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
              >
                <span className="font-display text-base font-semibold text-[var(--text-primary)]">
                  {item.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-[var(--accent-primary)] transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <p className="mt-3.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
