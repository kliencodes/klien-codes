import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/schema";
import { saveProjectBrief } from "@/lib/db";
import { siteConfig } from "@/config/site";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Please check your form details." },
        { status: 400 }
      );
    }

    const data = parsed.data;
    if (data.website && data.website.length > 0) {
      return NextResponse.json({ ok: true });
    }

    const saved = await saveProjectBrief({
      name: data.name,
      email: data.email,
      company: data.company,
      services: data.services,
      engagementModel: data.engagementModel,
      timeline: data.timeline,
      budgetRange: data.budgetRange,
      brief: data.brief,
    });

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || siteConfig.contactEmail;

    if (apiKey) {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: `${siteConfig.brandName} <onboarding@resend.dev>`,
        to: [toEmail],
        replyTo: data.email,
        subject: `New Project Brief [${saved.id}] from ${data.name}`,
        text: [
          `Brief ID: ${saved.id}`,
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Company: ${data.company || "N/A"}`,
          `Services: ${data.services.join(", ")}`,
          `Model: ${data.engagementModel}`,
          `Timeline: ${data.timeline}`,
          `Budget: ${data.budgetRange}`,
          "",
          "Project Details:",
          data.brief,
        ].join("\n"),
      });
    } else {
      console.log("[KLIEN CODES DB] Saved project brief:", saved.id);
    }

    return NextResponse.json({ ok: true, id: saved.id });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: `Could not save your project brief right now. Please email ${siteConfig.contactEmail} directly.` },
      { status: 500 }
    );
  }
}
