"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Copy, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { copyToClipboard } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

export function FinalCtaBand() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyToClipboard(siteConfig.contactEmail);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-12">
      <Reveal>
        <div className="bg-blueprint-grid relative overflow-hidden rounded-3xl border border-[var(--border-strong)] bg-[var(--bg-surface-1)] p-6 text-center sm:p-12">
          <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-text)] uppercase">
            GET IN TOUCH
          </span>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-2xl font-bold text-[var(--text-primary)] sm:text-4xl">
            Have an IT Project or Question? Talk to {siteConfig.teamName}.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-[var(--text-secondary)] sm:text-base">
            Send us an email directly or submit your query on our website—
            {siteConfig.teamName} replies within 1 business day.
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/contact"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[var(--accent-primary)] px-6 text-sm font-semibold text-[#FAFAFA] transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-primary-hover)] active:scale-[0.98]"
            >
              <span>Send Query / Project Brief</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-5 text-sm font-medium text-[var(--text-primary)] transition-all hover:border-[var(--accent-primary)] active:scale-[0.98]"
            >
              <Mail className="h-4 w-4 text-[var(--accent-text)]" />
              <span>Email Us</span>
            </a>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-5 font-mono text-xs font-medium text-[var(--text-primary)] transition-all hover:border-[var(--accent-primary)] active:scale-[0.98]"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-[var(--status-success)]" />
                  <span>Copied {siteConfig.contactEmail}</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-[var(--accent-text)]" />
                  <span>{siteConfig.contactEmail}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
