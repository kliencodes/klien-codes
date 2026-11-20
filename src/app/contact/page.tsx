import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, MapPin, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { AvailabilityBadge } from "@/components/brand/AvailabilityBadge";
import { ContactIntakeForm } from "@/components/interactive/ContactIntakeForm";

export const metadata: Metadata = {
  title: "Contact Team Klien Codes",
  description:
    "Contact Team Klien Codes via email, quick query, or detailed project brief.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-12 lg:py-20">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="space-y-6 lg:col-span-5">
          <AvailabilityBadge />
          <h1 className="font-display text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
            Contact {siteConfig.teamName}
          </h1>
          <p className="text-base leading-relaxed text-[var(--text-secondary)]">
            Have a quick question or a full project in mind? Email us directly
            or submit your query right here—our team responds within 1 business
            day.
          </p>

          <div className="space-y-3 border-t border-[var(--border-subtle)] pt-6">
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="flex min-h-[56px] items-center justify-between rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-1)] px-4 py-3 transition-colors hover:border-[var(--accent-primary)]"
            >
              <span className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[var(--accent-text)]" />
                <span className="text-left">
                  <span className="block text-xs text-[var(--text-muted)]">
                    Direct Email
                  </span>
                  <span className="font-mono text-sm font-medium text-[var(--text-primary)]">
                    {siteConfig.contactEmail}
                  </span>
                </span>
              </span>
              <span className="font-mono text-xs text-[var(--accent-text)]">
                MAIL →
              </span>
            </a>
          </div>

          <div className="space-y-3 pt-2 text-sm text-[var(--text-secondary)]">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-text)]" />
              <span>{siteConfig.locationTz}</span>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--status-success)]" />
              <span>Mutual NDA available before sharing sensitive details</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Suspense
            fallback={
              <div className="h-96 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-8 font-mono text-xs text-[var(--text-muted)]">
                Loading contact form...
              </div>
            }
          >
            <ContactIntakeForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
