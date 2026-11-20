import { getAllCaseStudies } from "@/lib/mdx";
import { HeroSection } from "@/components/sections/HeroSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ServicesBentoGrid } from "@/components/sections/ServicesBentoGrid";
import { CaseStudyGrid } from "@/components/sections/CaseStudyGrid";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FinalCtaBand } from "@/components/sections/FinalCtaBand";

export default function HomePage() {
  const caseStudies = getAllCaseStudies();

  return (
    <>
      <HeroSection />
      <AchievementsSection />
      <ServicesBentoGrid />
      <CaseStudyGrid items={caseStudies} />
      <ProcessTimeline />
      <AboutPreview />
      <FaqAccordion />
      <FinalCtaBand />
    </>
  );
}
