import type { Metadata } from "next";
import { getAllCaseStudies } from "@/lib/mdx";
import { CaseStudyGrid } from "@/components/sections/CaseStudyGrid";
import { FinalCtaBand } from "@/components/sections/FinalCtaBand";

export const metadata: Metadata = {
  title: "Case Studies & Architecture",
  description:
    "Reference architectures and IT consultancy engagements across cloud migration, DevSecOps, and legacy modernization.",
};

export default function WorkPage() {
  const items = getAllCaseStudies();
  return (
    <>
      <CaseStudyGrid items={items} showFilters />
      <FinalCtaBand />
    </>
  );
}
