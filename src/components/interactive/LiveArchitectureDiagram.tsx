"use client";

import { useState } from "react";
import { Activity, Database, Globe, Server, ShieldCheck } from "lucide-react";

interface ArchNode {
  id: string;
  label: string;
  sublabel: string;
  layer: string;
  spec: string;
  security: string;
  slo: string;
  x: number;
  y: number;
}

const nodes: ArchNode[] = [
  {
    id: "edge",
    label: "Edge / WAF",
    sublabel: "Global CDN",
    layer: "LAYER 01 // PERIMETER",
    spec: "Cloudflare Edge + Rate Limiting + DDoS",
    security: "TLS 1.3 · Managed WAF Rules",
    slo: "Global Anycast Routing",
    x: 68,
    y: 78,
  },
  {
    id: "gateway",
    label: "API Gateway",
    sublabel: "Zero-Trust Mesh",
    layer: "LAYER 02 // INGRESS",
    spec: "OIDC Auth · Request Validation · Circuit Breakers",
    security: "mTLS Service-to-Service",
    slo: "Stateless Horizontal Scale",
    x: 242,
    y: 78,
  },
  {
    id: "cluster",
    label: "Cloud Cluster",
    sublabel: "Multi-AZ IaC",
    layer: "LAYER 03 // COMPUTE",
    spec: "Terraform-Provisioned EKS / ECS + Auto-Scaling",
    security: "Signed Containers · Non-Root",
    slo: "Zero-Downtime Blue/Green",
    x: 68,
    y: 198,
  },
  {
    id: "data",
    label: "Zero-Trust DB",
    sublabel: "Encrypted + Telemetry",
    layer: "LAYER 04 // STATE & O11Y",
    spec: "PostgreSQL Multi-AZ · Redis · OpenTelemetry",
    security: "KMS Envelope Encryption · Private Subnet",
    slo: "Automated Point-in-Time Recovery",
    x: 242,
    y: 198,
  },
];

export function LiveArchitectureDiagram() {
  const [selectedId, setSelectedId] = useState<string>("cluster");
  const active = nodes.find((n) => n.id === selectedId) || nodes[0];

  const getIcon = (id: string) => {
    switch (id) {
      case "edge":
        return <Globe className="h-4 w-4" />;
      case "gateway":
        return <ShieldCheck className="h-4 w-4" />;
      case "cluster":
        return <Server className="h-4 w-4" />;
      default:
        return <Database className="h-4 w-4" />;
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-5 shadow-2xl">
      <div className="mb-4 flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
        <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-secondary)]">
          <Activity className="h-3.5 w-3.5 text-[var(--accent-text)]" />
          <span>SYSTEM.TOPOLOGY // INTERACTIVE</span>
        </div>
        <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] px-2.5 py-0.5 font-mono text-[10px] text-[var(--accent-text)]">
          CLICK NODES
        </span>
      </div>

      <div className="bg-blueprint-grid relative rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-3">
        <svg
          viewBox="0 0 380 276"
          className="h-auto w-full"
          role="img"
          aria-label="Interactive cloud architecture topology diagram"
        >
          <defs>
            <linearGradient id="cherryFlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#7F1D1D" />
            </linearGradient>
          </defs>

          <path
            d="M 148 78 L 234 78"
            stroke="url(#cherryFlow)"
            strokeWidth="2"
            strokeDasharray="6 4"
            fill="none"
          />
          <path
            d="M 304 114 L 304 142 L 106 142 L 106 164"
            stroke="url(#cherryFlow)"
            strokeWidth="2"
            strokeDasharray="6 4"
            fill="none"
          />
          <path
            d="M 148 198 L 234 198"
            stroke="url(#cherryFlow)"
            strokeWidth="2"
            strokeDasharray="6 4"
            fill="none"
          />

          {nodes.map((node) => {
            const isSelected = node.id === active.id;
            return (
              <g
                key={node.id}
                onClick={() => setSelectedId(node.id)}
                onMouseEnter={() => setSelectedId(node.id)}
                className="cursor-pointer"
              >
                <rect
                  x={node.x - 56}
                  y={node.y - 34}
                  width="148"
                  height="68"
                  rx="12"
                  fill={isSelected ? "var(--bg-surface-2)" : "var(--bg-surface-1)"}
                  stroke={isSelected ? "var(--accent-primary)" : "var(--border-strong)"}
                  strokeWidth={isSelected ? "2" : "1.2"}
                />
                <circle
                  cx={node.x - 40}
                  cy={node.y - 16}
                  r="3.5"
                  fill={isSelected ? "#DC2626" : "#71717A"}
                />
                <text
                  x={node.x - 28}
                  y={node.y - 12}
                  fill="var(--text-primary)"
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="var(--font-display)"
                >
                  {node.label}
                </text>
                <text
                  x={node.x - 40}
                  y={node.y + 12}
                  fill="var(--text-secondary)"
                  fontSize="10"
                  fontFamily="var(--font-mono)"
                >
                  {node.sublabel}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] p-4 transition-all">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold text-[var(--accent-text)]">
            {getIcon(active.id)}
            {active.layer}
          </span>
          <span className="font-mono text-[10px] text-[var(--text-muted)]">
            IAC: VERIFIED
          </span>
        </div>
        <p className="mt-2 text-xs font-medium text-[var(--text-primary)]">
          {active.spec}
        </p>
        <div className="mt-2.5 grid grid-cols-2 gap-2 border-t border-[var(--border-subtle)] pt-2.5 font-mono text-[11px]">
          <div>
            <span className="block text-[10px] text-[var(--text-muted)]">SECURITY</span>
            <span className="text-[var(--text-secondary)]">{active.security}</span>
          </div>
          <div>
            <span className="block text-[10px] text-[var(--text-muted)]">RESILIENCE</span>
            <span className="text-[var(--text-secondary)]">{active.slo}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
