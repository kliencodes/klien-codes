import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

// Uses local ./data on your Linux server/PC, and safely falls back to /tmp on read-only serverless hosts like Vercel
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

async function appendJsonRecord<T>(filename: string, record: T): Promise<T> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const filePath = path.join(DATA_DIR, filename);

  let existing: T[] = [];
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      existing = parsed;
    }
  } catch {
    // Start fresh array if file does not exist yet
  }

  existing.unshift(record);
  await fs.writeFile(filePath, JSON.stringify(existing, null, 2), "utf8");
  return record;
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
  return appendJsonRecord("queries.json", record);
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
  return appendJsonRecord("briefs.json", record);
}
