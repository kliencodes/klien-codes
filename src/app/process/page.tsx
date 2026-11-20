import type { Metadata } from "next";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { EngagementModels } from "@/components/sections/EngagementModels";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FinalCtaBand } from "@/components/sections/FinalCtaBand";

export const metadata: Metadata = {
  title: "Process & Engagement Models",
  description:
    "Four-phase IT consultancy workflow, transparent milestone structures, and interactive scope estimator.",
};

export default function ProcessPage() {
  return (
    <>
      <ProcessTimeline />
      <EngagementModels showEstimator />
      <FaqAccordion />
      <FinalCtaBand />
    </>
  );
}
