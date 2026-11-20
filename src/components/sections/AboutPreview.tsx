import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/motion/Reveal";

const principles = [
  "100+ projects successfully delivered over the past 6 years.",
  "50+ specialized engineers working both virtually and in-office across India.",
  "Plain-English communication, honest timelines, and 100% client ownership.",
];

export function AboutPreview() {
  return (
    <section className="border-y border-[var(--border-subtle)] bg-[var(--bg-surface-1)]/60 py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-12">
        <Reveal>
          <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-text)] uppercase">
            ABOUT KLIEN CODES
          </span>
          <h2 className="mt-2 font-display text-2xl font-semibold text-[var(--text-primary)] sm:text-4xl">
            Built by Engineers Who Care About Clarity and Results
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-6 sm:p-10">
            <p className="text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              We started{" "}
              <strong className="text-[var(--text-primary)]">
                {siteConfig.brandName}
              </strong>{" "}
              with a simple belief: businesses shouldn&apos;t have to fight
              through confusing jargon or bloated agencies just to get reliable
              software and IT infrastructure. Today, our team of 50+ specialized
              engineers works both virtually and from offices across India—having
              delivered 100+ projects over 6 years with transparent pricing and
              zero lock-in.
            </p>

            <ul className="mt-7 space-y-3 border-t border-[var(--border-subtle)] pt-6">
              {principles.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-text)]" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            {/* MD Name ONLY at the end of the About message */}
            <div className="mt-8 flex flex-col justify-between gap-4 border-t border-[var(--border-subtle)] pt-6 sm:flex-row sm:items-end">
              <div>
                <p className="font-display text-xl font-semibold text-[var(--text-primary)]">
                  — {siteConfig.mdName}
                </p>
                <p className="mt-0.5 font-mono text-xs text-[var(--accent-text)]">
                  {siteConfig.mdTitle}
                </p>
              </div>

              <Link
                href="/achievements"
                className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-[var(--text-primary)] transition-colors hover:text-[var(--accent-text)]"
              >
                <span>OUR ACHIEVEMENTS</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
