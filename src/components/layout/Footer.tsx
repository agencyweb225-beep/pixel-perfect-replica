import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { Dido } from "@/components/brand/Dido";
import { SockMark } from "@/components/brand/Logo";
import { NAV, SITE } from "@/lib/site";

const icons = { Facebook, Instagram, LinkedIn: Linkedin } as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand text-paper grain">
      <div className="pattern-sock-light absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <SockMark circle className="h-16 w-16" />
              <span className="font-display text-5xl sm:text-6xl">ODD SOCKS</span>
            </div>
            <p className="mt-4 font-hand text-3xl text-ink">{SITE.slogan}</p>
          </div>
          <div>
            <h3 className="mb-4 text-lg">Explore</h3>
            <ul className="space-y-2">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="underline-offset-4 hover:underline">{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg">Say hello</h3>
            <ul className="space-y-2">
              {SITE.phones.map((p) => (
                <li key={p}>
                  <a href={`tel:${p}`} className="inline-flex items-center gap-2 hover:underline"><Phone className="h-4 w-4" />{p}</a>
                </li>
              ))}
              <li>
                <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 break-all hover:underline"><Mail className="h-4 w-4" />{SITE.email}</a>
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              {SITE.socials.map((s) => {
                const Icon = icons[s.label];
                return (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="rounded-full border-2 border-paper p-2 transition-colors hover:bg-paper hover:text-red">
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-paper/30 pt-6 text-sm sm:flex-row sm:items-center lg:pr-36">
          <p>© 2026 ODD SOCKS. ALL RIGHTS RESERVED.</p>
          <p className="font-hand text-lg">{SITE.tagline}</p>
        </div>
      </div>
      <Dido className="pointer-events-none absolute -bottom-24 right-4 hidden w-28 rotate-[-8deg] lg:block" float={false} />
    </footer>
  );
}
