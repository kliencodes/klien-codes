"use client";

import { useState } from "react";
import { Database, FileText, Loader2, Lock, MessageSquare, RefreshCw } from "lucide-react";
import type { StoredBrief, StoredQuery } from "@/lib/db";

export default function AdminInboxPage() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [storage, setStorage] = useState("");
  const [queries, setQueries] = useState<StoredQuery[]>([]);
  const [briefs, setBriefs] = useState<StoredBrief[]>([]);
  const [tab, setTab] = useState<"queries" | "briefs">("queries");

  const fetchLeads = async (pwd: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwd }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Unable to unlock inbox.");
      }
      setStorage(json.storage || "");
      setQueries(json.queries || []);
      setBriefs(json.briefs || []);
      setUnlocked(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads(password);
  };

  if (!unlocked) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6 sm:p-8">
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent-text)]">
            <Lock className="h-4 w-4" />
            <span>KLIEN CODES // PRIVATE INBOX</span>
          </div>
          <h1 className="mt-3 font-display text-2xl font-bold text-[var(--text-primary)]">
            Admin Submissions
          </h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Enter your <code className="font-mono text-xs">ADMIN_PASSWORD</code>{" "}
            to view saved Quick Queries and Project Briefs.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              required
              className="h-11 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-3.5 text-sm text-[var(--text-primary)]"
            />
            {error && (
              <p className="text-xs text-[var(--status-error)]">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[var(--accent-primary)] text-sm font-semibold text-[#FAFAFA] hover:bg-[var(--accent-primary-hover)] disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Unlock Inbox"}
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-12">
      <div className="flex flex-col justify-between gap-4 border-b border-[var(--border-subtle)] pb-6 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent-text)]">
            <Database className="h-3.5 w-3.5" />
            <span>STORAGE: {storage.toUpperCase()}</span>
          </div>
          <h1 className="mt-1 font-display text-3xl font-bold text-[var(--text-primary)]">
            Klien Codes Submissions
          </h1>
        </div>

        <button
          type="button"
          onClick={() => fetchLeads(password)}
          disabled={loading}
          className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface-1)] px-4 text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent-primary)]"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="mt-6 inline-flex gap-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] p-1">
        <button
          type="button"
          onClick={() => setTab("queries")}
          className={`inline-flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold ${
            tab === "queries"
              ? "bg-[var(--accent-primary)] text-[#FAFAFA]"
              : "text-[var(--text-secondary)]"
          }`}
        >
          <MessageSquare className="h-3.5 w-3.5" />
          <span>Quick Queries ({queries.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setTab("briefs")}
          className={`inline-flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold ${
            tab === "briefs"
              ? "bg-[var(--accent-primary)] text-[#FAFAFA]"
              : "text-[var(--text-secondary)]"
          }`}
        >
          <FileText className="h-3.5 w-3.5" />
          <span>Project Briefs ({briefs.length})</span>
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {tab === "queries" ? (
          queries.length === 0 ? (
            <p className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-8 text-center text-sm text-[var(--text-muted)]">
              No quick queries submitted yet.
            </p>
          ) : (
            queries.map((q) => (
              <div
                key={q.id}
                className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[var(--text-muted)]">
                  <span className="text-[var(--accent-text)]">{q.id}</span>
                  <span>{new Date(q.createdAt).toLocaleString()}</span>
                </div>
                <h2 className="mt-2 font-display text-lg font-semibold text-[var(--text-primary)]">
                  {q.name}{" "}
                  <span className="font-mono text-xs font-normal text-[var(--text-secondary)]">
                    &lt;{q.email}&gt;
                  </span>
                </h2>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-[var(--text-secondary)]">
                  {q.query}
                </p>
              </div>
            ))
          )
        ) : briefs.length === 0 ? (
          <p className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-8 text-center text-sm text-[var(--text-muted)]">
            No project briefs submitted yet.
          </p>
        ) : (
          briefs.map((b) => (
            <div
              key={b.id}
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[var(--text-muted)]">
                <span className="text-[var(--accent-text)]">{b.id}</span>
                <span>{new Date(b.createdAt).toLocaleString()}</span>
              </div>
              <h2 className="mt-2 font-display text-lg font-semibold text-[var(--text-primary)]">
                {b.name} {b.company ? `(${b.company})` : ""}{" "}
                <span className="font-mono text-xs font-normal text-[var(--text-secondary)]">
                  &lt;{b.email}&gt;
                </span>
              </h2>
              <div className="mt-3 flex flex-wrap gap-2 font-mono text-[11px]">
                <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] px-2.5 py-0.5 text-[var(--text-primary)]">
                  {b.engagementModel}
                </span>
                <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] px-2.5 py-0.5 text-[var(--text-secondary)]">
                  {b.timeline}
                </span>
                <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] px-2.5 py-0.5 text-[var(--accent-text)]">
                  {b.budgetRange}
                </span>
              </div>
              <p className="mt-2 text-xs text-[var(--text-muted)]">
                Services: {b.services.join(", ")}
              </p>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-[var(--text-secondary)]">
                {b.brief}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
