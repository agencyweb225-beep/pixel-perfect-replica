import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, type FormEvent } from "react";
import { Mail, ArrowRight, KeyRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import "@lovable.dev/cloud-auth-js/styles.css";
import { useAuth } from "@/components/auth/AuthContext";
import { AccountFrame, accountField, accountLabel } from "@/components/auth/AccountFrame";
import { BrandAction } from "@/components/brand/BrandAction";
import { accountHead, signupNeedsConfirmation } from "@/lib/auth";

export const Route = createFileRoute("/auth")({
  head: () => accountHead("Sign in & sign up", "Create your ODD SOCKS account or sign in to manage your profile."),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => { if (user) void navigate({ to: "/account", replace: true }); }, [user, navigate]);

  function changeMode(next: typeof mode) { setMode(next); setError(""); setMessage(""); }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    setBusy(true); setError(""); setMessage("");
    try {
      if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
        if (error) throw error;
        setMessage("If an account exists for this email, you'll receive a password reset link.");
      } else if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin, data: { display_name: String(form.get("display_name") ?? "").trim() } } });
        if (error) throw error;
        if (signupNeedsConfirmation(data.session)) setMessage("Check your email to confirm your account before signing in.");
        else await navigate({ to: "/account", replace: true });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        await navigate({ to: "/account", replace: true });
      }
    } catch (e) { setError(e instanceof Error ? e.message : "Could not complete sign-in. Please try again."); }
    finally { setBusy(false); }
  }

  async function social(provider: "google" | "lovable") {
    if (busy) return;
    setBusy(true); setError("");
    try {
      const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: `${window.location.origin}/auth` });
      if (result.error) throw result.error;
      if ("redirected" in result && result.redirected) return;
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) throw new Error("Sign-in was not completed. Please try again.");
      await navigate({ to: "/account", replace: true });
    } catch (e) { setError(e instanceof Error ? e.message : "Sign-in was not completed."); }
    finally { setBusy(false); }
  }

  return <AccountFrame title={mode === "signup" ? "Join the odd ones." : mode === "forgot" ? "Reset your password." : "Welcome back."}>
    {mode !== "forgot" && <div className="mb-6 grid grid-cols-2 gap-2" role="group" aria-label="Account access">
      <BrandAction variant={mode === "signin" ? "ink" : "outlineInk"} onClick={() => changeMode("signin")} aria-pressed={mode === "signin"}>Sign in</BrandAction>
      <BrandAction variant={mode === "signup" ? "ink" : "outlineInk"} onClick={() => changeMode("signup")} aria-pressed={mode === "signup"}>Sign up</BrandAction>
    </div>}
    <form onSubmit={submit} className="space-y-5">
      {mode === "signup" && <div><label htmlFor="display_name" className={accountLabel}>Display name</label><input id="display_name" name="display_name" required maxLength={120} autoComplete="nickname" className={accountField} /></div>}
      <div><label htmlFor="auth_email" className={accountLabel}>Email address</label><input id="auth_email" name="email" type="email" required autoComplete="email" className={accountField} /></div>
      {mode !== "forgot" && <div><label htmlFor="auth_password" className={accountLabel}>Password</label><input id="auth_password" name="password" type="password" required minLength={mode === "signup" ? 8 : undefined} autoComplete={mode === "signup" ? "new-password" : "current-password"} className={accountField} /></div>}
      {error && <p role="alert" className="break-words text-destructive">{error}</p>}
      {message && <p role="status" className="rounded-lg border border-ink/20 bg-sun/20 p-4">{message}</p>}
      <BrandAction variant="brand" type="submit" disabled={busy} className="w-full">{mode === "forgot" ? <Mail className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}{busy ? "Please wait…" : mode === "signup" ? "Create account" : mode === "forgot" ? "Send reset link" : "Sign in"}</BrandAction>
    </form>
    <BrandAction variant="outlineInk" className="mt-4 w-full" onClick={() => changeMode(mode === "forgot" ? "signin" : "forgot")} disabled={busy}><KeyRound className="h-4 w-4" />{mode === "forgot" ? "Back to sign in" : "Forgot password?"}</BrandAction>
    {mode !== "forgot" && <div className="mt-6 space-y-3 border-t border-ink/20 pt-6">
      <BrandAction className="google-auth-button w-full" onClick={() => social("google")} disabled={busy}>
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>
        Continue with Google
      </BrandAction>
      <BrandAction className="lovable-auth-button w-full" onClick={() => social("lovable")} disabled={busy}>Continue with Lovable</BrandAction>
    </div>}
  </AccountFrame>;
}