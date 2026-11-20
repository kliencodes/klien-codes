"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

type NeedType = "audit" | "build" | "advisory";
type TimelineType = "urgent" | "quarter" | "ongoing";
type TeamSize = "solo" | "growth" | "enterprise";

export function ScopeEstimator() {
  const [need, setNeed] = useState<NeedType>("build");
  const [timeline, setTimeline] = useState<TimelineType>("quarter");
  const [team, setTeam] = useState<TeamSize>("growth");

  const getRecommendation = () => {
    if (need === "advisory" || timeline === "ongoing") {
      return {
        modelId: "retainer",
        title: "Fractional Principal Advisory",
        summary:
          "Best fit for ongoing architectural oversight, RFC sign-offs, and weekly engineering alignment without a full-time executive hire.",
      };
    }
    if (need === "audit" || timeline === "urgent") {
      return {
        modelId: "audit",
        title: "Architecture & Security Audit",
        summary:
          "Fast 1–2 week diagnostic review to pinpoint immediate risks, cloud cost leaks, and a prioritized 90-day remediation roadmap.",
      };
    }
    return {
      modelId: "implementation",
      title: "End-to-End Implementation",
      summary:
        "Milestone-based delivery covering target RFC blueprint, production IaC/code, CI/CD automation, and complete team handover.",
    };
  };

  const rec = getRecommendation();

  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6 lg:p-8">
      <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-[var(--accent-text)] uppercase">
        <Sparkles className="h-4 w-4" />
        <span>INTERACTIVE // QUICK SCOPE ESTIMATOR</span>
      </div>
      <h3 className="mt-2 font-display text-xl font-semibold text-[var(--text-primary)]">
        Not sure which engagement model fits?
      </h3>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div>
          <p className="font-mono text-[11px] text-[var(--text-muted)] uppercase">
            1. Primary Goal
          </p>
          <div className="mt-2.5 flex flex-col gap-2">
            {[
              { id: "audit", label: "Audit / Second Opinion" },
              { id: "build", label: "Hands-On Cloud / DevOps Build" },
              { id: "advisory", label: "Ongoing Fractional CTO" },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setNeed(opt.id as NeedType)}
                className={`cursor-pointer rounded-lg border px-3 py-2 text-left text-xs font-medium transition-all active:scale-[0.98] ${
                  need === opt.id
                    ? "border-[var(--accent-primary)] bg-[var(--bg-surface-2)] text-[var(--text-primary)]"
                    : "border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-[11px] text-[var(--text-muted)] uppercase">
            2. Target Timeline
          </p>
          <div className="mt-2.5 flex flex-col gap-2">
            {[
              { id: "urgent", label: "Urgent (< 30 Days)" },
              { id: "quarter", label: "1–3 Months" },
              { id: "ongoing", label: "Flexible / Ongoing" },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setTimeline(opt.id as TimelineType)}
                className={`cursor-pointer rounded-lg border px-3 py-2 text-left text-xs font-medium transition-all active:scale-[0.98] ${
                  timeline === opt.id
                    ? "border-[var(--accent-primary)] bg-[var(--bg-surface-2)] text-[var(--text-primary)]"
                    : "border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-[11px] text-[var(--text-muted)] uppercase">
            3. Engineering Team Size
          </p>
          <div className="mt-2.5 flex flex-col gap-2">
            {[
              { id: "solo", label: "Founder / Solo" },
              { id: "growth", label: "2–15 Engineers" },
              { id: "enterprise", label: "15+ Enterprise Team" },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setTeam(opt.id as TeamSize)}
                className={`cursor-pointer rounded-lg border px-3 py-2 text-left text-xs font-medium transition-all active:scale-[0.98] ${
                  team === opt.id
                    ? "border-[var(--accent-primary)] bg-[var(--bg-surface-2)] text-[var(--text-primary)]"
                    : "border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-2)] p-5 sm:flex-row sm:items-center">
        <div className="max-w-xl">
          <span className="font-mono text-[11px] font-semibold text-[var(--accent-text)] uppercase">
            RECOMMENDED FIT ({team.toUpperCase()} TEAM)
          </span>
          <h4 className="mt-1 font-display text-lg font-semibold text-[var(--text-primary)]">
            {rec.title}
          </h4>
          <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
            {rec.summary}
          </p>
        </div>

        <Link
          href={`/contact?model=${rec.modelId}&need=${need}`}
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-lg bg-[var(--accent-primary)] px-5 text-sm font-semibold text-[#FAFAFA] transition-all hover:bg-[var(--accent-primary-hover)] active:scale-[0.98]"
        >
          <span>Pre-Fill Project Brief</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
