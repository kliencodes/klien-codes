"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  techCategories,
  techStackItems,
  type TechCategory,
} from "@/content/tech-stack";

export function TechStackMatrix() {
  const [selected, setSelected] = useState<TechCategory | "All">("All");

  const visibleItems =
    selected === "All"
      ? techStackItems
      : techStackItems.filter((item) => item.category === selected);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(["All", ...techCategories] as const).map((category) => {
          const active = selected === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelected(category)}
              className={`cursor-pointer rounded-full border px-3.5 py-1.5 font-mono text-xs transition-all active:scale-95 ${
                active
                  ? "border-[var(--accent-primary)] bg-[var(--accent-primary)] font-semibold text-[#FAFAFA]"
                  : "border-[var(--border-subtle)] bg-[var(--bg-surface-1)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visibleItems.map((item) => (
          <motion.div
            layout
            key={`${item.category}-${item.name}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
          >
            <Link
              href={`/services/${item.relatedServiceSlug}`}
              className="group flex h-full flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-4 transition-all hover:border-[var(--accent-primary)] active:scale-[0.99]"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-mono text-[10px] tracking-wider text-[var(--accent-text)] uppercase">
                    {item.category}
                  </span>
                  <h4 className="mt-1 font-display text-base font-semibold text-[var(--text-primary)]">
                    {item.name}
                  </h4>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent-text)]" />
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                {item.role}
              </p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
