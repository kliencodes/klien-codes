import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { engagementModels } from "@/content/engagement-models";
import { ScopeEstimator } from "@/components/interactive/ScopeEstimator";
import { Reveal } from "@/components/motion/Reveal";

export function EngagementModels({ showEstimator = true }: { showEstimator?: boolean }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-28">
      <Reveal className="max-w-2xl">
        <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-text)] uppercase">
          05 // ENGAGEMENT MODELS
        </span>
        <h2 className="mt-3 font-display text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
          Flexible Structures Built Around Your Stage
        </h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {engagementModels.map((model, idx) => (
          <Reveal key={model.id} delay={idx * 0.06}>
            <div
              className={`relative flex h-full flex-col justify-between rounded-2xl border bg-[var(--bg-surface-1)] p-7 transition-transform duration-300 hover:-translate-y-1 ${
                model.highlighted
                  ? "border-[var(--accent-primary)] shadow-xl shadow-red-950/20"
                  : "border-[var(--border-subtle)]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-[var(--text-muted)]">
                    {model.typicalScope}
                  </span>
                  {model.badge && (
                    <span className="rounded-full bg-[var(--accent-primary)] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#FAFAFA]">
                      {model.badge}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 font-display text-2xl font-semibold text-[var(--text-primary)]">
                  {model.name}
                </h3>

                <p className="mt-2 font-mono text-sm font-medium text-[var(--accent-text)] tabular-nums">
                  {model.pricingDisplay}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {model.bestFor}
                </p>

                <ul className="mt-6 space-y-2.5 border-t border-[var(--border-subtle)] pt-5 text-sm text-[var(--text-secondary)]">
                  {model.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-text)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/contact?model=${model.id}`}
                className={`mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-all active:scale-[0.98] ${
                  model.highlighted
                    ? "bg-[var(--accent-primary)] text-[#FAFAFA] hover:bg-[var(--accent-primary-hover)]"
                    : "border border-[var(--border-strong)] bg-[var(--bg-surface-2)] text-[var(--text-primary)] hover:border-[var(--accent-primary)]"
                }`}
              >
                <span>{model.ctaLabel}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        ))}
      </div>

      {showEstimator && (
        <Reveal delay={0.12} className="mt-10">
          <ScopeEstimator />
        </Reveal>
      )}
    </section>
  );
}
