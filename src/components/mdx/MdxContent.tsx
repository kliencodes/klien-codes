import { MDXRemote } from "next-mdx-remote/rsc";
import type { ReactNode } from "react";

const components = {
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 className="mt-10 mb-4 font-display text-2xl font-semibold text-[var(--text-primary)]">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 className="mt-8 mb-3 font-display text-xl font-semibold text-[var(--text-primary)]">
      {children}
    </h3>
  ),
  p: ({ children }: { children?: ReactNode }) => (
    <p className="mb-4 text-base leading-relaxed text-[var(--text-secondary)]">
      {children}
    </p>
  ),
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="mb-5 list-disc space-y-2 pl-6 text-base text-[var(--text-secondary)]">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="mb-5 list-decimal space-y-2 pl-6 text-base text-[var(--text-secondary)]">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: ReactNode }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="font-semibold text-[var(--text-primary)]">{children}</strong>
  ),
  code: ({ children }: { children?: ReactNode }) => (
    <code className="rounded bg-[var(--bg-surface-2)] px-1.5 py-0.5 font-mono text-sm text-[var(--accent-primary)]">
      {children}
    </code>
  ),
};

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="max-w-none">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
