export default function Loading() {
  return (
    <div className="mx-auto flex min-h-[55vh] max-w-7xl flex-col items-center justify-center px-6 py-24">
      <div className="w-56 overflow-hidden rounded-full bg-[var(--bg-surface-2)] p-0.5">
        <div className="animate-loading-bar h-1 w-1/3 rounded-full bg-[var(--accent-primary)]" />
      </div>
      <p className="mt-4 font-mono text-xs tracking-widest text-[var(--text-muted)] uppercase">
        LOADING // MODULE
      </p>
    </div>
  );
}
