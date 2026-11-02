import { useState, type FormEvent } from "react";
import { z } from "zod";
import { CheckCircle2, Loader2, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { brandButton } from "@/components/brand/BrandButton";
import { cn } from "@/lib/utils";

export const SERVICE_OPTIONS = [
  "Social Media Management",
  "Content Creation",
  "Social Media Strategy",
  "Paid Advertising",
  "Brand Development",
  "Other",
];
export const BUDGET_OPTIONS = [
  "Under ৳10,000",
  "৳10,000–৳25,000",
  "৳25,000–৳50,000",
  "৳50,000–৳100,000",
  "Above ৳100,000",
  "Not sure yet",
];

const schema = z.object({
  full_name: z.string().trim().min(1, "Please tell us your name").max(120),
  email: z.string().trim().email("That email doesn't look right").max(255),
  phone: z.string().trim().max(40).optional(),
  company: z.string().trim().max(160).optional(),
  service: z.string().min(1, "Pick a service"),
  budget: z.string().min(1, "Pick a budget range"),
  message: z.string().trim().min(10, "A few more words, please (10+ characters)").max(4000),
});
type Values = z.infer<typeof schema>;
type Errors = Partial<Record<keyof Values, string>>;

const field = "w-full rounded-lg border-2 border-ink bg-paper px-4 py-3 text-ink placeholder:text-muted-foreground focus:outline-none focus:ring-4 focus:ring-sun";
const label = "mb-1.5 block font-display text-xs uppercase tracking-wider text-ink";

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const errs: Errors = {};
      for (const i of parsed.error.issues) errs[i.path[0] as keyof Values] ??= i.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    const v = parsed.data;
    const { error } = await supabase.from("contact_submissions").insert({
      ...v,
      phone: v.phone || null,
      company: v.company || null,
    });
    if (error) {
      setStatus("error");
      return;
    }
    form.reset();
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-2xl border-2 border-ink bg-sun p-8 text-ink shadow-pop">
        <CheckCircle2 className="h-10 w-10" />
        <h3 className="mt-4 text-4xl">Message received!</h3>
        <p className="mt-3 font-hand text-2xl">Dido is already doing a happy dance.</p>
        <p className="mt-3">Thanks for reaching out — we'll get back to you soon.</p>
        <button className={cn(brandButton({ variant: "ink" }), "mt-6")} onClick={() => setStatus("idle")}>Send another</button>
      </div>
    );
  }

  const err = (k: keyof Values) => errors[k] && <p className="mt-1 text-sm text-red">{errors[k]}</p>;

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-5 rounded-2xl border-2 border-ink bg-paper p-6 shadow-pop sm:grid-cols-2 sm:p-8">
      <div>
        <label className={label} htmlFor="full_name">Full name *</label>
        <input id="full_name" name="full_name" autoComplete="name" className={field} aria-invalid={!!errors.full_name} />
        {err("full_name")}
      </div>
      <div>
        <label className={label} htmlFor="email">Email address *</label>
        <input id="email" name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} />
        {err("email")}
      </div>
      <div>
        <label className={label} htmlFor="phone">Phone number</label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" className={field} />
      </div>
      <div>
        <label className={label} htmlFor="company">Company / business</label>
        <input id="company" name="company" autoComplete="organization" className={field} />
      </div>
      <div>
        <label className={label} htmlFor="service">Service interested in *</label>
        <select id="service" name="service" defaultValue="" className={field} aria-invalid={!!errors.service}>
          <option value="" disabled>Choose one</option>
          {SERVICE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
        </select>
        {err("service")}
      </div>
      <div>
        <label className={label} htmlFor="budget">Estimated budget *</label>
        <select id="budget" name="budget" defaultValue="" className={field} aria-invalid={!!errors.budget}>
          <option value="" disabled>Choose a range</option>
          {BUDGET_OPTIONS.map((o) => <option key={o}>{o}</option>)}
        </select>
        {err("budget")}
      </div>
      <div className="sm:col-span-2">
        <label className={label} htmlFor="message">Project description *</label>
        <textarea id="message" name="message" rows={5} className={field} placeholder="Tell us about your business and what you'd like to achieve." aria-invalid={!!errors.message} />
        {err("message")}
      </div>
      {status === "error" && (
        <p role="alert" className="flex items-center gap-2 rounded-lg border-2 border-red bg-red/10 p-3 text-sm text-ink sm:col-span-2">
          <AlertTriangle className="h-4 w-4 text-red" /> Something went wrong sending your message. Please try again, or email us directly.
        </p>
      )}
      <div className="sm:col-span-2">
        <button type="submit" disabled={status === "sending"} className={brandButton({ variant: "brand", size: "lg" })}>
          {status === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : "Send your message"}
        </button>
      </div>
    </form>
  );
}
