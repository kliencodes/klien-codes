import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { neon } from "@neondatabase/serverless";

const DATA_DIR = process.env.VERCEL
  ? path.join("/tmp", "klien-codes-data")
  : path.join(process.cwd(), "data");

export interface StoredQuery {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  query: string;
}

export interface StoredBrief {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  company?: string;
  services: string[];
  engagementModel: string;
  timeline: string;
  budgetRange: string;
  brief: string;
}

export type BotStep = "idle" | "awaiting_name" | "awaiting_contact" | "awaiting_query";

export interface WhatsAppSession {
  phone: string;
  step: BotStep;
  draftName: string;
  draftContact: string;
}

function getSql() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  return url ? neon(url) : null;
}

let tablesReady = false;

async function ensureTables() {
  const sql = getSql();
  if (!sql || tablesReady) return;

  await sql`
    CREATE TABLE IF NOT EXISTS quick_queries (
      id TEXT PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      query TEXT NOT NULL
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS project_briefs (
      id TEXT PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      services JSONB NOT NULL DEFAULT '[]'::jsonb,
      engagement_model TEXT NOT NULL,
      timeline TEXT NOT NULL,
      budget_range TEXT NOT NULL,
      brief TEXT NOT NULL
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS whatsapp_sessions (
      phone TEXT PRIMARY KEY,
      step TEXT NOT NULL DEFAULT 'idle',
      draft_name TEXT NOT NULL DEFAULT '',
      draft_contact TEXT NOT NULL DEFAULT '',
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  tablesReady = true;
}

async function readLocalJson<T>(filename: string): Promise<T[]> {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, filename), "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function appendLocalJson<T>(filename: string, record: T): Promise<T> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const existing = await readLocalJson<T>(filename);
  existing.unshift(record);
  await fs.writeFile(
    path.join(DATA_DIR, filename),
    JSON.stringify(existing, null, 2),
    "utf8"
  );
  return record;
}

const memorySessions = new Map<string, WhatsAppSession>();

export async function getWhatsAppSession(phone: string): Promise<WhatsAppSession> {
  const sql = getSql();
  if (sql) {
    await ensureTables();
    const rows = await sql`
      SELECT phone, step, draft_name, draft_contact
      FROM whatsapp_sessions
      WHERE phone = ${phone}
      LIMIT 1
    `;
    if (rows.length > 0) {
      const r = rows[0];
      return {
        phone: String(r.phone),
        step: (String(r.step) as BotStep) || "idle",
        draftName: String(r.draft_name || ""),
        draftContact: String(r.draft_contact || ""),
      };
    }
    return { phone, step: "idle", draftName: "", draftContact: "" };
  }

  return (
    memorySessions.get(phone) || {
      phone,
      step: "idle",
      draftName: "",
      draftContact: "",
    }
  );
}

export async function saveWhatsAppSession(session: WhatsAppSession): Promise<void> {
  const sql = getSql();
  if (sql) {
    await ensureTables();
    await sql`
      INSERT INTO whatsapp_sessions (phone, step, draft_name, draft_contact, updated_at)
      VALUES (${session.phone}, ${session.step}, ${session.draftName}, ${session.draftContact}, NOW())
      ON CONFLICT (phone)
      DO UPDATE SET
        step = EXCLUDED.step,
        draft_name = EXCLUDED.draft_name,
        draft_contact = EXCLUDED.draft_contact,
        updated_at = NOW()
    `;
    return;
  }

  memorySessions.set(session.phone, session);
}

export async function clearWhatsAppSession(phone: string): Promise<void> {
  await saveWhatsAppSession({
    phone,
    step: "idle",
    draftName: "",
    draftContact: "",
  });
}

export async function saveQuickQuery(input: {
  name: string;
  email: string;
  query: string;
}): Promise<StoredQuery> {
  const record: StoredQuery = {
    id: `qry_${crypto.randomUUID().slice(0, 8)}`,
    createdAt: new Date().toISOString(),
    ...input,
  };

  const sql = getSql();
  if (sql) {
    await ensureTables();
    await sql`
      INSERT INTO quick_queries (id, created_at, name, email, query)
      VALUES (${record.id}, ${record.createdAt}, ${record.name}, ${record.email}, ${record.query})
    `;
    return record;
  }

  return appendLocalJson("queries.json", record);
}

export async function saveProjectBrief(input: {
  name: string;
  email: string;
  company?: string;
  services: string[];
  engagementModel: string;
  timeline: string;
  budgetRange: string;
  brief: string;
}): Promise<StoredBrief> {
  const record: StoredBrief = {
    id: `brf_${crypto.randomUUID().slice(0, 8)}`,
    createdAt: new Date().toISOString(),
    ...input,
  };

  const sql = getSql();
  if (sql) {
    await ensureTables();
    await sql`
      INSERT INTO project_briefs (
        id, created_at, name, email, company, services,
        engagement_model, timeline, budget_range, brief
      )
      VALUES (
        ${record.id},
        ${record.createdAt},
        ${record.name},
        ${record.email},
        ${record.company || ""},
        ${JSON.stringify(record.services)}::jsonb,
        ${record.engagementModel},
        ${record.timeline},
        ${record.budgetRange},
        ${record.brief}
      )
    `;
    return record;
  }

  return appendLocalJson("briefs.json", record);
}

export async function getAllQueries(): Promise<StoredQuery[]> {
  const sql = getSql();
  if (sql) {
    await ensureTables();
    const rows = await sql`
      SELECT id, created_at, name, email, query
      FROM quick_queries
      ORDER BY created_at DESC
      LIMIT 200
    `;
    return rows.map((r) => ({
      id: String(r.id),
      createdAt: new Date(String(r.created_at)).toISOString(),
      name: String(r.name),
      email: String(r.email),
      query: String(r.query),
    }));
  }
  return readLocalJson<StoredQuery>("queries.json");
}

export async function getAllBriefs(): Promise<StoredBrief[]> {
  const sql = getSql();
  if (sql) {
    await ensureTables();
    const rows = await sql`
      SELECT id, created_at, name, email, company, services,
             engagement_model, timeline, budget_range, brief
      FROM project_briefs
      ORDER BY created_at DESC
      LIMIT 200
    `;
    return rows.map((r) => ({
      id: String(r.id),
      createdAt: new Date(String(r.created_at)).toISOString(),
      name: String(r.name),
      email: String(r.email),
      company: r.company ? String(r.company) : "",
      services: Array.isArray(r.services) ? r.services.map(String) : [],
      engagementModel: String(r.engagement_model),
      timeline: String(r.timeline),
      budgetRange: String(r.budget_range),
      brief: String(r.brief),
    }));
  }
  return readLocalJson<StoredBrief>("briefs.json");
}

export function isPostgresConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL || process.env.POSTGRES_URL);
}
