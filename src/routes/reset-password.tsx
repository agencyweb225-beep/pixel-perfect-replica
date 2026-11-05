import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AccountFrame, accountField, accountLabel } from "@/components/auth/AccountFrame";
import { BrandAction } from "@/components/brand/BrandAction";
import { BrandLink } from "@/components/brand/BrandButton";
import { accountHead } from "@/lib/auth";

export const Route = createFileRoute("/reset-password")({ head: () => accountHead("Reset password", "Choose a new password for your ODD SOCKS account."), component: ResetPage });
function ResetPage() {
  const [valid, setValid] = useState(false);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    let active = true;
    const recovery = new URLSearchParams(window.location.hash.slice(1)).get("type") === "recovery";
    void supabase.auth.getUser().then(({ data }) => { if (active) { setValid(recovery && !!data.user); setReady(true); } });
    return () => { active = false; };
  }, []);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!valid || busy) return;
    const values = new FormData(e.currentTarget);
    const password = String(values.get("password") ?? "");
    if (password !== values.get("confirm")) { setError("Passwords do not match."); return; }
    setBusy(true); setError("");
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      await navigate({ to: "/account", replace: true });
    } catch (e) { setError(e instanceof Error ? e.message : "Could not reset your password."); }
    finally { setBusy(false); }
  }
  return <AccountFrame title="New password.">{!ready ? <p>Checking your reset link…</p> : !valid ? <div><p role="alert">This reset link is invalid or expired. Request a new one.</p><BrandLink to="/auth" className="mt-5">Back to sign in</BrandLink></div> : <form onSubmit={submit} className="space-y-5">
    <div><label htmlFor="new_password" className={accountLabel}>New password</label><input id="new_password" name="password" type="password" autoComplete="new-password" required minLength={8} className={accountField} /></div>
    <div><label htmlFor="confirm_password" className={accountLabel}>Confirm password</label><input id="confirm_password" name="confirm" type="password" autoComplete="new-password" required minLength={8} className={accountField} /></div>
    {error && <p role="alert" className="text-destructive">{error}</p>}
    <BrandAction type="submit" variant="brand" disabled={busy}>{busy ? "Updating…" : "Update password"}</BrandAction>
  </form>}</AccountFrame>;
}