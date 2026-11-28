import { NextResponse } from "next/server";
import {
  clearWhatsAppSession,
  getWhatsAppSession,
  saveQuickQuery,
  saveWhatsAppSession,
} from "@/lib/db";

const GRAPH_VERSION = "v21.0";
const WEBSITE = "https://www.kliencodes.com";
const EMAIL = "teamkliencodes@gmail.com";

const MAIN_MENU = [
  "👋 *Welcome to Klien Codes*",
  "_Practical IT Solutions & Software Engineering for Growing Businesses._",
  "",
  "How can we help you today? Reply with a number:",
  "",
  "*1* — Services & Capabilities",
  "*2* — Selected Work & Solutions",
  "*3* — Achievements & About Us",
  "*4* — Delivery Process & Plans",
  "*5* — Frequently Asked Questions",
  "*6* — Submit a Project Query",
  "*7* — Website & Direct Contact",
].join("\n");

const SERVICES_OVERVIEW = [
  "🛠️ *Klien Codes — IT Consultancy Services*",
  "",
  "*1A. Cloud Setup & Migration* (2–6 Weeks)",
  "Move websites, apps, and business data to AWS, Azure, or Google Cloud safely with lower monthly bills and zero downtime.",
  "",
  "*1B. Web & Software Development* (3–10 Weeks)",
  "Custom web apps, portals, dashboards, APIs, and safe upgrades for slow legacy software (Next.js, React, Node.js, PostgreSQL).",
  "",
  "*1C. Cybersecurity & Data Safety* (2–4 Weeks)",
  "Cloud & app security audits, Zero-Trust permissions, automated pipeline scanning, and SOC 2 / ISO 27001 readiness.",
  "",
  "*1D. DevOps & Automation* (2–5 Weeks)",
  "Automated CI/CD releases, Terraform & Docker server templates, live uptime monitoring, and instant alerts.",
  "",
  "*1E. Data & Practical AI Tools* (3–6 Weeks)",
  "Automated data pipelines, operational dashboards, and privacy-safe AI search or support assistants.",
  "",
  "*1F. IT Strategy & Consulting* (1-Week Audit / Monthly)",
  "Honest technical audits, 90-day improvement roadmaps, and unbiased vendor or agency quote reviews.",
  "",
  "────────────────────",
  "• Reply *6* to submit a project query",
  "• Reply *0* for the Main Menu",
].join("\n");

const WORK_TEXT = [
  "📂 *Selected Work & Architecture Blueprints*",
  "",
  "*1. Multi-Region Cloud Migration (B2B SaaS — 6 Weeks)*",
  "Replaced fragile single-region VMs with a Terraform-managed multi-AZ AWS setup and zero-downtime blue/green cutover.",
  "",
  "*2. Zero-Trust CI/CD & Compliance (FinTech — 4 Weeks)*",
  "Eliminated static CI keys via OIDC federation, added automated SAST/SBOM vulnerability gates, and prepared SOC 2 audit trails.",
  "",
  "*3. Event-Driven API Modernization (Logistics — 8 Weeks)*",
  "Decoupled a slow legacy monolith using async worker queues, Redis caching, and OpenTelemetry tracing.",
  "",
  `Explore full case studies: ${WEBSITE}/work`,
  "",
  "────────────────────",
  "• Reply *6* to discuss a similar project",
  "• Reply *0* for the Main Menu",
].join("\n");

const ACHIEVEMENTS_ABOUT_TEXT = [
  "🏆 *About Klien Codes & Track Record*",
  "",
  "We started *Klien Codes* so businesses get reliable software and IT infrastructure without confusing jargon or agency bloat.",
  "",
  "• *50+ Projects Delivered* across startups, SMEs & enterprises",
  "• *3 Years* of consistent engineering & IT consultancy delivery",
  "• *50+ Specialized Engineers* across cloud, web, security & data",
  "• *Pan-India Hybrid Team* working both virtually & in-office",
  "• *100% Client Ownership* — zero vendor lock-in",
  "",
  "────────────────────",
  "• Reply *6* to start a conversation",
  "• Reply *0* for the Main Menu",
].join("\n");

