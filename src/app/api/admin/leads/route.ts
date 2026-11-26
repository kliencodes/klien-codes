import { NextResponse } from "next/server";
import { getAllBriefs, getAllQueries, isPostgresConfigured } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const provided = typeof body.password === "string" ? body.password : "";
    const expected = process.env.ADMIN_PASSWORD;

    if (!expected) {
      return NextResponse.json(
        {
          error:
            "ADMIN_PASSWORD is not set yet. Add ADMIN_PASSWORD in Vercel Settings -> Environment Variables and redeploy.",
        },
        { status: 503 }
      );
    }

    if (provided !== expected) {
      return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
    }

    const [queries, briefs] = await Promise.all([
      getAllQueries(),
      getAllBriefs(),
    ]);

    return NextResponse.json({
      storage: isPostgresConfigured() ? "Neon Postgres" : "Local JSON Fallback",
      queries,
      briefs,
    });
  } catch (err) {
    console.error("Admin leads API error:", err);
    return NextResponse.json(
      { error: "Failed to load saved submissions." },
      { status: 500 }
    );
  }
}
