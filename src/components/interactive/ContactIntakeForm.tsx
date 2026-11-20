"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Loader2,
  MessageSquare,
  Send,
} from "lucide-react";
import {
  contactFormSchema,
  quickQuerySchema,
  type ContactFormValues,
  type QuickQueryValues,
} from "@/lib/schema";
import { services } from "@/content/services";
import { engagementModels } from "@/content/engagement-models";
import { siteConfig } from "@/config/site";

const timelines = ["As Soon As Possible", "Within 30 Days", "1–3 Months", "Just Exploring"];
const budgetBands = ["Under $2k / ₹1.5L", "$2k – $10k", "$10k – $25k", "$25k+ / Monthly"];

export function ContactIntakeForm() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "brief" || searchParams.get("model") ? "brief" : "query";
  const initialModel = searchParams.get("model") || "implementation";

  const [activeTab, setActiveTab] = useState<"query" | "brief">(initialTab);

  // Quick Query State
  const [queryStatus, setQueryStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [queryError, setQueryError] = useState("");
  const [queryRefId, setQueryRefId] = useState("");

  const queryForm = useForm<QuickQueryValues>({
    resolver: zodResolver(quickQuerySchema),
    defaultValues: { name: "", email: "", query: "", website: "" },
  });

  const onSubmitQuery = async (data: QuickQueryValues) => {
    setQueryStatus("submitting");
    setQueryError("");
    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Could not submit query.");
      setQueryRefId(json.id || "");
      setQueryStatus("success");
      queryForm.reset();
    } catch (err) {
      setQueryStatus("error");
      setQueryError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  // Detailed Brief State
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [briefStatus, setBriefStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [briefError, setBriefError] = useState("");
  const [briefRefId, setBriefRefId] = useState("");

  const briefForm = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      services: ["Cloud Setup & Migration"],
      engagementModel:
        engagementModels.find((m) => m.id === initialModel)?.name ||
        "Full Project Delivery",
      timeline: "Within 30 Days",
      budgetRange: "$2k – $10k",
      name: "",
      email: "",
      company: "",
      brief: "",
      website: "",
    },
  });

  const selectedServices = briefForm.watch("services");
  const selectedModel = briefForm.watch("engagementModel");
  const selectedTimeline = briefForm.watch("timeline");
  const selectedBudget = briefForm.watch("budgetRange");

  const toggleService = (title: string) => {
    const exists = selectedServices.includes(title);
    const updated = exists
      ? selectedServices.filter((s) => s !== title)
      : [...selectedServices, title];
    briefForm.setValue("services", updated, { shouldValidate: true });
  };

  const nextStep = async () => {
    if (step === 1) {
      const ok = await briefForm.trigger(["services"]);
      if (ok) setStep(2);
    } else if (step === 2) {
      const ok = await briefForm.trigger(["engagementModel", "timeline", "budgetRange"]);
      if (ok) setStep(3);
    }
  };

  const onSubmitBrief = async (data: ContactFormValues) => {
    setBriefStatus("submitting");
    setBriefError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Could not submit brief.");
      setBriefRefId(json.id || "");
      setBriefStatus("success");
      briefForm.reset();
    } catch (err) {
      setBriefStatus("error");
      setBriefError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-5 sm:p-8">
      {/* 2 Clean In-House Tabs */}
      <div className="mb-7 grid grid-cols-2 gap-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] p-1 sm:inline-flex">
        <button
          type="button"
          onClick={() => setActiveTab("query")}
          className={`inline-flex min-h-[42px] cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all active:scale-95 ${
            activeTab === "query"
              ? "bg-[var(--accent-primary)] text-[#FAFAFA]"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
        >
          <MessageSquare className="h-3.5 w-3.5" />
          <span>Quick Query</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("brief")}
          className={`inline-flex min-h-[42px] cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all active:scale-95 ${
            activeTab === "brief"
              ? "bg-[var(--accent-primary)] text-[#FAFAFA]"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
        >
          <FileText className="h-3.5 w-3.5" />
          <span>Project Brief</span>
        </button>
      </div>

      {/* TAB 1: QUICK QUERY */}
      {activeTab === "query" ? (
        queryStatus === "success" ? (
          <div className="space-y-4 rounded-xl border border-[var(--status-success)]/40 bg-[var(--bg-surface-2)] p-6 text-center sm:p-8">
            <CheckCircle2 className="mx-auto h-10 w-10 text-[var(--status-success)]" />
            <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
              Query Saved
            </h3>
            <p className="mx-auto max-w-md text-sm text-[var(--text-secondary)]">
              Thank you! {siteConfig.teamName} has received your query
              {queryRefId ? ` (Ref: ${queryRefId})` : ""} and will contact you
              within 1 business day.
            </p>
            <button
              type="button"
              onClick={() => setQueryStatus("idle")}
              className="mt-2 inline-flex min-h-[42px] cursor-pointer items-center rounded-lg border border-[var(--border-strong)] px-4 text-xs font-medium text-[var(--text-primary)] hover:border-[var(--accent-primary)]"
            >
              Send Another Query
            </button>
          </div>
        ) : (
          <form
            onSubmit={queryForm.handleSubmit(onSubmitQuery)}
            className="space-y-4"
            noValidate
          >
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...queryForm.register("website")}
              className="hidden"
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">
                  Your Name *
                </label>
                <input
                  {...queryForm.register("name")}
                  placeholder="Your full name"
                  className="h-11 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                />
                {queryForm.formState.errors.name && (
                  <p className="mt-1 text-xs text-[var(--status-error)]">
                    {queryForm.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">
                  Email Address *
                </label>
                <input
                  type="email"
                  {...queryForm.register("email")}
                  placeholder="you@company.com"
                  className="h-11 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                />
                {queryForm.formState.errors.email && (
                  <p className="mt-1 text-xs text-[var(--status-error)]">
                    {queryForm.formState.errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">
                Your Query *
              </label>
              <textarea
                rows={4}
                {...queryForm.register("query")}
                placeholder="Tell Team Klien Codes what you need help with..."
                className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-canvas)] p-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
              />
              {queryForm.formState.errors.query && (
                <p className="mt-1 text-xs text-[var(--status-error)]">
                  {queryForm.formState.errors.query.message}
                </p>
              )}
            </div>

            {queryStatus === "error" && (
              <div className="flex items-center gap-2 rounded-xl border border-[var(--status-error)]/40 bg-[var(--status-error)]/10 px-4 py-3 text-xs text-[var(--status-error)]">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{queryError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={queryStatus === "submitting"}
              className="inline-flex min-h-[46px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[var(--accent-primary)] px-6 text-sm font-semibold text-[#FAFAFA] transition-all hover:bg-[var(--accent-primary-hover)] active:scale-[0.98] disabled:opacity-60 sm:w-auto"
            >
              {queryStatus === "submitting" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving Query...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Submit Query</span>
                </>
              )}
            </button>
          </form>
        )
      ) : briefStatus === "success" ? (
        <div className="space-y-4 rounded-xl border border-[var(--status-success)]/40 bg-[var(--bg-surface-2)] p-6 text-center sm:p-8">
          <CheckCircle2 className="mx-auto h-10 w-10 text-[var(--status-success)]" />
          <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
            Project Brief Saved
          </h3>
          <p className="mx-auto max-w-md text-sm text-[var(--text-secondary)]">
            Thank you! {siteConfig.teamName} has received your project brief
            {briefRefId ? ` (Ref: ${briefRefId})` : ""} and will reply within 1
            business day.
          </p>
          <button
            type="button"
            onClick={() => {
              setBriefStatus("idle");
              setStep(1);
            }}
            className="mt-2 inline-flex min-h-[42px] cursor-pointer items-center rounded-lg border border-[var(--border-strong)] px-4 text-xs font-medium text-[var(--text-primary)] hover:border-[var(--accent-primary)]"
          >
            Send Another Brief
          </button>
        </div>
      ) : (
        <form
          onSubmit={briefForm.handleSubmit(onSubmitBrief)}
          className="space-y-6"
          noValidate
        >
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 font-mono text-xs">
            <span className="text-[var(--accent-text)]">STEP 0{step} / 03</span>
            <span className="text-[var(--text-muted)]">
              {step === 1
                ? "SERVICES NEEDED"
                : step === 2
                  ? "TIMELINE & BUDGET"
                  : "YOUR DETAILS"}
            </span>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-[var(--text-primary)]">
                Which services are you looking for?
              </label>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {services.map((service) => {
                  const checked = selectedServices.includes(service.title);
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => toggleService(service.title)}
                      className={`min-h-[56px] cursor-pointer rounded-xl border p-3.5 text-left transition-all active:scale-[0.98] ${
                        checked
                          ? "border-[var(--accent-primary)] bg-[var(--bg-surface-2)]"
                          : "border-[var(--border-subtle)] bg-[var(--bg-canvas)] hover:border-[var(--border-strong)]"
                      }`}
                    >
                      <span className="block text-sm font-medium text-[var(--text-primary)]">
                        {service.title}
                      </span>
                    </button>
                  );
                })}
              </div>
              {briefForm.formState.errors.services && (
                <p className="text-xs text-[var(--status-error)]">
                  {briefForm.formState.errors.services.message}
                </p>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)]">
                  How would you like to work with {siteConfig.teamName}?
                </label>
                <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  {engagementModels.map((model) => (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() =>
                        briefForm.setValue("engagementModel", model.name, {
                          shouldValidate: true,
                        })
                      }
                      className={`min-h-[46px] cursor-pointer rounded-xl border p-3 text-left text-xs font-medium transition-colors ${
                        selectedModel === model.name
                          ? "border-[var(--accent-primary)] bg-[var(--bg-surface-2)] text-[var(--text-primary)]"
                          : "border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]"
                      }`}
                    >
                      {model.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)]">
                  Target Timeline
                </label>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {timelines.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() =>
                        briefForm.setValue("timeline", item, { shouldValidate: true })
                      }
                      className={`min-h-[38px] cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                        selectedTimeline === item
                          ? "border-[var(--accent-primary)] bg-[var(--accent-primary)] text-[#FAFAFA]"
                          : "border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)]">
                  Estimated Budget
                </label>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {budgetBands.map((band) => (
                    <button
                      key={band}
                      type="button"
                      onClick={() =>
                        briefForm.setValue("budgetRange", band, {
                          shouldValidate: true,
                        })
                      }
                      className={`min-h-[38px] cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                        selectedBudget === band
                          ? "border-[var(--accent-primary)] bg-[var(--accent-primary)] text-[#FAFAFA]"
                          : "border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]"
                      }`}
                    >
                      {band}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...briefForm.register("website")}
                className="hidden"
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">
                    Your Name *
                  </label>
                  <input
                    {...briefForm.register("name")}
                    placeholder="Your full name"
                    className="h-11 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                  />
                  {briefForm.formState.errors.name && (
                    <p className="mt-1 text-xs text-[var(--status-error)]">
                      {briefForm.formState.errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    {...briefForm.register("email")}
                    placeholder="you@company.com"
                    className="h-11 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                  />
                  {briefForm.formState.errors.email && (
                    <p className="mt-1 text-xs text-[var(--status-error)]">
                      {briefForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">
                  Company Name (Optional)
                </label>
                <input
                  {...briefForm.register("company")}
                  placeholder="Your company name"
                  className="h-11 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">
                  Project Details *
                </label>
                <textarea
                  rows={4}
                  {...briefForm.register("brief")}
                  placeholder="Describe what you want to build or fix..."
                  className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-canvas)] p-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                />
                {briefForm.formState.errors.brief && (
                  <p className="mt-1 text-xs text-[var(--status-error)]">
                    {briefForm.formState.errors.brief.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {briefStatus === "error" && (
            <div className="flex items-center gap-2 rounded-xl border border-[var(--status-error)]/40 bg-[var(--status-error)]/10 px-4 py-3 text-xs text-[var(--status-error)]">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{briefError}</span>
            </div>
          )}

          <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-5">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => (prev - 1) as 1 | 2 | 3)}
                className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-lg border border-[var(--border-strong)] px-4 text-sm font-medium text-[var(--text-primary)] hover:border-[var(--accent-primary)]"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
            ) : (
              <span className="font-mono text-[11px] text-[var(--text-muted)]">
                NDA AVAILABLE
              </span>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-lg bg-[var(--accent-primary)] px-5 text-sm font-semibold text-[#FAFAFA] transition-all hover:bg-[var(--accent-primary-hover)] active:scale-[0.98]"
              >
                <span>Continue</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={briefStatus === "submitting"}
                className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg bg-[var(--accent-primary)] px-6 text-sm font-semibold text-[#FAFAFA] transition-all hover:bg-[var(--accent-primary-hover)] active:scale-[0.98] disabled:opacity-60"
              >
                {briefStatus === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Submit Project Brief</span>
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
