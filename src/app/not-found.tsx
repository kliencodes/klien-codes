import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[65vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] px-4 py-1.5 font-mono text-xs text-[var(--accent-text)]">
        <Terminal className="h-3.5 w-3.5" />
        <span>404 // ROUTE_NOT_FOUND</span>
      </div>
      <h1 className="mt-6 font-display text-4xl font-bold text-[var(--text-primary)]">
        Endpoint Does Not Exist
      </h1>
      <p className="mt-3 max-w-md text-sm text-[var(--text-secondary)]">
        The architecture path you requested could not be resolved. Return home
        or press <span className="font-mono text-[var(--text-primary)]">⌘K</span>{" "}
        to jump anywhere on the site.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center gap-2 rounded-lg bg-[var(--accent-primary)] px-5 text-sm font-semibold text-[#FAFAFA] hover:bg-[var(--accent-primary-hover)]"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Home</span>
      </Link>
    </section>
  );
}