const PROCESS_PLANS_TEXT = [
  "⚙️ *How We Work & Engagement Plans*",
  "",
  "*Our 4-Step Delivery Process:*",
  "1. *Understand Your Needs* (Week 1) — Clear project scope",
  "2. *Plan the Solution* (Week 2) — Plain-English roadmap",
  "3. *Build & Test* — Weekly demos & tested milestones",
  "4. *Launch & Handover* — Full code & account ownership",
  "",
  "*3 Flexible Engagement Plans:*",
  "• *IT & System Checkup* (1–2 Weeks · Fixed Price)",
  "• *Full Project Delivery* (4–12 Weeks · Milestone-Based)",
  "• *Ongoing Tech Support* (Flexible Monthly Retainer)",
  "",
  "────────────────────",
  "• Reply *6* to share your timeline & requirements",
  "• Reply *0* for the Main Menu",
].join("\n");

const FAQ_TEXT = [
  "❓ *Frequently Asked Questions*",
  "",
  "*Q: Who works on my project?*",
  "Team Klien Codes — our 50+ specialized engineers working virtually and from offices across India.",
  "",
  "*Q: Do we own 100% of the code and cloud accounts?*",
  "Yes. Everything is built inside your own repositories and cloud accounts with full documentation.",
  "",
  "*Q: Can you sign an NDA first?*",
  "Absolutely. Mutual NDAs are standard before reviewing sensitive code or business details.",
  "",
  "*Q: Do you serve international clients?*",
  "Yes — we serve businesses across India and worldwide.",
  "",
  "*Q: How fast can we get started?*",
  "We respond within 1 business day and typically kick off within a week.",
  "",
  "────────────────────",
  "• Reply *6* to ask a specific question",
  "• Reply *0* for the Main Menu",
].join("\n");

const CONTACT_TEXT = [
  "📩 *Direct Contact — Team Klien Codes*",
  "",
  `• *Website:* ${WEBSITE}`,
  `• *Email:* ${EMAIL}`,
  `• *Contact Form:* ${WEBSITE}/contact`,
  "• *Coverage:* Offices & Virtual Teams Across India (IST) · Serving Worldwide",
  "",
  "────────────────────",
  "• Reply *6* to submit a quick query right here on WhatsApp",
  "• Reply *0* for the Main Menu",
].join("\n");

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

