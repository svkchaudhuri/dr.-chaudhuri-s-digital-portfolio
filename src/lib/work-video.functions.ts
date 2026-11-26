import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const inputSchema = z.object({
  path: z.string().regex(/^[0-9a-f-]{36}\.(mp4|webm|mov|m4v)$/i),
});

function browserFacingUrl(signedUrl: string) {
  const browserBase = process.env["VITE_SUPABASE_URL"];
  if (!browserBase) return signedUrl;

  const signed = new URL(signedUrl);
  const base = new URL(browserBase);
  const prefix = base.pathname.replace(/\/$/, "");
  return `${base.origin}${prefix}${signed.pathname}${signed.search}`;
}

export const getPublishedWorkVideoUrl = createServerFn({ method: "GET" })
  .inputValidator((input: { path: string }) => inputSchema.parse(input))
  .handler(async ({ data }) => {
    const supabaseUrl = process.env["SUPABASE_URL"];
    const publicKey = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["SUPABASE_ANON_KEY"];
    if (!supabaseUrl || !publicKey) return { url: null };

    const publicClient = createClient<Database>(supabaseUrl, publicKey, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const headers = new Headers(init?.headers);
          if (publicKey.startsWith("sb_") && headers.get("Authorization") === `Bearer ${publicKey}`) {
            headers.delete("Authorization");
          }
          headers.set("apikey", publicKey);
          return fetch(input, { ...init, headers });
        },
      },
    });

    const { data: video, error: readError } = await publicClient
      .from("work_videos")
      .select("storage_path")
      .eq("storage_path", data.path)
      .eq("is_public", true)
      .maybeSingle();

    if (readError) {
      console.error("Could not verify the published video");
      return { url: null };
    }
    if (!video) return { url: null };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: signed, error: signError } = await supabaseAdmin.storage
      .from("work-videos")
      .createSignedUrl(video.storage_path, 60 * 60 * 24 * 365);

    if (signError || !signed?.signedUrl) {
      console.error("Could not sign the published video URL");
      return { url: null };
    }

    return { url: browserFacingUrl(signed.signedUrl) };
  });
