"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

interface BlueprintTab {
  id: string;
  label: string;
  nodes: string[];
  beforeTitle: string;
  beforePoints: string[];
  afterTitle: string;
  afterPoints: string[];
}

const blueprints: BlueprintTab[] = [
  {
    id: "cloud",
    label: "Cloud Migration",
    nodes: ["Legacy VMs", "Terraform IaC", "Multi-AZ Cluster", "Weighted DNS Cutover"],
    beforeTitle: "Before: Fragile Single-Region Setup",
    beforePoints: [
      "Manual server clicks causing staging/production drift",
      "Risky weekend maintenance windows for upgrades",
      "Uncontrolled cloud compute and egress bills",
    ],
    afterTitle: "After: Reproducible Multi-AZ Architecture",
    afterPoints: [
      "100% versioned Terraform modules with PR plan previews",
      "Zero-downtime blue/green releases & automated failover",
      "Right-sized autoscaling with FinOps cost guardrails",
    ],
  },
  {
    id: "devsecops",
    label: "Zero-Trust DevSecOps",
    nodes: ["Signed PR", "SAST & SBOM Gate", "OIDC Keyless Auth", "Hardened Prod"],
    beforeTitle: "Before: Static Keys & Manual Audits",
    beforePoints: [
      "Long-lived cloud access keys stored in CI variables",
      "Unscanned container images & open security groups",
      "Weeks lost gathering compliance evidence manually",
    ],
    afterTitle: "After: Automated Supply-Chain Security",
    afterPoints: [
      "Short-lived OIDC workload identity with zero static secrets",
      "Automated Trivy/SAST gates blocking vulnerable builds",
      "Immutable audit trails aligned with SOC 2 / ISO 27001",
    ],
  },
  {
    id: "api",
    label: "High-Throughput API",
    nodes: ["Edge WAF", "API Gateway", "Async Event Bus", "Indexed DB + Redis"],
    beforeTitle: "Before: Monolith Contention & Timeouts",
    beforePoints: [
      "Synchronous background jobs blocking user requests",
      "Unindexed queries triggering cascading DB locks",
      "Blind spots during peak-traffic latency spikes",
    ],
    afterTitle: "After: Observable Event-Driven System",
    afterPoints: [
      "Durable async worker queues with idempotent retries",
      "Read-through Redis caching & tuned query execution plans",
      "Full OpenTelemetry distributed tracing & SLO alerts",
    ],
  },
];

export function ArchitectureShowcase() {
  const [activeId, setActiveId] = useState<string>("cloud");
  const current = blueprints.find((b) => b.id === activeId) || blueprints[0];

  return (
    <section className="border-y border-[var(--border-subtle)] bg-[var(--bg-surface-1)]/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-text)] uppercase">
                02 // ARCHITECTURAL RIGOR
              </span>
              <h2 className="mt-3 font-display text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
                From Ambiguous Bottlenecks to Documented Production Systems
              </h2>
            </div>

            <div className="inline-flex flex-wrap gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-1.5">
              {blueprints.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveId(tab.id)}
                  className={`cursor-pointer rounded-lg px-4 py-2 font-mono text-xs font-medium transition-all active:scale-[0.97] ${
                    tab.id === current.id
                      ? "bg-[var(--accent-primary)] font-semibold text-[#FAFAFA]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="bg-blueprint-grid mt-10 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {current.nodes.map((node, idx) => (
                  <div
                    key={node}
                    className="relative rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-1)] p-4"
                  >
                    <span className="font-mono text-[11px] text-[var(--accent-text)]">
                      STAGE 0{idx + 1}
                    </span>
                    <p className="mt-1 font-display text-base font-semibold text-[var(--text-primary)]">
                      {node}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div className="rounded-xl border border-[var(--status-warning)]/30 bg-[var(--bg-surface-1)] p-5">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[var(--status-warning)]">
                    <AlertTriangle className="h-4 w-4" />
                    <span>{current.beforeTitle}</span>
                  </div>
                  <ul className="mt-3.5 space-y-2 text-sm text-[var(--text-secondary)]">
                    {current.beforePoints.map((pt) => (
                      <li key={pt} className="flex gap-2">
                        <span className="font-mono text-[var(--status-warning)]">-</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-[var(--status-success)]/35 bg-[var(--bg-surface-1)] p-5">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[var(--status-success)]">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{current.afterTitle}</span>
                  </div>
                  <ul className="mt-3.5 space-y-2 text-sm text-[var(--text-secondary)]">
                    {current.afterPoints.map((pt) => (
                      <li key={pt} className="flex gap-2">
                        <span className="font-mono text-[var(--status-success)]">+</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