function isValidPhone(value: string): boolean {
  const digits = value.replace(/[^\d]/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

async function sendWhatsAppMessage(to: string, body: string) {
  const token = process.env.WHATSAPP_TOKEN?.trim();
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID?.replace(/[^\d]/g, "");

  if (!token || !phoneNumberId) {
    console.error("[WhatsApp Bot] Missing WHATSAPP_TOKEN or WHATSAPP_PHONE_NUMBER_ID");
    return;
  }

  const res = await fetch(
    `https://graph.facebook.com/${GRAPH_VERSION}/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body },
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    console.error("[WhatsApp Bot] Meta API send failed:", res.status, errText);
  }
}

/**
 * GET /api/whatsapp — One-time webhook verification by Meta App Dashboard
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const expectedToken = process.env.WHATSAPP_VERIFY_TOKEN;

  if (mode === "subscribe" && expectedToken && token === expectedToken && challenge) {
    return new Response(challenge, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  return NextResponse.json({ error: "Webhook verification failed" }, { status: 403 });
}

/**
 * POST /api/whatsapp — Stateful Klien Codes Assistant + Validated Step-by-Step Query Flow
 */
export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const value = payload?.entry?.[0]?.changes?.[0]?.value;
    const message = value?.messages?.[0];

    if (!message || message.type !== "text") {
      return NextResponse.json({ ok: true });
    }

    const from: string = message.from;
    const rawText: string = (message.text?.body || "").trim();
    const normalized = rawText.toLowerCase();

    // Global escape/reset commands work from any step
    if (
      normalized === "0" ||
      normalized === "menu" ||
      normalized === "cancel" ||
      normalized === "exit" ||
      normalized === "restart"
    ) {
      await clearWhatsAppSession(from);
      await sendWhatsAppMessage(from, MAIN_MENU);
      return NextResponse.json({ ok: true });
    }

    const session = await getWhatsAppSession(from);

    // =========================================================================
    // GUIDED STEP-BY-STEP QUERY FLOW
    // =========================================================================
    if (session.step === "awaiting_name") {
      if (rawText.length < 2 || rawText.length > 80) {
        await sendWhatsAppMessage(
          from,
          "⚠️ Please enter a valid *Full Name* (at least 2 characters), or reply *0* to return to the Main Menu."
        );
        return NextResponse.json({ ok: true });
      }

      await saveWhatsAppSession({
        phone: from,
        step: "awaiting_contact",
        draftName: rawText,
        draftContact: "",
      });

      await sendWhatsAppMessage(
        from,
        [
          `Nice to meet you, *${rawText}*!`,
          "",
          "Step 2 of 3 — Please enter your *Email Address* (e.g., name@gmail.com) or *Phone Number* (10 digits) where Team Klien Codes can reach you:",
          "",
          "_(Reply *0* anytime to cancel)_",
        ].join("\n")
      );
      return NextResponse.json({ ok: true });
    }

    if (session.step === "awaiting_contact") {
      const validEmail = isValidEmail(rawText);
      const validPhone = isValidPhone(rawText);

      if (!validEmail && !validPhone) {
        await sendWhatsAppMessage(
          from,
          [
            "⚠️ That doesn't look like a valid email address or phone number.",
            "",
            "Please enter a valid *Gmail / work email* (like `alex@gmail.com`) or a *10-digit phone number* (like `9876543210`).",
            "_(Or reply *0* to cancel)_",
          ].join("\n")
        );
        return NextResponse.json({ ok: true });
      }

      await saveWhatsAppSession({
        phone: from,
        step: "awaiting_query",
        draftName: session.draftName,
        draftContact: rawText,
      });

      await sendWhatsAppMessage(
        from,
        [
          "✅ Contact details verified!",
          "",
          "Step 3 of 3 — Please type your *project requirement or question* in detail:",
          "",
          "_(Reply *0* anytime to cancel)_",
        ].join("\n")
      );
      return NextResponse.json({ ok: true });
    }

    if (session.step === "awaiting_query") {
      if (rawText.length < 8) {
        await sendWhatsAppMessage(
          from,
          "⚠️ Please share a little more detail (at least 8 characters) so our team can understand your requirement, or reply *0* to cancel."
        );
        return NextResponse.json({ ok: true });
      }

      const saved = await saveQuickQuery({
        name: `${session.draftName} (WhatsApp)`,
        email: `${session.draftContact} | WA:+${from}`,
        query: rawText,
      });

      await clearWhatsAppSession(from);

      await sendWhatsAppMessage(
        from,
        [
          `✅ *Thank you, ${session.draftName}!*`,
          "",
          `Your query has been logged successfully (Ref: *${saved.id}*).`,
          `*Team Klien Codes* will review your message and contact you at *${session.draftContact}* regarding this inquiry within 1 business day.`,
          "",
          "It was a pleasure assisting you! Have a great day ahead. 🙏",
          "",
          "────────────────────",
          "• Reply *0* or *MENU* to explore Klien Codes again",
          "• Reply *6* to submit another query",
          `• Website: ${WEBSITE}`,
        ].join("\n")
      );
      return NextResponse.json({ ok: true });
    }

    // =========================================================================
    // MAIN MENU ROUTING (IDLE STATE)
    // =========================================================================
    let reply = MAIN_MENU;

    if (normalized === "1" || normalized.includes("service")) {
      reply = SERVICES_OVERVIEW;
    } else if (
      normalized === "2" ||
      normalized.includes("work") ||
      normalized.includes("case") ||
      normalized.includes("portfolio")
    ) {
      reply = WORK_TEXT;
    } else if (
      normalized === "3" ||
      normalized.includes("achievement") ||
      normalized.includes("about") ||
      normalized.includes("team")
    ) {
      reply = ACHIEVEMENTS_ABOUT_TEXT;
    } else if (
      normalized === "4" ||
      normalized.includes("process") ||
      normalized.includes("price") ||
      normalized.includes("plan")
    ) {
      reply = PROCESS_PLANS_TEXT;
    } else if (normalized === "5" || normalized.includes("faq")) {
      reply = FAQ_TEXT;
    } else if (
      normalized === "6" ||
      normalized.includes("query") ||
      normalized.includes("quote") ||
      normalized.includes("project")
    ) {
      await saveWhatsAppSession({
        phone: from,
        step: "awaiting_name",
        draftName: "",
        draftContact: "",
      });

      reply = [
        "📝 *Submit a Project Query — Team Klien Codes*",
        "",
        "Step 1 of 3 — Please enter your *Full Name*:",
        "",
        "_(Reply *0* anytime to return to the Main Menu)_",
      ].join("\n");
    } else if (
      normalized === "7" ||
      normalized.includes("contact") ||
      normalized.includes("email") ||
      normalized.includes("website")
    ) {
      reply = CONTACT_TEXT;
    }

    await sendWhatsAppMessage(from, reply);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[WhatsApp Bot] Webhook error:", err);
    return NextResponse.json({ ok: true });
  }
}
