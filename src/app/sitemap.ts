import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { getAllCaseStudies, getAllInsights } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.domainUrl;
  const staticRoutes = [
    "",
    "/services",
    "/work",
    "/achievements",
    "/process",
    "/about",
    "/insights",
    "/contact",
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: new Date(),
  }));

  const workRoutes = getAllCaseStudies().map((c) => ({
    url: `${base}/work/${c.slug}`,
    lastModified: new Date(),
  }));

  const insightRoutes = getAllInsights().map((i) => ({
    url: `${base}/insights/${i.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...serviceRoutes, ...workRoutes, ...insightRoutes];
}
