import Link from "next/link";
import {
  ArrowRight,
  Cloud,
  Compass,
  Cpu,
  Database,
  GitBranch,
  ShieldCheck,
} from "lucide-react";
import { services, type ServiceItem } from "@/content/services";
import { Reveal } from "@/components/motion/Reveal";

function ServiceIcon({ name }: { name: ServiceItem["iconName"] }) {
  const cls = "h-5 w-5 text-[var(--accent-text)]";
  switch (name) {
    case "Cloud":
      return <Cloud className={cls} />;
    case "GitBranch":
      return <GitBranch className={cls} />;
    case "ShieldCheck":
      return <ShieldCheck className={cls} />;
    case "Cpu":
      return <Cpu className={cls} />;
    case "Database":
      return <Database className={cls} />;
    case "Compass":
      return <Compass className={cls} />;
  }
}

export function ServicesBentoGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
      <Reveal className="max-w-2xl">
        <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-text)] uppercase">
          WHAT WE DO
        </span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-[var(--text-primary)] sm:text-4xl">
          Clear, Dependable IT Services for Every Stage
        </h2>
        <p className="mt-3 text-base text-[var(--text-secondary)]">
          Straightforward engineering and IT consulting—designed so normal
          teams can understand what we build and own it completely.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
        {services.map((service, idx) => (
          <Reveal
            key={service.id}
            delay={idx * 0.05}
            className={service.featured ? "lg:col-span-6" : "lg:col-span-6 xl:col-span-3"}
          >
            <Link
              href={`/services/${service.slug}`}
              className="group relative flex h-full flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/70 hover:bg-[var(--bg-surface-2)]/70 active:scale-[0.99]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[var(--text-muted)]">
                    {service.index}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)]">
                    <ServiceIcon name={service.iconName} />
                  </div>
                </div>

                <h3 className="mt-4 font-display text-xl font-semibold text-[var(--text-primary)]">
                  {service.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {service.shortSummary}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-1.5 font-mono text-xs font-medium text-[var(--accent-text)]">
                <span>Learn More</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
