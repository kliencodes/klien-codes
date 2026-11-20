"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Command, Menu, X } from "lucide-react";
import { mainNav } from "@/config/navigation";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const openCommandPalette = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  return (
    <header className="glass-nav sticky top-0 z-40 border-b border-[var(--border-subtle)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-12">
        <Link
          href="/"
          aria-label="Klien Codes Home"
          className="flex shrink-0 items-center transition-opacity active:opacity-75"
        >
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-all active:scale-[0.97]",
                  active
                    ? "bg-[var(--bg-surface-2)] text-[var(--accent-text)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] hover:text-[var(--text-primary)]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCommandPalette}
            aria-label="Open quick search"
            className="hidden h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] px-2.5 font-mono text-xs text-[var(--text-secondary)] transition-all hover:border-[var(--accent-primary)] hover:text-[var(--text-primary)] active:scale-95 xl:inline-flex"
          >
            <Command className="h-3.5 w-3.5" />
            <span>K</span>
          </button>

          <ThemeToggle />

          <Link
            href="/contact"
            className="hidden h-10 items-center gap-1.5 rounded-lg bg-[var(--accent-primary)] px-4 text-sm font-semibold text-[#FAFAFA] transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-primary-hover)] active:scale-[0.97] sm:inline-flex"
          >
            <span>Contact Us</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] text-[var(--text-primary)] lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)] px-4 py-4 sm:px-6 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {mainNav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex min-h-[44px] items-center rounded-lg px-3.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-[var(--bg-surface-2)] text-[var(--accent-text)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] hover:text-[var(--text-primary)]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-3 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[var(--accent-primary)] px-4 text-sm font-semibold text-[#FAFAFA]"
            >
              <span>Contact Team Klien Codes</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
