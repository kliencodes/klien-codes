"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy, Mail } from "lucide-react";
import { footerColumns } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/brand/Logo";
import { AvailabilityBadge } from "@/components/brand/AvailabilityBadge";
import { copyToClipboard } from "@/lib/utils";

export function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyToClipboard(siteConfig.contactEmail);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface-1)]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-4">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed text-[var(--text-secondary)]">
              {siteConfig.description}
            </p>
            <AvailabilityBadge />
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-mono text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerColumns.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-text)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-mono text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerColumns.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-text)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3.5 lg:col-span-3">
            <h3 className="font-mono text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase">
              Contact {siteConfig.teamName}
            </h3>

            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="inline-flex min-h-[40px] w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent-primary)] px-3.5 text-xs font-semibold text-[#FAFAFA] transition-colors hover:bg-[var(--accent-primary-hover)] sm:w-auto"
            >
              <Mail className="h-4 w-4" />
              <span>Email {siteConfig.teamName}</span>
            </a>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex min-h-[40px] w-full cursor-pointer items-center justify-between gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] px-3 py-2 font-mono text-xs text-[var(--text-primary)] transition-colors hover:border-[var(--accent-primary)] sm:w-auto"
            >
              <span className="truncate">{siteConfig.contactEmail}</span>
              {copied ? (
                <Check className="h-3.5 w-3.5 shrink-0 text-[var(--status-success)]" />
              ) : (
                <Copy className="h-3.5 w-3.5 shrink-0 text-[var(--text-muted)]" />
              )}
            </button>

            <p className="text-xs leading-relaxed text-[var(--text-muted)]">
              {siteConfig.locationTz}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[var(--border-subtle)] pt-8 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.
          </p>
          <p className="font-mono">
            {siteConfig.teamName.toUpperCase()} · INDIA
          </p>
        </div>
      </div>
    </footer>
  );
}
