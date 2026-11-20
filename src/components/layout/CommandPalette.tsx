"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  ArrowRight,
  Check,
  Copy,
  Mail,
  Moon,
  Search,
  Send,
  Sun,
  Terminal,
  X,
} from "lucide-react";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { copyToClipboard } from "@/lib/utils";

interface PaletteItem {
  id: string;
  group: "Pages" | "Services" | "Quick Actions";
  label: string;
  hint: string;
  action: () => void;
}

export function CommandPalette() {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onCustomOpen = () => setOpen(true);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-command-palette", onCustomOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-palette", onCustomOpen);
    };
  }, []);

  const items: PaletteItem[] = useMemo(() => {
    const pageItems: PaletteItem[] = [
      ...mainNav.map((item) => ({
        id: `page-${item.href}`,
        group: "Pages" as const,
        label: item.label,
        hint: item.description || item.href,
        action: () => {
          router.push(item.href);
          setOpen(false);
        },
      })),
      {
        id: "page-contact",
        group: "Pages",
        label: "Contact Team Klien Codes",
        hint: "/contact",
        action: () => {
          router.push("/contact");
          setOpen(false);
        },
      },
    ];

    const serviceItems: PaletteItem[] = services.map((service) => ({
      id: `service-${service.slug}`,
      group: "Services",
      label: service.title,
      hint: service.typicalTimeline,
      action: () => {
        router.push(`/services/${service.slug}`);
        setOpen(false);
      },
    }));

    const quickActions: PaletteItem[] = [
      {
        id: "action-query",
        group: "Quick Actions",
        label: "Send a Quick Query",
        hint: "Contact",
        action: () => {
          router.push("/contact?tab=query");
          setOpen(false);
        },
      },
      {
        id: "action-email",
        group: "Quick Actions",
        label: `Email ${siteConfig.teamName}`,
        hint: "Direct",
        action: () => {
          window.location.href = `mailto:${siteConfig.contactEmail}`;
          setOpen(false);
        },
      },
      {
        id: "action-copy-email",
        group: "Quick Actions",
        label: copied ? "Email Copied" : `Copy ${siteConfig.contactEmail}`,
        hint: "Clipboard",
        action: async () => {
          const ok = await copyToClipboard(siteConfig.contactEmail);
          if (ok) {
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          }
        },
      },
      {
        id: "action-toggle-theme",
        group: "Quick Actions",
        label: resolvedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
        hint: "Theme",
        action: () => {
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
          setOpen(false);
        },
      },
    ];

    return [...quickActions, ...pageItems, ...serviceItems];
  }, [copied, resolvedTheme, router, setTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.hint.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q)
    );
  }, [items, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  if (!open) return null;

  const handleListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (filtered.length ? (prev + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0
      );
    } else if (e.key === "Enter" && filtered[activeIndex]) {
      e.preventDefault();
      filtered[activeIndex].action();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 px-4 pt-[12vh] backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Quick navigation"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface-1)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleListKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] px-4 py-3.5">
          <Search className="h-4 w-4 shrink-0 text-[var(--accent-text)]" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, services, or contact..."
            className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close search"
            className="rounded-md p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center text-xs text-[var(--text-muted)]">
              No matching pages found.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const active = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={item.action}
                  className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                    active
                      ? "bg-[var(--bg-surface-2)] text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)]"
                  }`}
                >
                  <span className="flex items-center gap-2.5 truncate">
                    {item.id === "action-copy-email" ? (
                      copied ? (
                        <Check className="h-4 w-4 text-[var(--status-success)]" />
                      ) : (
                        <Copy className="h-4 w-4 text-[var(--accent-text)]" />
                      )
                    ) : item.id === "action-email" ? (
                      <Mail className="h-4 w-4 text-[var(--accent-text)]" />
                    ) : item.id === "action-query" ? (
                      <Send className="h-4 w-4 text-[var(--accent-text)]" />
                    ) : item.id === "action-toggle-theme" ? (
                      resolvedTheme === "dark" ? (
                        <Sun className="h-4 w-4 text-[var(--accent-text)]" />
                      ) : (
                        <Moon className="h-4 w-4 text-[var(--accent-text)]" />
                      )
                    ) : (
                      <Terminal className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                    )}
                    <span className="truncate font-medium">{item.label}</span>
                  </span>
                  <span className="ml-3 flex shrink-0 items-center gap-2 font-mono text-[11px] text-[var(--text-muted)]">
                    <span className="hidden sm:inline">{item.hint}</span>
                    {active && <ArrowRight className="h-3.5 w-3.5 text-[var(--accent-text)]" />}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
