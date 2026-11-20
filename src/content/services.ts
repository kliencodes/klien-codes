export interface ServiceItem {
  id: string;
  index: string;
  slug: string;
  title: string;
  shortSummary: string;
  fullDescription: string;
  iconName:
    | "Cloud"
    | "GitBranch"
    | "ShieldCheck"
    | "Cpu"
    | "Database"
    | "Compass";
  featured: boolean;
  deliverables: string[];
  techStack: string[];
  idealFor: string[];
  typicalTimeline: string;
  sampleArchitectureSteps: string[];
}

export const services: ServiceItem[] = [
  {
    id: "cloud-architecture",
    index: "01",
    slug: "cloud-architecture",
    title: "Cloud Setup & Migration",
    shortSummary:
      "Move your websites, apps, and business data to AWS, Azure, or Google Cloud safely—with lower monthly bills and zero downtime.",
    fullDescription:
      "Whether your business is moving away from slow legacy servers or trying to cut unpredictable cloud bills, Team Klien Codes plans and executes smooth cloud setups built for everyday reliability.",
    iconName: "Cloud",
    featured: true,
    deliverables: [
      "Full review of your current servers and cloud costs",
      "Clean, secure AWS, Azure, or Google Cloud setup",
      "Step-by-step migration with zero business interruption",
      "Ongoing cost-saving and backup setup",
    ],
    techStack: ["AWS", "Azure", "Google Cloud", "Cloudflare"],
    idealFor: [
      "Businesses outgrowing slow or unreliable hosting",
      "Companies paying too much for unoptimized cloud bills",
      "Teams needing dependable backups and uptime",
    ],
    typicalTimeline: "2–6 Weeks",
    sampleArchitectureSteps: [
      "Review your current servers, traffic, and monthly spend",
      "Design a clean, secure cloud setup tailored to your budget",
      "Test everything in a staging environment before going live",
      "Switch traffic smoothly and hand over full documentation",
    ],
  },
  {
    id: "software-modernization",
    index: "02",
    slug: "software-modernization",
    title: "Web & Software Development",
    shortSummary:
      "Build fast, modern web applications or upgrade slow, outdated software so your team and customers can work without friction.",
    fullDescription:
      "Old software slows down your staff and frustrates customers. Our engineers build clean web platforms, business portals, and APIs—or upgrade existing systems piece by piece without disrupting operations.",
    iconName: "Cpu",
    featured: true,
    deliverables: [
      "Custom web applications, portals, and dashboards",
      "Speed and database performance improvements",
      "Safe upgrades for older software systems",
      "Clean, easy-to-maintain code your team owns",
    ],
    techStack: ["Next.js", "React", "Node.js", "PostgreSQL"],
    idealFor: [
      "Companies launching a new digital product or customer portal",
      "Teams tired of slow, crash-prone legacy tools",
      "Growing businesses needing reliable integrations",
    ],
    typicalTimeline: "3–10 Weeks",
    sampleArchitectureSteps: [
      "Map out user workflows and pinpoint what is slowing you down",
      "Agree on a clear milestone plan and clean UI layout",
      "Build, test, and review progress with you every week",
      "Launch smoothly and train your staff on the new system",
    ],
  },
  {
    id: "cybersecurity-devsecops",
    index: "03",
    slug: "cybersecurity-devsecops",
    title: "Cybersecurity & Data Safety",
    shortSummary:
      "Protect your business accounts, customer data, and servers with practical security checks, access controls, and compliance prep.",
    fullDescription:
      "Security should be clear and practical, not confusing. We audit your cloud accounts, lock down risky permissions, secure your code deployments, and help you pass client security questionnaires.",
    iconName: "ShieldCheck",
    featured: false,
    deliverables: [
      "Security checkup across websites, apps, and cloud accounts",
      "Proper user access roles and secret management",
      "Automated vulnerability scanning on every code update",
      "Readiness support for SOC 2 and ISO 27001 audits",
    ],
    techStack: ["Zero-Trust", "WAF", "SSL/TLS", "Compliance"],
    idealFor: [
      "Companies handling sensitive customer or financial data",
      "B2B teams answering enterprise client security checklists",
      "Businesses wanting peace of mind against common attacks",
    ],
    typicalTimeline: "2–4 Weeks",
    sampleArchitectureSteps: [
      "Scan your servers, apps, and permissions for weak spots",
      "Fix high-priority risks and remove exposed credentials",
      "Add automated security checks before code goes live",
      "Provide a clear security report for leadership and clients",
    ],
  },
  {
    id: "devops-iac",
    index: "04",
    slug: "devops-iac",
    title: "DevOps & Automation",
    shortSummary:
      "Automate software releases, server backups, and uptime alerts so your team spends time building instead of fixing deployments.",
    fullDescription:
      "Manual updates lead to mistakes and late-night emergencies. We set up automated deployment pipelines, repeatable server templates, and clear health dashboards so updates go live smoothly.",
    iconName: "GitBranch",
    featured: false,
    deliverables: [
      "One-click automated testing and deployment pipelines",
      "Repeatable server setup using Terraform & Docker",
      "Live uptime monitoring and instant error alerts",
      "Simple recovery playbooks for your team",
    ],
    techStack: ["Docker", "Kubernetes", "Terraform", "GitHub Actions"],
    idealFor: [
      "Teams wasting hours on manual deployments",
      "Apps that break unexpectedly after routine updates",
      "Growing engineering teams needing consistent environments",
    ],
    typicalTimeline: "2–5 Weeks",
    sampleArchitectureSteps: [
      "Review how your team currently tests and ships updates",
      "Automate builds, tests, and safe staging previews",
      "Set up live alerts so issues are caught before users notice",
      "Walk your engineers through the new workflow",
    ],
  },
  {
    id: "data-ai-infrastructure",
    index: "05",
    slug: "data-ai-infrastructure",
    title: "Data & Practical AI Tools",
    shortSummary:
      "Connect scattered business data into clear reports and build useful, privacy-safe AI assistants for your team or customers.",
    fullDescription:
      "Skip the AI hype and focus on tools that actually save hours every week. We organize your company data cleanly and build reliable search, reporting, and AI automation with strict privacy controls.",
    iconName: "Database",
    featured: false,
    deliverables: [
      "Automated data pipelines and business dashboards",
      "Private AI document search and customer support tools",
      "Strict data privacy and monthly usage cost caps",
      "Accuracy testing before anything reaches customers",
    ],
    techStack: ["Python", "PostgreSQL", "Analytics", "AI APIs"],
    idealFor: [
      "Teams drowning in spreadsheets and disconnected tools",
      "Businesses wanting safe, practical AI automation",
      "Leaders needing clear, real-time operational reporting",
    ],
    typicalTimeline: "3–6 Weeks",
    sampleArchitectureSteps: [
      "Identify repetitive workflows and scattered data sources",
      "Build clean, reliable data connections and storage",
      "Test AI or analytics outputs against real company questions",
      "Launch with clear usage monitoring and privacy guardrails",
    ],
  },
  {
    id: "fractional-cto-audits",
    index: "06",
    slug: "fractional-cto-audits",
    title: "IT Strategy & Consulting",
    shortSummary:
      "Honest, senior technical guidance for founders and business leaders—helping you choose the right tools, vendors, and roadmap.",
    fullDescription:
      "Not sure if an agency quote is fair, or which technology fits your next phase? Team Klien Codes gives you straightforward technical advice, project audits, and ongoing IT leadership support.",
    iconName: "Compass",
    featured: false,
    deliverables: [
      "Clear IT audit and 90-day improvement plan",
      "Unbiased vendor, software, and quote reviews",
      "Ongoing monthly technical guidance for leadership",
      "Support with hiring and structuring tech teams",
    ],
    techStack: ["IT Audits", "Roadmaps", "Vendor Review", "Advisory"],
    idealFor: [
      "Non-technical founders who want a trusted tech partner",
      "Companies planning a major software investment",
      "Leaders needing a clear second opinion before signing contracts",
    ],
    typicalTimeline: "1-Week Audit or Monthly Support",
    sampleArchitectureSteps: [
      "Listen to your business goals, timeline, and budget",
      "Review your existing tech setup, team, or vendor proposals",
      "Deliver a plain-English action plan with clear priorities",
      "Stay available as your ongoing technical partner",
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return services.find((service) => service.slug === slug);
}
