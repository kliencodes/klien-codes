export type TechCategory =
  | "Cloud"
  | "IaC & DevOps"
  | "Security"
  | "Backend"
  | "Data & AI"
  | "Observability";

export interface TechStackItem {
  name: string;
  category: TechCategory;
  role: string;
  relatedServiceSlug: string;
}

export const techCategories: TechCategory[] = [
  "Cloud",
  "IaC & DevOps",
  "Security",
  "Backend",
  "Data & AI",
  "Observability",
];

export const techStackItems: TechStackItem[] = [
  { name: "AWS", category: "Cloud", role: "Multi-region landing zones, EKS, ECS, RDS", relatedServiceSlug: "cloud-architecture" },
  { name: "Google Cloud (GCP)", category: "Cloud", role: "GKE, Cloud Run, BigQuery, IAM", relatedServiceSlug: "cloud-architecture" },
  { name: "Microsoft Azure", category: "Cloud", role: "AKS, Entra ID, Enterprise Networking", relatedServiceSlug: "cloud-architecture" },
  { name: "Cloudflare", category: "Cloud", role: "Edge WAF, Zero-Trust Tunnels, DNS", relatedServiceSlug: "cloud-architecture" },

  { name: "Terraform / OpenTofu", category: "IaC & DevOps", role: "Modular declarative cloud provisioning", relatedServiceSlug: "devops-iac" },
  { name: "Kubernetes", category: "IaC & DevOps", role: "Production container orchestration & GitOps", relatedServiceSlug: "devops-iac" },
  { name: "Docker", category: "IaC & DevOps", role: "Hardened multi-stage container builds", relatedServiceSlug: "devops-iac" },
  { name: "GitHub Actions", category: "IaC & DevOps", role: "Automated CI/CD, OIDC deploys & gates", relatedServiceSlug: "devops-iac" },

  { name: "HashiCorp Vault / KMS", category: "Security", role: "Dynamic secrets & envelope encryption", relatedServiceSlug: "cybersecurity-devsecops" },
  { name: "OIDC & mTLS", category: "Security", role: "Keyless workload identity & service mesh", relatedServiceSlug: "cybersecurity-devsecops" },
  { name: "Trivy & SAST/SBOM", category: "Security", role: "Automated supply-chain vulnerability gates", relatedServiceSlug: "cybersecurity-devsecops" },
  { name: "SOC 2 / ISO 27001 Controls", category: "Security", role: "Technical compliance & audit evidence", relatedServiceSlug: "cybersecurity-devsecops" },

  { name: "TypeScript / Node.js", category: "Backend", role: "High-throughput APIs & full-stack systems", relatedServiceSlug: "software-modernization" },
  { name: "Go", category: "Backend", role: "Low-latency services & infrastructure tooling", relatedServiceSlug: "software-modernization" },
  { name: "PostgreSQL", category: "Backend", role: "Relational modeling, partitioning & tuning", relatedServiceSlug: "software-modernization" },
  { name: "Redis & Kafka", category: "Backend", role: "Caching layers & event-driven backbones", relatedServiceSlug: "software-modernization" },

  { name: "Python", category: "Data & AI", role: "ETL pipelines, AI orchestration & evals", relatedServiceSlug: "data-ai-infrastructure" },
  { name: "pgvector / Vector DBs", category: "Data & AI", role: "Hybrid semantic + relational retrieval", relatedServiceSlug: "data-ai-infrastructure" },
  { name: "dbt & Data Warehouses", category: "Data & AI", role: "Tested analytical transformations", relatedServiceSlug: "data-ai-infrastructure" },

  { name: "OpenTelemetry", category: "Observability", role: "Vendor-neutral traces, metrics & logs", relatedServiceSlug: "devops-iac" },
  { name: "Prometheus & Grafana", category: "Observability", role: "SLO dashboards & alert routing", relatedServiceSlug: "devops-iac" },
  { name: "Datadog / Sentry", category: "Observability", role: "APM, error tracking & incident triage", relatedServiceSlug: "devops-iac" },
];
