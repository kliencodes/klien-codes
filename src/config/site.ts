export interface SiteConfig {
  temporaryMode: boolean;
  brandName: string;
  shortName: string;
  teamName: string;
  mdName: string;
  mdTitle: string;
  tagline: string;
  description: string;
  domainUrl: string;
  contactEmail: string;
  locationTz: string;
  availabilityStatus: string;
  stats: {
    projectsDelivered: string;
    yearsExperience: string;
    engineersCount: string;
    workModel: string;
  };
  socialLinks: {
    github: string;
    linkedin: string;
    x: string;
  };
  assets: {
    logoDark: string;
    logoLight: string;
    logoMark: string;
    ogDefault: string;
  };
}

/**
 * SINGLE SOURCE OF TRUTH FOR KLIEN CODES
 */
export const siteConfig: SiteConfig = {
  temporaryMode: false,
  brandName: "Klien Codes",
  shortName: "Klien Codes",
  teamName: "Team Klien Codes",
  mdName: "Aarav Mehta", // Shown ONLY at the end of the About message — replace with your name later
  mdTitle: "Managing Director · Klien Codes",
  tagline: "Practical IT Solutions & Software Engineering for Growing Businesses.",
  description:
    "Klien Codes is an Indian IT consultancy with 50+ specialized engineers helping businesses build reliable software, move safely to the cloud, and secure their systems.",
  domainUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://kliencodes.vercel.app",
  contactEmail: "teamkliencodes@gmail.com",
  locationTz: "Offices & Virtual Teams Across India (IST) · Serving Clients Worldwide",
  availabilityStatus: "Open for New Projects",
  stats: {
    projectsDelivered: "100+",
    yearsExperience: "6 Years",
    engineersCount: "50+",
    workModel: "Virtual & In-Office Across India",
  },
  socialLinks: {
    github: "https://github.com/kliencodes",
    linkedin: "https://linkedin.com/company/kliencodes",
    x: "https://x.com/kliencodes",
  },
  assets: {
    logoDark: "/assets/logo/logo-full-dark.svg",
    logoLight: "/assets/logo/logo-full-light.svg",
    logoMark: "/assets/logo/logo-mark.svg",
    ogDefault: "/assets/og/og-default.png",
  },
};
