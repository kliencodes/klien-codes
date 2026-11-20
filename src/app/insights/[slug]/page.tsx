import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAllInsights, getInsightBySlug } from "@/lib/mdx";
import { MdxContent } from "@/components/mdx/MdxContent";
import { FinalCtaBand } from "@/components/sections/FinalCtaBand";

export function generateStaticParams() {
  return getAllInsights().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsightBySlug(slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getInsightBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <article className="mx-auto max-w-3xl px-6 py-16 lg:px-12 lg:py-24">
        <Link
          href="/insights"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--accent-primary)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>ALL INSIGHTS</span>
        </Link>

        <div className="mt-6 border-b border-[var(--border-subtle)] pb-8">
          <div className="flex items-center gap-3 font-mono text-xs text-[var(--text-muted)]">
            <span className="text-[var(--accent-primary)]">{post.category}</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-base text-[var(--text-secondary)]">
            {post.summary}
          </p>
        </div>

        <div className="mt-8">
          <MdxContent source={post.content} />
        </div>
      </article>
      <FinalCtaBand />
    </>
  );
}
