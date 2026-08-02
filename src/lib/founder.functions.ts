import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

export type InfoboxRow = { label: string; value: string };
export type EducationRow = { institution: string; detail: string; year: string };

export type FounderPage = {
  id: string;
  name: string;
  title: string;
  tagline: string;
  photo_url: string;
  summary: string;
  biography: string;
  infobox: InfoboxRow[];
  education: EducationRow[];
  skills: string[];
  updated_at: string;
};

const founderSchema = z.object({
  name: z.string().min(1).max(120),
  title: z.string().min(1).max(200),
  tagline: z.string().max(400),
  photo_url: z.string().max(600),
  summary: z.string().max(4000),
  biography: z.string().max(40000),
  infobox: z.array(z.object({ label: z.string().max(80), value: z.string().max(400) })).max(30),
  education: z
    .array(
      z.object({
        institution: z.string().max(200),
        detail: z.string().max(400),
        year: z.string().max(40),
      }),
    )
    .max(30),
  skills: z.array(z.string().max(80)).max(60),
});

export type FounderInput = z.infer<typeof founderSchema>;

export const getFounderPage = createServerFn({ method: "GET" }).handler(async () => {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  const supabasePublic = createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });

  const { data, error } = await supabasePublic
    .from("founder_page")
    .select("id, name, title, tagline, photo_url, summary, biography, infobox, education, skills, updated_at")
    .eq("slug", "founder")
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;
  return data as unknown as FounderPage;
});

export const getMyEditorAccess = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (error) throw new Error(error.message);
    return { isAdmin: Boolean(data), userId: context.userId };
  });

export const updateFounderPage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: FounderInput) => founderSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleError) throw new Error(roleError.message);
    if (!isAdmin) throw new Error("Forbidden: admin access required");

    const { error } = await context.supabase
      .from("founder_page")
      .update({
        name: data.name,
        title: data.title,
        tagline: data.tagline,
        photo_url: data.photo_url,
        summary: data.summary,
        biography: data.biography,
        infobox: data.infobox,
        education: data.education,
        skills: data.skills,
      })
      .eq("slug", "founder");

    if (error) throw new Error(error.message);
    return { ok: true };
  });
