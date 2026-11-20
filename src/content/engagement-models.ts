export interface EngagementModel {
  id: string;
  name: string;
  badge?: string;
  highlighted?: boolean;
  bestFor: string;
  typicalScope: string;
  pricingDisplay: string;
  deliverables: string[];
  ctaLabel: string;
}

export interface ProcessPhase {
  phase: string;
  title: string;
  duration: string;
  summary: string;
  output: string;
}

export const engagementModels: EngagementModel[] = [
  {
    id: "audit",
    name: "IT & System Checkup",
    bestFor:
      "Businesses that want a clear review of their website, cloud costs, or security before starting a bigger project.",
    typicalScope: "1–2 Weeks",
    pricingDisplay: "Fixed Price",
    deliverables: [
      "Complete health check of your software, cloud, and security",
      "Clear list of issues ranked by priority",
      "Practical 90-day improvement roadmap",
      "Direct walkthrough with Team Klien Codes",
    ],
    ctaLabel: "Ask About a Checkup",
  },
  {
    id: "implementation",
    name: "Full Project Delivery",
    badge: "MOST POPULAR",
    highlighted: true,
    bestFor:
      "Companies building a new platform, migrating to the cloud, or upgrading legacy systems with a dedicated team.",
    typicalScope: "4–12 Weeks",
    pricingDisplay: "Milestone-Based",
    deliverables: [
      "Clear project plan and timeline agreed upfront",
      "Dedicated specialists from our 50+ engineer team",
      "Weekly progress demos and transparent updates",
      "Full code ownership, documentation, and handover",
    ],
    ctaLabel: "Send Project Brief",
  },
  {
    id: "retainer",
    name: "Ongoing Tech Support",
    bestFor:
      "Growing teams that want dependable monthly engineering, cloud care, and IT guidance without hiring full-time.",
    typicalScope: "Monthly Plan",
    pricingDisplay: "Flexible Monthly Retainer",
    deliverables: [
      "Priority access to Team Klien Codes engineers",
      "Regular updates, security patches, and monitoring",
      "Direct email support & priority response",
      "Quarterly performance and cost reviews",
    ],
    ctaLabel: "Inquire About Support",
  },
];

export const processPhases: ProcessPhase[] = [
  {
    phase: "STEP 01",
    title: "Understand Your Needs",
    duration: "Week 1",
    summary:
      "We listen to your goals, review your current setup, and identify what is slowing your business down.",
    output: "Clear Project Scope",
  },
  {
    phase: "STEP 02",
    title: "Plan the Solution",
    duration: "Week 2",
    summary:
      "We map out the exact technology, timeline, and milestones in plain language before writing code.",
    output: "Approved Roadmap",
  },
  {
    phase: "STEP 03",
    title: "Build & Test",
    duration: "Execution",
    summary:
      "Our engineers build your solution in weekly milestones so you can see real progress every step of the way.",
    output: "Tested Production System",
  },
  {
    phase: "STEP 04",
    title: "Launch & Handover",
    duration: "Go-Live",
    summary:
      "We launch smoothly, provide simple guides for your team, and make sure you own 100% of your code and accounts.",
    output: "Full Ownership & Support",
  },
];
