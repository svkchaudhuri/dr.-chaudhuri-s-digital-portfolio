import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { publications as staticPublications, type Publication } from "@/lib/portfolio-data";

export type SitePublication = Publication & { key: string; customId?: string; url?: string };

export const staticPublicationKey = (p: Publication) => `s:${p.year}:${p.title}`;
const changedEvent = "shouvik-publications-changed";
export const notifyPublicationsChanged = () => window.dispatchEvent(new Event(changedEvent));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

type CustomRow = { id: string; category: Publication["category"]; authors: string; title: string; venue: string; year: number; details: string | null; doi: string | null; url: string | null };

export function useSitePublications() {
  const [custom, setCustom] = useState<SitePublication[]>([]);
  const [picks, setPicks] = useState<Record<string, string[]>>({});

  const load = useCallback(async () => {
    const [pubRes, pickRes] = await Promise.all([
      db.from("custom_publications").select("*").order("year", { ascending: false }),
      db.from("interest_publications").select("interest_name, publication_keys"),
    ]);
    if (!pubRes.error && pubRes.data) {
      setCustom((pubRes.data as CustomRow[]).map((r) => ({
        key: `c:${r.id}`, customId: r.id, category: r.category, authors: r.authors, title: r.title, venue: r.venue, year: r.year,
        ...(r.details ? { details: r.details } : {}), ...(r.doi ? { doi: r.doi } : {}), ...(r.url ? { url: r.url } : {}),
      }) as SitePublication));
    }
    if (!pickRes.error && pickRes.data) {
      setPicks(Object.fromEntries((pickRes.data as { interest_name: string; publication_keys: string[] }[]).map((r) => [r.interest_name, r.publication_keys])));
    }
  }, []);

  useEffect(() => {
    load();
    window.addEventListener(changedEvent, load);
    return () => window.removeEventListener(changedEvent, load);
  }, [load]);

  const all = useMemo<SitePublication[]>(() => {
    const base = staticPublications.map((p) => ({ ...p, key: staticPublicationKey(p) }));
    return [...custom, ...base].sort((a, b) => b.year - a.year);
  }, [custom]);

  return { all, picks };
}

export function useSiteOwner() {
  const [email, setEmail] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getUser();
      setEmail(data.user?.email ?? null);
      if (!data.user) { setIsOwner(false); return; }
      const { data: owner } = await db.rpc("claim_site_owner");
      setIsOwner(owner === true);
    };
    check();
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") check();
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return { email, isOwner };
}

export async function saveInterestPicks(interestName: string, keys: string[]) {
  const { error } = await db.from("interest_publications").upsert({ interest_name: interestName, publication_keys: keys, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
  notifyPublicationsChanged();
}

export async function addCustomPublication(p: { category: string; authors: string; title: string; venue: string; year: number; details?: string; doi?: string; url?: string }) {
  const { error } = await db.from("custom_publications").insert({ ...p, details: p.details || null, doi: p.doi || null, url: p.url || null });
  if (error) throw new Error(error.message);
  notifyPublicationsChanged();
}

export async function deleteCustomPublication(id: string) {
  const { error } = await db.from("custom_publications").delete().eq("id", id);
  if (error) throw new Error(error.message);
  notifyPublicationsChanged();
}
