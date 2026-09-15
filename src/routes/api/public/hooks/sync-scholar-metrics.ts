import { createFileRoute } from "@tanstack/react-router";

import { authenticateCronRequest } from "@/integrations/supabase/cron-auth";

const AUTHOR_ID = "sXYaj-AAAAAJ";

type SerpTableRow = Record<string, { all?: number; since_2020?: number } | undefined>;
type SerpAuthorResponse = {
  cited_by?: { table?: SerpTableRow[] };
  articles?: unknown[];
  serpapi_pagination?: unknown;
  error?: string;
};

function readMetric(table: SerpTableRow[] | undefined, key: string): number | undefined {
  for (const row of table ?? []) {
    const cell = row[key];
    if (cell && typeof cell.all === "number") return cell.all;
  }
  return undefined;
}

const COOLDOWN_MS = 4 * 60 * 60 * 1000;

async function sync(force: boolean) {
  const apiKey = process.env["SERPAPI_API_KEY"];
  if (!apiKey) {
    console.warn("SERPAPI_API_KEY is not set; keeping the existing baseline metrics.");
    return { synced: false, reason: "missing_api_key" as const };
  }

  const url = new URL("https://serpapi.com/search.json");
  url.searchParams.set("engine", "google_scholar_author");
  url.searchParams.set("author_id", AUTHOR_ID);
  url.searchParams.set("num", "100");
  url.searchParams.set("api_key", apiKey);

  const response = await fetch(url.toString());
  if (!response.ok) {
    console.error("SerpApi request failed", response.status);
    return { synced: false, reason: "upstream_error" as const };
  }

  const payload = (await response.json()) as SerpAuthorResponse;
  if (payload.error) {
    console.error("SerpApi returned an error", payload.error);
    return { synced: false, reason: "upstream_error" as const };
  }

  const table = payload.cited_by?.table;
  const citations = readMetric(table, "citations");
  const hIndex = readMetric(table, "h_index");
  const i10Index = readMetric(table, "i10_index");
  const publications = Array.isArray(payload.articles) ? payload.articles.length : undefined;

  const update: {
    last_synced_at: string;
    citations?: number;
    h_index?: number;
    i10_index?: number;
    publications?: number;
  } = { last_synced_at: new Date().toISOString() };
  if (typeof citations === "number") update.citations = citations;
  if (typeof hIndex === "number") update.h_index = hIndex;
  if (typeof i10Index === "number") update.i10_index = i10Index;
  if (typeof publications === "number" && publications > 0) update.publications = publications;


  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin
    .from("scholar_metrics")
    .update(update)
    .eq("scholar_author_id", AUTHOR_ID);

  if (error) {
    console.error("Failed to store scholar metrics", error.message);
    return { synced: false, reason: "database_error" as const };
  }

  return { synced: true, metrics: update };
}

export const Route = createFileRoute("/api/public/hooks/sync-scholar-metrics")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const bearer = /^Bearer ([^\s,]+)$/.exec(request.headers.get("authorization") ?? "")?.[1];
        const syncSecret = process.env["SCHOLAR_SYNC_SECRET"];
        if (!syncSecret || bearer !== syncSecret) {
          const unauthorized = await authenticateCronRequest(request);
          if (unauthorized) return unauthorized;
        }

        const result = await sync();
        return new Response(JSON.stringify(result), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
