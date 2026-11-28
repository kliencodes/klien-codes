import { NextResponse } from "next/server";
import { saveQuickQuery } from "@/lib/db";
import { siteConfig } from "@/config/site";

const GRAPH_VERSION = "v21.0";

const WELCOME_MENU = [
  `👋 Welcome to *${siteConfig.brandName}*!`,
  "Practical IT Solutions & Software Engineering (50+ projects in 3 years, 50+ engineers across India).",
  "",
  "Reply with a number to continue:",
  "*1* — Our IT Services",
  "*2* — Track Record & Team",
  "*3* — Send a Project Query (Saved for our team)",
  "*4* — Website & Direct Email",
].join("\n");

const SERVICES_TEXT = [
  "🛠️ *Klien Codes — Core Services*",
  "",
  "1. *Cloud Setup & Migration* — AWS, Azure, Google Cloud",
  "2. *Web & Software Development* — Next.js, React, Node.js, APIs",
  "3. *Cybersecurity & Data Safety* — Audits, Zero-Trust, SOC 2/ISO prep",
  "4. *DevOps & Automation* — CI/CD, Docker, Kubernetes, Terraform",
  "5. *Data & Practical AI Tools* — Pipelines, analytics, private AI tools",
  "6. *IT Strategy & Consulting* — Audits, roadmaps, vendor reviews",
  "",
  "Reply *3* to send us your project requirement, or *0* for the main menu.",
].join("\n");

const ACHIEVEMENTS_TEXT = [
  "🏆 *Klien Codes — Track Record*",
  "",
  "• *50+ Projects Delivered* across startups, SMEs & enterprises",
  "• *3 Years* of consistent IT consultancy delivery",
  "• *50+ Specialized Engineers* working virtually & in-office across India",
  "• *100% Client Ownership* of all code and cloud accounts",
  "",
  "Reply *3* to share your project idea, or *0* for the main menu.",
].join("\n");

const CONTACT_TEXT = [
  "📩 *Direct Contact — Team Klien Codes*",
  "",
  `• Website: ${siteConfig.domainUrl}`,
  `• Email: ${siteConfig.contactEmail}`,
  "• Contact Form: " + `${siteConfig.domainUrl}/contact`,
  "",
  "Or reply *QUERY: <your message>* right here and our team will reach out within 1 business day.",
].join("\n");

async function sendWhatsAppMessage(to: string, body: string) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

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
 * POST /api/whatsapp — Receives incoming WhatsApp messages & replies automatically
 */
export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const entry = payload?.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;
    const message = value?.messages?.[0];

    // Ignore status updates (sent/delivered/read) — always return 200 OK quickly
    if (!message || message.type !== "text") {
      return NextResponse.json({ ok: true });
    }

    const from: string = message.from;
    const senderName: string =
      value?.contacts?.[0]?.profile?.name || `WhatsApp User (${from})`;
    const rawText: string = (message.text?.body || "").trim();
    const normalized = rawText.toLowerCase();

    let reply = WELCOME_MENU;

    if (normalized === "1" || normalized.includes("service")) {
      reply = SERVICES_TEXT;
    } else if (
      normalized === "2" ||
      normalized.includes("achievement") ||
      normalized.includes("team") ||
      normalized.includes("about")
    ) {
      reply = ACHIEVEMENTS_TEXT;
    } else if (normalized === "3") {
      reply = [
        "📝 *Submit a Project Query*",
        "",
        "Reply starting with *QUERY:* followed by your requirement and email (optional).",
        "",
        "Example:",
        "_QUERY: We need a Next.js e-commerce site and AWS setup. Email: name@company.com_",
      ].join("\n");
    } else if (normalized === "4" || normalized.includes("email") || normalized.includes("contact")) {
      reply = CONTACT_TEXT;
    } else if (normalized.startsWith("query:") || rawText.length >= 25) {
      // Save real client inquiries straight into Neon Postgres (visible in /admin!)
      const cleanedQuery = rawText.replace(/^query:\s*/i, "").trim();
      const saved = await saveQuickQuery({
        name: `${senderName} (WhatsApp)`,
        email: `whatsapp:+${from}`,
        query: cleanedQuery,
      });

      reply = [
        `✅ Thank you, *${senderName}*!`,
        `Your inquiry has been saved (Ref: *${saved.id}*) for *Team Klien Codes*.`,
        "",
        `Our team will follow up within 1 business day. You can also email ${siteConfig.contactEmail} anytime.`,
      ].join("\n");
    } else if (normalized === "0" || normalized === "menu" || normalized === "hi" || normalized === "hello") {
      reply = WELCOME_MENU;
    }

    await sendWhatsAppMessage(from, reply);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[WhatsApp Bot] Webhook error:", err);
    // Return 200 so Meta does not aggressively retry malformed payloads
    return NextResponse.json({ ok: true });
  }
}
