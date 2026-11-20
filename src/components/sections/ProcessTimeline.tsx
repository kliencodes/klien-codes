import { processPhases } from "@/content/engagement-models";
import { Reveal } from "@/components/motion/Reveal";

export function ProcessTimeline() {
  return (
    <section className="border-y border-[var(--border-subtle)] bg-[var(--bg-surface-1)]/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <Reveal className="max-w-2xl">
          <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-text)] uppercase">
            04 // DELIVERY PROTOCOL
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
            A Transparent, Documentation-First Engagement Workflow
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {processPhases.map((step, idx) => (
            <Reveal key={step.phase} delay={idx * 0.06}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-6 transition-colors hover:border-[var(--border-strong)]">
                <div>
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-semibold text-[var(--accent-text)]">
                      {step.phase}
                    </span>
                    <span className="text-[var(--text-muted)]">{step.duration}</span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-[var(--text-primary)]">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {step.summary}
                  </p>
                </div>

                <div className="mt-6 border-t border-[var(--border-subtle)] pt-3.5 font-mono text-[11px] text-[var(--status-success)]">
                  OUTPUT: {step.output}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
