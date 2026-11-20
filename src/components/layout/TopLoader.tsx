"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function TopLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hideRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (hideRef.current) clearTimeout(hideRef.current);
  };

  // Finish bar whenever route actually changes
  useEffect(() => {
    if (!visible) return;
    clearTimers();
    setProgress(100);
    hideRef.current = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 260);
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  // Listen for clicks on any internal <a> link to trigger instant feedback
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
        return;
      }
      const target = (e.target as HTMLElement | null)?.closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        target.target === "_blank"
      ) {
        return;
      }

      try {
        const nextUrl = new URL(href, window.location.href);
        const currentUrl = new URL(window.location.href);
        if (
          nextUrl.origin === currentUrl.origin &&
          (nextUrl.pathname !== currentUrl.pathname ||
            nextUrl.search !== currentUrl.search)
        ) {
          clearTimers();
          setVisible(true);
          setProgress(22);
          timerRef.current = setInterval(() => {
            setProgress((prev) => {
              if (prev >= 88) return prev;
              return prev + Math.max(2, (90 - prev) * 0.16);
            });
          }, 140);
        }
      } catch {
        // ignore invalid hrefs
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
      clearTimers();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px] bg-transparent"
    >
      <div
        className="h-full bg-gradient-to-r from-[#991B1B] via-[#DC2626] to-[#F87171] shadow-[0_0_12px_rgba(220,38,38,0.85)] transition-[width] duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
