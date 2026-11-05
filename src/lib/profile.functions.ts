import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { profileSchema } from "./auth";

export const getOwnProfile = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
  const { data, error } = await context.supabase.from("profiles").select("id, display_name, avatar_url").eq("id", context.userId).single();
  if (error) throw new Error("Your profile could not be loaded. Please try again.");
  return data;
});

export const saveOwnProfile = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input: unknown) => profileSchema.parse(input)).handler(async ({ data, context }) => {
  const result = await context.supabase.from("profiles").update(data).eq("id", context.userId).select("id, display_name, avatar_url").single();
  if (result.error) throw new Error("Your profile could not be saved. Please try again.");
  return result.data;
});