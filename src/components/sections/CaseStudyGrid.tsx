"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudyMeta } from "@/lib/mdx";
import { Reveal } from "@/components/motion/Reveal";

interface CaseStudyGridProps {
  items: CaseStudyMeta[];
  showFilters?: boolean;
}

export function CaseStudyGrid({
  items,
  showFilters = false,
}: CaseStudyGridProps) {
  const [filter, setFilter] = useState<string>("All");
  const pillars = ["All", ...Array.from(new Set(items.map((i) => i.servicePillar)))];

  const visible =
    filter === "All" ? items : items.filter((i) => i.servicePillar === filter);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-28">
      <Reveal>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-text)] uppercase">
              03 // SELECTED ENGAGEMENTS
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
              Architecture Decisions Measured in Business Outcomes
            </h2>
          </div>

          {!showFilters && (
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--accent-text)] hover:underline"
            >
              <span>VIEW ALL BLUEPRINTS</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </Reveal>

      {showFilters && (
        <div className="mt-8 flex flex-wrap gap-2">
          {pillars.map((pillar) => (
            <button
              key={pillar}
              type="button"
              onClick={() => setFilter(pillar)}
              className={`cursor-pointer rounded-full border px-3.5 py-1.5 font-mono text-xs transition-all active:scale-95 ${
                filter === pillar
                  ? "border-[var(--accent-primary)] bg-[var(--accent-primary)] font-semibold text-[#FAFAFA]"
                  : "border-[var(--border-subtle)] bg-[var(--bg-surface-1)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]"
              }`}
            >
              {pillar}
            </button>
          ))}
        </div>
      )}

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {visible.map((cs, idx) => (
          <Reveal key={cs.slug} delay={idx * 0.06}>
            <Link
              href={`/work/${cs.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)] active:scale-[0.99]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                <img
                  src={cs.thumbnail}
                  alt={cs.title}
                  width={800}
                  height={500}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-[var(--text-muted)]">
                    <span className="text-[var(--accent-text)]">{cs.industry}</span>
                    <span>·</span>
                    <span>{cs.duration}</span>
                  </div>

                  <h3 className="mt-2.5 font-display text-xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-text)]">
                    {cs.title}
                  </h3>

                  <div className="mt-4 space-y-2.5 text-xs leading-relaxed text-[var(--text-secondary)]">
                    <p>
                      <strong className="text-[var(--text-primary)]">Challenge: </strong>
                      {cs.challenge}
                    </p>
                    <p>
                      <strong className="text-[var(--text-primary)]">Architecture: </strong>
                      {cs.architecture}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-1.5 border-t border-[var(--border-subtle)] pt-4">
                  {cs.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] px-2.5 py-0.5 font-mono text-[10px] text-[var(--text-secondary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
