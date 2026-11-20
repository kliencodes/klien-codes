import type { Metadata } from "next";
import { Building2, Globe, ShieldCheck, Users } from "lucide-react";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { FinalCtaBand } from "@/components/sections/FinalCtaBand";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "100+ projects delivered over 6 years by Team Klien Codes—50+ specialized engineers working virtually and in-office across India.",
};

const highlights = [
  {
    title: "50+ Specialized Engineers Across India",
    description:
      "Our team brings together cloud architects, full-stack developers, DevOps specialists, cybersecurity engineers, and QA leads working seamlessly both virtually and from offices across India.",
    icon: Users,
  },
  {
    title: "100+ Projects Shipped in 6 Years",
    description:
      "From fast-moving startup launches to complex business modernizations, we have consistently delivered dependable software and IT infrastructure on clear timelines.",
    icon: ShieldCheck,
  },
  {
    title: "Hybrid Office + Virtual Collaboration",
    description:
      "We combine the speed of distributed remote engineering with structured in-office collaboration hubs across India, ensuring reliable coverage and fast communication.",
    icon: Building2,
  },
  {
    title: "Serving India & Global Clients",
    description:
      "Whether your team is based in India or overseas, our delivery workflows are built for transparent updates, clear milestones, and smooth handover.",
    icon: Globe,
  },
];

export default function AchievementsPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-14 pb-8 sm:px-6 lg:px-12 lg:pt-20">
        <Reveal className="max-w-3xl">
          <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-text)] uppercase">
            MILESTONES // KLIEN CODES
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold text-[var(--text-primary)] sm:text-5xl">
            6 Years, 100+ Projects, and 50+ Engineers Stronger
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            At Klien Codes, our growth comes from long-term client trust,
            dependable engineering, and a hybrid team of specialists working
            both virtually and in-office across India.
          </p>
        </Reveal>
      </section>

      <AchievementsSection showLink={false} />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={idx * 0.06}>
                <div className="h-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6 sm:p-8">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)]">
                    <Icon className="h-5 w-5 text-[var(--accent-text)]" />
                  </div>
                  <h2 className="mt-5 font-display text-xl font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <FinalCtaBand />
    </>
  );
}
