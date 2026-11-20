import { z } from "zod";
import { siteConfig } from "@/config/site";
import { faqItems } from "@/content/faq";

export const quickQuerySchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  query: z
    .string()
    .min(10, "Please write a short message (at least 10 characters).")
    .max(2000, "Please keep your message under 2,000 characters."),
  website: z.string().max(0).optional(),
});

export type QuickQueryValues = z.infer<typeof quickQuerySchema>;

export const contactFormSchema = z.object({
  services: z.array(z.string()).min(1, "Select at least one service."),
  engagementModel: z.string().min(1, "Select how you'd like to work together."),
  timeline: z.string().min(1, "Select your expected timeline."),
  budgetRange: z.string().min(1, "Select an estimated budget range."),
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  company: z.string().optional(),
  brief: z
    .string()
    .min(15, "Please share a short summary of what you need.")
    .max(3000, "Please keep the brief under 3,000 characters."),
  website: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.brandName,
    url: siteConfig.domainUrl,
    email: siteConfig.contactEmail,
    description: siteConfig.description,
    areaServed: "Worldwide",
  };
}

export function getFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
