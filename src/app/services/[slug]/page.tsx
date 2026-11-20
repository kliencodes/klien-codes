import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { getServiceBySlug, services } from "@/content/services";
import { FinalCtaBand } from "@/components/sections/FinalCtaBand";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.title,
    description: service.shortSummary,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <article className="mx-auto max-w-5xl px-6 py-16 lg:px-12 lg:py-24">
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--accent-primary)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>ALL SERVICES</span>
        </Link>

        <div className="mt-6">
          <span className="font-mono text-xs font-semibold text-[var(--accent-primary)]">
            CAPABILITY {service.index} // TYPICAL TIMELINE: {service.typicalTimeline}
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold text-[var(--text-primary)] sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--text-secondary)]">
            {service.fullDescription}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6">
            <h2 className="font-mono text-xs font-semibold text-[var(--accent-primary)] uppercase">
              Key Deliverables
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
              {service.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-primary)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6">
            <h2 className="font-mono text-xs font-semibold text-[var(--accent-primary)] uppercase">
              Ideal For Teams Who Need
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
              {service.idealFor.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-secondary)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6">
          <h2 className="font-mono text-xs font-semibold text-[var(--accent-primary)] uppercase">
            Execution Blueprint
          </h2>
          <ol className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {service.sampleArchitectureSteps.map((step, i) => (
              <li
                key={step}
                className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-4 text-sm text-[var(--text-secondary)]"
              >
                <span className="font-mono text-xs font-semibold text-[var(--accent-primary)]">
                  0{i + 1} //
                </span>
                <p className="mt-1.5">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {service.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] px-3 py-1 font-mono text-xs text-[var(--text-secondary)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </article>
      <FinalCtaBand />
    </>
  );
}
