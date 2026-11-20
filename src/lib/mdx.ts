import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "src", "content");

export interface CaseStudyMeta {
  slug: string;
  title: string;
  industry: string;
  servicePillar: string;
  duration: string;
  thumbnail: string;
  challenge: string;
  architecture: string;
  outcome: string;
  stack: string[];
  isReferenceBlueprint?: boolean;
}

export interface CaseStudy extends CaseStudyMeta {
  content: string;
}

export interface InsightMeta {
  slug: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  readingTime: string;
}

export interface Insight extends InsightMeta {
  content: string;
}

function readMdxDirectory(folder: string): string[] {
  const dirPath = path.join(CONTENT_ROOT, folder);
  if (!fs.existsSync(dirPath)) return [];
  return fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));
}

export function getAllCaseStudies(): CaseStudyMeta[] {
  const files = readMdxDirectory("case-studies");
  return files.map((filename) => {
    const filePath = path.join(CONTENT_ROOT, "case-studies", filename);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data } = matter(raw);
    const slug = (data.slug as string) || filename.replace(/\.mdx?$/, "");
    return {
      slug,
      title: String(data.title || "Untitled Blueprint"),
      industry: String(data.industry || "Enterprise IT"),
      servicePillar: String(data.servicePillar || "Cloud Architecture"),
      duration: String(data.duration || "6 Weeks"),
      thumbnail: String(data.thumbnail || "/assets/case-studies/case-01-thumb.webp"),
      challenge: String(data.challenge || ""),
      architecture: String(data.architecture || ""),
      outcome: String(data.outcome || ""),
      stack: Array.isArray(data.stack) ? data.stack.map(String) : [],
      isReferenceBlueprint: Boolean(data.isReferenceBlueprint),
    };
  });
}

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  const dirPath = path.join(CONTENT_ROOT, "case-studies");
  const candidates = [`${slug}.mdx`, `${slug}.md`];
  for (const candidate of candidates) {
    const fullPath = path.join(dirPath, candidate);
    if (fs.existsSync(fullPath)) {
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: String(data.title || "Untitled Blueprint"),
        industry: String(data.industry || "Enterprise IT"),
        servicePillar: String(data.servicePillar || "Cloud Architecture"),
        duration: String(data.duration || "6 Weeks"),
        thumbnail: String(data.thumbnail || "/assets/case-studies/case-01-thumb.webp"),
        challenge: String(data.challenge || ""),
        architecture: String(data.architecture || ""),
        outcome: String(data.outcome || ""),
        stack: Array.isArray(data.stack) ? data.stack.map(String) : [],
        isReferenceBlueprint: Boolean(data.isReferenceBlueprint),
        content,
      };
    }
  }
  return null;
}

export function getAllInsights(): InsightMeta[] {
  const files = readMdxDirectory("insights");
  return files
    .map((filename) => {
      const filePath = path.join(CONTENT_ROOT, "insights", filename);
      const raw = fs.readFileSync(filePath, "utf8");
      const { data } = matter(raw);
      const slug = (data.slug as string) || filename.replace(/\.mdx?$/, "");
      return {
        slug,
        title: String(data.title || "Untitled Technical Note"),
        summary: String(data.summary || ""),
        date: String(data.date || "2026-11-20"),
        category: String(data.category || "Architecture"),
        readingTime: String(data.readingTime || "5 min read"),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getInsightBySlug(slug: string): Insight | null {
  const dirPath = path.join(CONTENT_ROOT, "insights");
  const candidates = [`${slug}.mdx`, `${slug}.md`];
  for (const candidate of candidates) {
    const fullPath = path.join(dirPath, candidate);
    if (fs.existsSync(fullPath)) {
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: String(data.title || "Untitled Technical Note"),
        summary: String(data.summary || ""),
        date: String(data.date || "2026-11-20"),
        category: String(data.category || "Architecture"),
        readingTime: String(data.readingTime || "5 min read"),
        content,
      };
    }
  }
  return null;
}
