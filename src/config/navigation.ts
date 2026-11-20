export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export const mainNav: NavItem[] = [
  { label: "Home", href: "/", description: "Overview of Klien Codes" },
  { label: "Services", href: "/services", description: "What we build and support" },
  { label: "Work", href: "/work", description: "Sample projects & solutions" },
  { label: "Achievements", href: "/achievements", description: "100+ projects & 50+ engineers" },
  { label: "About", href: "/about", description: "Our story & team across India" },
  { label: "Insights", href: "/insights", description: "Helpful IT guides & checklists" },
];

export const footerColumns = {
  services: [
    { label: "Cloud Setup & Migration", href: "/services/cloud-architecture" },
    { label: "DevOps & Automation", href: "/services/devops-iac" },
    { label: "Cybersecurity & Data Safety", href: "/services/cybersecurity-devsecops" },
    { label: "Web & Software Modernization", href: "/services/software-modernization" },
    { label: "Data & AI Solutions", href: "/services/data-ai-infrastructure" },
    { label: "IT Strategy & Audits", href: "/services/fractional-cto-audits" },
  ],
  company: [
    { label: "Home", href: "/" },
    { label: "Our Work", href: "/work" },
    { label: "Achievements", href: "/achievements" },
    { label: "About Klien Codes", href: "/about" },
    { label: "Insights", href: "/insights" },
    { label: "Contact Us", href: "/contact" },
  ],
};
