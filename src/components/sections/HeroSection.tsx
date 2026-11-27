import Link from "next/link";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { getWhatsAppUrl, siteConfig } from "@/config/site";
import { AvailabilityBadge } from "@/components/brand/AvailabilityBadge";
import { LiveArchitectureDiagram } from "@/components/interactive/LiveArchitectureDiagram";
import { Reveal } from "@/components/motion/Reveal";

export function HeroSection() {
  return (
    <section className="hero-glow relative overflow-hidden border-b border-[var(--border-subtle)]">
      <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_78%)]" />

      <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 lg:px-12 lg:pt-20 lg:pb-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-5 lg:col-span-7">
            <Reveal delay={0.02} y={12}>
              <AvailabilityBadge />
            </Reveal>

            <Reveal delay={0.08} y={14}>
              <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-[54px] lg:leading-[1.08]">
                {siteConfig.tagline}
              </h1>
            </Reveal>

            <Reveal delay={0.14} y={14}>
              <p className="max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
                Klien Codes helps companies build reliable websites and apps,
                move safely to the cloud, protect their data, and modernize
                older software—backed by 50+ specialized engineers working
                across India.
              </p>
            </Reveal>

            <Reveal delay={0.2} y={14}>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  href="/contact"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[var(--accent-primary)] px-6 text-sm font-semibold text-[#FAFAFA] shadow-lg shadow-red-950/20 transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-primary-hover)] active:scale-[0.98]"
                >
                  <span>Send a Query or Project Brief</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href={getWhatsAppUrl("Hi Team Klien Codes, I'd like to discuss a project.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface-1)] px-5 text-sm font-medium text-[var(--text-primary)] transition-all hover:border-[var(--accent-primary)] active:scale-[0.98]"
                >
                  <MessageCircle className="h-4 w-4 text-[var(--accent-text)]" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface-1)] px-5 text-sm font-medium text-[var(--text-primary)] transition-all hover:border-[var(--accent-primary)] active:scale-[0.98]"
                >
                  <Mail className="h-4 w-4 text-[var(--accent-text)]" />
                  <span>Email Us</span>
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.18} y={18} className="lg:col-span-5">
            <LiveArchitectureDiagram />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
