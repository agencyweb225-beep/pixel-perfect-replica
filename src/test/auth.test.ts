import { describe, expect, it } from "vitest";
import { profileSchema, signupNeedsConfirmation } from "@/lib/auth";

describe("Account rules", () => {
  it("does not treat an unconfirmed signup as signed in", () => {
    expect(signupNeedsConfirmation(null)).toBe(true);
    expect(signupNeedsConfirmation({ access_token: "session" })).toBe(false);
  });
  it("only permits HTTPS avatar images or no avatar", () => {
    expect(profileSchema.safeParse({ display_name: "Dido", avatar_url: "https://example.com/avatar.jpg" }).success).toBe(true);
    expect(profileSchema.safeParse({ display_name: "Dido", avatar_url: "javascript:alert(1)" }).success).toBe(false);
    expect(profileSchema.safeParse({ display_name: "Dido", avatar_url: "" }).success).toBe(true);
  });
});