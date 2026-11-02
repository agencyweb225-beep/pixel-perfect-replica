import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { BrandLink } from "@/components/brand/BrandButton";
import { Dido } from "@/components/brand/Dido";
import { PageHero, Reveal } from "@/components/brand/Reveal";
import { ServiceVisual } from "@/components/sections/ServiceVisual";
import { CtaBand } from "@/components/sections/CtaBand";
import { SERVICES } from "@/lib/services";
import { cn } from "@/lib/utils";

const TITLE = "Services | ODD SOCKS Social Media Marketing";
const DESC = "Social media management, content creation, strategy, paid advertising and brand development from ODD SOCKS.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Services,
});

const THEMES = [
  { wrap: "bg-paper text-ink", accent: "text-red", card: "border-ink", muted: "text-ink/75", btn: "ink" as const },
  { wrap: "bg-ink text-paper pattern-sock-dark", accent: "text-orange", card: "border-paper/30", muted: "text-paper/75", btn: "brand" as const },
  { wrap: "bg-brand text-paper", accent: "text-ink", card: "border-paper/60", muted: "text-paper/90", btn: "ink" as const },
  { wrap: "bg-paper text-ink pattern-sock-paper", accent: "text-red", card: "border-ink", muted: "text-ink/75", btn: "brand" as const },
  { wrap: "bg-ink text-paper", accent: "text-sun", card: "border-paper/30", muted: "text-paper/75", btn: "sun" as const },
];

function Services() {
  return (
    <>
      <PageHero title="Creative work. Smart strategy. Better connections." sub="Everything your brand needs to stand out.">
        <nav aria-label="Services" className="hidden lg:block">
          <ul className="space-y-2">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <a href={`#${s.slug}`} className="flex items-baseline gap-3 font-display text-lg uppercase text-paper/85 hover:text-ink">
                  <span className="text-sm text-ink">{s.no}</span>{s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {SERVICES.map((s, i) => {
        const t = THEMES[i % THEMES.length]!;
        const flip = i % 2 === 1;
        return (
          <section key={s.slug} id={s.slug} className={cn("scroll-mt-20 py-24 sm:py-32", t.wrap)}>
            <div className={cn("mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20", flip && "lg:[&>*:first-child]:order-2")}>
              <Reveal>
                <div className="flex items-start justify-between gap-6">
                  <span className={cn("font-display text-8xl leading-none sm:text-9xl", t.accent)}>{s.no}</span>
                  <ServiceVisual index={i} className="h-24 w-24 sm:h-32 sm:w-32" />
                </div>
                <h2 className="mt-6 text-5xl sm:text-6xl">{s.title}</h2>
                <p className={cn("mt-4 font-hand text-2xl", t.accent)}>{s.short}</p>
                <p className={cn("mt-6 text-lg leading-relaxed", t.muted)}><strong>What it involves: </strong>{s.involves}</p>
                <p className={cn("mt-4 text-lg leading-relaxed", t.muted)}><strong>Why it matters: </strong>{s.why}</p>
                <BrandLink to="/contact" variant={t.btn} className="mt-8">Let's talk about your brand</BrandLink>
              </Reveal>
              <Reveal delay={0.1} className="space-y-6">
                <div className={cn("rounded-2xl border-2 p-7", t.card)}>
                  <h3 className="text-2xl">What you receive</h3>
                  <ul className="mt-4 space-y-3">
                    {s.receive.map((r) => (
                      <li key={r} className="flex gap-3"><Check className={cn("mt-1 h-5 w-5 shrink-0", t.accent)} />{r}</li>
                    ))}
                  </ul>
                </div>
                <div className={cn("rounded-2xl border-2 p-7", t.card)}>
                  <h3 className="text-2xl">How it works</h3>
                  <ol className="mt-4 grid gap-4 sm:grid-cols-2">
                    {s.process.map((p, k) => (
                      <li key={p} className="flex gap-3">
                        <span className={cn("font-display text-2xl", t.accent)}>{k + 1}</span>
                        <span className={t.muted}>{p}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {s.items.map((it) => (
                    <li key={it} className={cn("rounded-full border-2 px-3 py-1 font-display text-xs uppercase", t.card)}>{it}</li>
                  ))}
                </ul>
                {i === 2 && <Dido say="YOUR BRAND DESERVES BETTER." bubbleSide="left" className="ml-auto w-32" />}
              </Reveal>
            </div>
          </section>
        );
      })}
      <CtaBand />
    </>
  );
}
