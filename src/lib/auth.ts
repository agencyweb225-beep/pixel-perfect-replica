import { z } from "zod";

export const profileSchema = z.object({
  display_name: z.string().trim().min(1, "Enter a display name").max(120),
  avatar_url: z.string().trim().max(2048).refine((value) => {
    if (!value) return true;
    try { return new URL(value).protocol === "https:"; } catch { return false; }
  }, "Use an HTTPS image address"),
});

export function signupNeedsConfirmation(session: unknown) {
  return session == null;
}

export const accountHead = (title: string, description: string) => ({ meta: [
  { title: `${title} | ODD SOCKS` },
  { name: "description", content: description },
  { property: "og:title", content: `${title} | ODD SOCKS` },
  { property: "og:description", content: description },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary_large_image" },
] });