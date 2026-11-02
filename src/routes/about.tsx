import { createFileRoute } from "@tanstack/react-router";
import { Dido } from "@/components/brand/Dido";
import { BrandLink } from "@/components/brand/BrandButton";
import { PageHero, Reveal, SectionHeading } from "@/components/brand/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";

const TITLE = "About ODD SOCKS | Not Built to Blend In";
const DESC = "Meet ODD SOCKS, a creative social media marketing agency built around one idea: brands deserve to be remembered.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: About,
});

const DIFFERENT = [
  { t: "Personality first", d: "We start with what makes you, you — then build everything around it." },
  { t: "Strategy behind the fun", d: "Playful work, serious thinking. Every idea answers to a goal." },
  { t: "Made, not templated", d: "No copy-paste calendars. Each brand gets its own direction." },
  { t: "Honest by default", d: "No inflated promises. Clear plans, clear communication." },
];

function About() {
  return (
    <>
      <PageHero
        title="Not built to blend in."
        sub="We're ODD SOCKS. And we like it that way."
        intro="ODD SOCKS is a creative social media marketing agency built around one simple idea: brands deserve to be remembered. We help businesses communicate their identity, connect with their audiences, and grow their digital presence through creative thinking and strategic marketing."
      >
        <Dido say="LET'S MAKE SOMETHING ODD." bubbleSide="top" className="mx-auto hidden w-56 lg:block lg:-mb-32" eager />
      </PageHero>

      <section className="bg-paper py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <SectionHeading title="Our story." sub="It started with a mismatched pair." />
            <Reveal delay={0.1}>
              <p className="mt-8 text-lg leading-relaxed text-ink/80">
                Odd socks are the ones you notice. They don't match the rules, and that's what makes them memorable. We named ourselves after that feeling, because it's exactly what we want for the brands we work with: to be the one people notice in a feed full of sameness.
              </p>
            </Reveal>
          </div>
          <div>
            <SectionHeading title="Our philosophy." sub={<>Odd stands out.</>} />
            <Reveal delay={0.1}>
              <p className="mt-8 text-lg leading-relaxed text-ink/80">
                Fitting in is easy. Standing out takes courage, creativity and a clear plan. We believe the things that make your business different are your biggest strengths online — our job is to bring them to the surface.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ink pattern-sock-dark py-24 text-paper sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading tone="paper" title="What makes us different." sub="Four things we won't compromise on." />
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-paper/20 bg-paper/20 md:grid-cols-2">
            {DIFFERENT.map((x, i) => (
              <Reveal key={x.t} delay={i * 0.06} className="bg-ink p-8 sm:p-10">
                <span className="font-display text-5xl text-brand">0{i + 1}</span>
                <h3 className="mt-4 text-3xl">{x.t}</h3>
                <p className="mt-3 text-paper/70">{x.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand grain py-24 text-paper sm:py-32">
        <div className="pattern-sock-light absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 md:grid-cols-[1fr_1.4fr]">
          <Dido className="mx-auto w-48 sm:w-64" />
          <div>
            <SectionHeading tone="paper" title="Meet Dido." sub={<span className="text-ink">Our sock puppet. Our messenger.</span>} />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed">
                Dido is the ODD SOCKS brand character — a striped sock puppet with big googly eyes and even bigger opinions. Dido connects the "odd" to the brand and delivers our messages in a fun way. You'll spot Dido popping up around this site, keeping things friendly and a little bit weird.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <SectionHeading title="Our approach." sub="Listen. Plan. Create. Improve." />
            <Reveal delay={0.1}>
              <p className="mt-8 text-lg leading-relaxed text-ink/80">
                Every project begins with a conversation about your business, your audience and what success looks like to you. From there we shape a direction, make the work, and keep learning from how people respond.
              </p>
            </Reveal>
          </div>
          <div>
            <SectionHeading title="Our commitment." sub="Care, honesty, and real effort." />
            <Reveal delay={0.1}>
              <p className="mt-8 text-lg leading-relaxed text-ink/80">
                We won't promise overnight fame or guaranteed numbers. What we do promise is thoughtful work, clear communication and a team that genuinely cares about your brand.
              </p>
              <BrandLink to="/contact" variant="ink" className="mt-8">Let's talk</BrandLink>
            </Reveal>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
