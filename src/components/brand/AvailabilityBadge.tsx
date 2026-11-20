import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface AvailabilityBadgeProps {
  className?: string;
  showSuffix?: boolean;
}

export function AvailabilityBadge({
  className,
  showSuffix = false,
}: AvailabilityBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] px-3.5 py-1.5 font-mono text-xs font-medium tracking-wider text-[var(--text-secondary)] uppercase",
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-status-dot absolute inline-flex h-full w-full rounded-full bg-[var(--status-success)] opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--status-success)]" />
      </span>
      <span className="text-[var(--text-primary)]">
        {siteConfig.availabilityStatus}
      </span>
      {showSuffix && (
        <span className="hidden text-[var(--text-muted)] sm:inline">
          · INDEPENDENT IT CONSULTANCY
        </span>
      )}
    </div>
  );
}
