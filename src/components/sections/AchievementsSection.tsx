import Link from "next/link";
import { ArrowUpRight, Award, Building2, CheckCircle2, Users } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const stats = [
  {
    value: "100+",
    label: "Projects Delivered",
    detail: "Successfully shipped across startups, SMEs, and enterprises.",
    icon: CheckCircle2,
  },
  {
    value: "6 Years",
    label: "Proven Track Record",
    detail: "Six years of consistent engineering and IT consultancy delivery.",
    icon: Award,
  },
  {
    value: "50+",
    label: "Specialized Engineers",
    detail: "Dedicated experts across cloud, software, security, and data.",
    icon: Users,
  },
  {
    value: "Pan-India",
    label: "Virtual & In-Office",
    detail: "Hybrid engineering teams collaborating across India.",
    icon: Building2,
  },
];

export function AchievementsSection({ showLink = true }: { showLink?: boolean }) {
  return (
    <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface-1)]/70 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <Reveal>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-text)] uppercase">
                OUR TRACK RECORD
              </span>
              <h2 className="mt-2 font-display text-2xl font-semibold text-[var(--text-primary)] sm:text-4xl">
                Trusted Delivery Backed by Real Numbers
              </h2>
            </div>

            {showLink && (
              <Link
                href="/achievements"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--accent-text)] hover:underline"
              >
                <span>VIEW ACHIEVEMENTS</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Reveal key={stat.label} delay={idx * 0.06}>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-6 transition-colors hover:border-[var(--accent-primary)]/60">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-3xl font-bold text-[var(--text-primary)] tabular-nums sm:text-4xl">
                      {stat.value}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)]">
                      <Icon className="h-5 w-5 text-[var(--accent-text)]" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-display text-base font-semibold text-[var(--text-primary)]">
                      {stat.label}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {stat.detail}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
