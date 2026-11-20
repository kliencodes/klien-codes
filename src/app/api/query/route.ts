import { NextResponse } from "next/server";
import { Resend } from "resend";
import { quickQuerySchema } from "@/lib/schema";
import { saveQuickQuery } from "@/lib/db";
import { siteConfig } from "@/config/site";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = quickQuerySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Please check your details." },
        { status: 400 }
      );
    }

    const data = parsed.data;
    if (data.website && data.website.length > 0) {
      return NextResponse.json({ ok: true });
    }

    const saved = await saveQuickQuery({
      name: data.name,
      email: data.email,
      query: data.query,
    });

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || siteConfig.contactEmail;

    if (apiKey) {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: `${siteConfig.brandName} <onboarding@resend.dev>`,
        to: [toEmail],
        replyTo: data.email,
        subject: `New Query [${saved.id}] from ${data.name}`,
        text: `Query ID: ${saved.id}\nName: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.query}`,
      });
    } else {
      console.log("[KLIEN CODES DB] Saved quick query:", saved.id);
    }

    return NextResponse.json({ ok: true, id: saved.id });
  } catch (err) {
    console.error("Query API error:", err);
    return NextResponse.json(
      { error: `Could not save your query right now. Please email ${siteConfig.contactEmail} directly.` },
      { status: 500 }
    );
  }
}
