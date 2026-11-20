import type { Metadata } from "next";
import { ServicesBentoGrid } from "@/components/sections/ServicesBentoGrid";
import { TechStackMatrix } from "@/components/interactive/TechStackMatrix";
import { FinalCtaBand } from "@/components/sections/FinalCtaBand";

export const metadata: Metadata = {
  title: "Solutions & Services",
  description:
    "Cloud architecture, DevOps & IaC automation, DevSecOps hardening, software modernization, data/AI pipelines, and fractional CTO advisory.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesBentoGrid />
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-12">
        <div className="mb-8 max-w-2xl">
          <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-primary)] uppercase">
            ECOSYSTEM // CAPABILITY MATRIX
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-[var(--text-primary)]">
            Production Stack &amp; Tooling Proficiency
          </h2>
        </div>
        <TechStackMatrix />
      </section>
      <FinalCtaBand />
    </>
  );
}
