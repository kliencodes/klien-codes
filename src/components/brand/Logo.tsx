"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  compact?: boolean;
  className?: string;
}

export function Logo({ compact = false, className }: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = mounted && resolvedTheme === "light";
  const src = compact
    ? siteConfig.assets.logoMark
    : isLight
      ? siteConfig.assets.logoLight
      : siteConfig.assets.logoDark;

  if (imgError) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-2 font-mono text-sm font-semibold tracking-wider text-[var(--text-primary)]",
          className
        )}
      >
        <span className="text-[var(--accent-primary)]">&gt;</span>
        {siteConfig.shortName.toUpperCase()}
        <span className="text-[var(--accent-primary)]">_</span>
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={siteConfig.brandName}
      width={compact ? 36 : 210}
      height={compact ? 36 : 34}
      onError={() => setImgError(true)}
      className={cn(compact ? "h-9 w-9" : "h-8 w-auto", className)}
    />
  );
}
