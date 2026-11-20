import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/mdx";
import { MdxContent } from "@/components/mdx/MdxContent";
import { FinalCtaBand } from "@/components/sections/FinalCtaBand";

export function generateStaticParams() {
  return getAllCaseStudies().map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return { title: "Case Study Not Found" };
  return {
    title: cs.title,
    description: cs.challenge,
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();

  return (
    <>
      <article className="mx-auto max-w-6xl px-6 py-16 lg:px-12 lg:py-24">
        <Link
          href="/work"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--accent-primary)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>ALL CASE STUDIES</span>
        </Link>

        <div className="mt-6 max-w-3xl">
          <span className="font-mono text-xs font-semibold text-[var(--accent-primary)] uppercase">
            {cs.industry} · {cs.servicePillar} · {cs.duration}
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold text-[var(--text-primary)] sm:text-5xl">
            {cs.title}
          </h1>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
          <img
            src={cs.thumbnail}
            alt={cs.title}
            width={1600}
            height={1000}
            className="aspect-[16/10] w-full object-cover"
          />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <MdxContent source={cs.content} />
          </div>

          <aside className="space-y-6 lg:col-span-4">
            <div className="sticky top-24 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6">
              <h2 className="font-mono text-xs font-semibold text-[var(--accent-primary)] uppercase">
                Engagement Summary
              </h2>
              <div className="mt-4 space-y-4 text-sm text-[var(--text-secondary)]">
                <div>
                  <span className="block font-mono text-[11px] text-[var(--text-muted)]">
                    CHALLENGE
                  </span>
                  <p className="mt-1">{cs.challenge}</p>
                </div>
                <div>
                  <span className="block font-mono text-[11px] text-[var(--text-muted)]">
                    OUTCOME
                  </span>
                  <p className="mt-1">{cs.outcome}</p>
                </div>
                <div>
                  <span className="block font-mono text-[11px] text-[var(--text-muted)]">
                    STACK
                  </span>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {cs.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] px-2.5 py-0.5 font-mono text-[11px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </article>
      <FinalCtaBand />
    </>
  );
}
