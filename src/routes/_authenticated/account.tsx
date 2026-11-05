import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { UserRound, LogOut, Save } from "lucide-react";
import { getOwnProfile, saveOwnProfile } from "@/lib/profile.functions";
import { accountHead, profileSchema } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { AccountFrame, accountField, accountLabel } from "@/components/auth/AccountFrame";
import { BrandAction } from "@/components/brand/BrandAction";

const profileOptions = queryOptions({ queryKey: ["own-profile"], queryFn: () => getOwnProfile() });
export const Route = createFileRoute("/_authenticated/account")({
  head: () => accountHead("Your account", "Manage your private ODD SOCKS profile."),
  loader: ({ context }) => context.queryClient.ensureQueryData(profileOptions),
  component: AccountPage,
});

function AccountPage() {
  const { data } = useSuspenseQuery(profileOptions);
  const { user, queryClient } = Route.useRouteContext();
  const save = useServerFn(saveOwnProfile);
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = profileSchema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    setMessage(""); setError("");
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Check your profile details."); return; }
    setBusy(true);
    try {
      const updated = await save({ data: parsed.data });
      queryClient.setQueryData(profileOptions.queryKey, updated);
      setMessage("Profile saved.");
    } catch (e) { setError(e instanceof Error ? e.message : "Could not save your profile."); }
    finally { setBusy(false); }
  }

  async function signOut() {
    setBusy(true);
    await queryClient.cancelQueries(); queryClient.clear();
    const { error } = await supabase.auth.signOut();
    if (error) { setError(error.message); setBusy(false); return; }
    await navigate({ to: "/auth", replace: true });
  }

  return <AccountFrame title="Your account">
    <div className="mb-6 flex items-center gap-4">
      {data.avatar_url ? <img src={data.avatar_url} alt="Your avatar" className="h-16 w-16 rounded-full object-cover" referrerPolicy="no-referrer" /> : <UserRound className="h-12 w-12 text-ash" />}
      <p className="min-w-0 break-all text-sm">{user.email}</p>
    </div>
    <form onSubmit={submit} className="space-y-5">
      <div><label htmlFor="display_name" className={accountLabel}>Display name</label><input id="display_name" name="display_name" defaultValue={data.display_name} maxLength={120} required autoComplete="nickname" className={accountField} /></div>
      <div><label htmlFor="avatar_url" className={accountLabel}>Avatar image address</label><input id="avatar_url" name="avatar_url" defaultValue={data.avatar_url} type="url" placeholder="https://" className={accountField} /></div>
      {error && <p role="alert" className="text-destructive">{error}</p>}
      {message && <p role="status">{message}</p>}
      <BrandAction type="submit" variant="brand" disabled={busy}><Save className="h-4 w-4" />{busy ? "Saving…" : "Save profile"}</BrandAction>
    </form>
    <div className="mt-8 border-t border-ink/20 pt-6"><BrandAction type="button" variant="outlineInk" disabled={busy} onClick={signOut}><LogOut className="h-4 w-4" />Sign out</BrandAction></div>
  </AccountFrame>;
}