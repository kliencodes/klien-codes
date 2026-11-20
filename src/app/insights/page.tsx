import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllInsights } from "@/lib/mdx";
import { FinalCtaBand } from "@/components/sections/FinalCtaBand";

export const metadata: Metadata = {
  title: "Technical Insights & ADRs",
  description:
    "Field notes, cloud migration checklists, and architecture decision guides.",
};

export default function InsightsPage() {
  const posts = getAllInsights();

  return (
    <>
      <section className="mx-auto max-w-5xl px-6 py-20 lg:px-12 lg:py-24">
        <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-primary)] uppercase">
          FIELD NOTES // TECHNICAL INSIGHTS
        </span>
        <h1 className="mt-3 font-display text-4xl font-bold text-[var(--text-primary)]">
          Architecture Notes &amp; Engineering Checklists
        </h1>

        <div className="mt-12 space-y-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/insights/${post.slug}`}
              className="group block rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6 transition-colors hover:border-[var(--accent-primary)]"
            >
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[var(--text-muted)]">
                <span className="text-[var(--accent-primary)]">{post.category}</span>
                <span>·</span>
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
              <div className="mt-2 flex items-start justify-between gap-4">
                <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)]">
                  {post.title}
                </h2>
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-[var(--text-muted)] group-hover:text-[var(--accent-primary)]" />
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                {post.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <FinalCtaBand />
    </>
  );
}
