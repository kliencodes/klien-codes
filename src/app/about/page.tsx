import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { TechStackMatrix } from "@/components/interactive/TechStackMatrix";
import { FinalCtaBand } from "@/components/sections/FinalCtaBand";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: `About ${siteConfig.brandName}`,
  description: siteConfig.description,
};

export default function AboutPage() {
  return (
    <>
      <AboutPreview />
      <AchievementsSection />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
        <Reveal>
          <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-text)] uppercase">
            TECHNOLOGIES WE WORK WITH
          </span>
          <h2 className="mt-2 mb-8 font-display text-2xl font-semibold text-[var(--text-primary)] sm:text-3xl">
            Tools &amp; Platforms
          </h2>
          <TechStackMatrix />
        </Reveal>
      </section>
      <FinalCtaBand />
    </>
  );
}
