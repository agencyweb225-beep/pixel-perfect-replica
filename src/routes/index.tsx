import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Lightbulb, Compass, Repeat, HeartHandshake } from "lucide-react";
import { Dido } from "@/components/brand/Dido";
import { SockMark } from "@/components/brand/Logo";
import { BrandLink } from "@/components/brand/BrandButton";
import { Reveal, SectionHeading } from "@/components/brand/Reveal";
import { ServiceVisual } from "@/components/sections/ServiceVisual";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { ContactForm } from "@/components/sections/ContactForm";
import { SERVICES } from "@/lib/services";
import { PROJECTS, type Project } from "@/lib/projects";
import { SITE } from "@/lib/site";
import { ContactDetails } from "@/components/sections/ContactDetails";

const TITLE = "ODD SOCKS | Creative Social Media Marketing Agency";
const DESC =
  "ODD SOCKS helps businesses grow their digital presence through creative social media marketing, content creation, strategy, and digital campaigns. Odd stands out.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Intro />
      <ServicesOverview />
      <Why />
      <Process />
      <SelectedWork />
      <CtaBand />
      <ContactSection />
    </>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  const line = (d: number) => ({
    initial: reduce ? false : { y: "110%" },
    animate: { y: 0 },
    transition: { duration: 0.9, delay: d, ease: [0.2, 0.8, 0.2, 1] as const },
  });
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-brand grain text-paper">
      <div className="pattern-sock-light pattern-drift absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl items-center px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-[1.35fr_1fr]">
        <div className="relative z-10">
          <motion.p {...line(0)} className="font-hand text-2xl text-ink sm:text-3xl">{SITE.tagline}</motion.p>
          <h1 className="mt-4 text-[clamp(4rem,13vw,11rem)] leading-[0.85]">
            <span className="block overflow-hidden"><motion.span {...line(0.1)} className="block">Odd</motion.span></span>
            <span className="block overflow-hidden"><motion.span {...line(0.2)} className="block">stands</motion.span></span>
            <span className="block overflow-hidden"><motion.span {...line(0.3)} className="block text-paper">out.</motion.span></span>
          </h1>
          <Reveal delay={0.5}>
            <p className="mt-8 max-w-[70%] text-lg leading-relaxed sm:max-w-lg">
              We help brands find their voice, create meaningful connections, and stand out in a crowded digital world through creative social media marketing.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <BrandLink to="/contact" variant="ink" size="lg">Let's work together</BrandLink>
              <BrandLink to="/work" variant="outlinePaper" size="lg">Explore our work</BrandLink>
            </div>
          </Reveal>
        </div>
        <motion.div
          initial={reduce ? false : { y: 200, opacity: 0, rotate: 8 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="pointer-events-none absolute -bottom-16 right-0 w-[40vw] max-w-[440px] sm:right-8 lg:relative lg:bottom-auto lg:right-auto lg:mx-auto lg:translate-x-16 lg:w-full lg:max-w-[400px] lg:-mb-24 lg:self-end"
        >
          <Dido say="HEY! YOU FOUND US." eager className="[&>div]:hidden sm:[&>div]:block" />
        </motion.div>
      </div>
      <SockMark className="absolute left-[46%] top-28 hidden h-14 w-14 animate-wiggle text-sun lg:block" />
    </section>
  );
}

function Marquee() {
  const words = ["Social media", "Content", "Strategy", "Paid ads", "Branding", "Odd stands out"];
  return (
    <div className="overflow-hidden border-y-2 border-ink bg-sun py-4 text-ink" aria-hidden="true">
      <div className="marquee flex w-max gap-10 whitespace-nowrap font-display text-2xl uppercase">
        {[...words, ...words, ...words, ...words].map((w, i) => (
          <span key={i} className="flex items-center gap-10">{w}<SockMark className="h-7 w-7" /></span>
        ))}
      </div>
    </div>
  );
}

function Intro() {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div>
          <SectionHeading title={<>We're a little <span className="text-brand">different.</span></>} sub="And that's exactly the point." />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/80">
              At ODD SOCKS, we believe every brand has a story worth telling. Our job is to make sure people notice it. We combine creativity, thoughtful strategy, and digital marketing to help businesses build stronger connections with their audiences.
            </p>
            <BrandLink to="/about" variant="outlineInk" className="mt-8">Get to know us</BrandLink>
          </Reveal>
        </div>
        <Reveal delay={0.2} className="relative mx-auto aspect-square w-full max-w-md">
          <div className="absolute inset-0 overflow-hidden rounded-full bg-brand">
            <div className="pattern-sock-light absolute inset-0" />
          </div>
          <div className="absolute inset-[12%] overflow-hidden rounded-full bg-paper pattern-sock-paper">
            <div className="absolute -bottom-4 left-1/2 w-[48%] -translate-x-1/2 rotate-6"><Dido float={false} className="animate-wiggle origin-bottom" /></div>
          </div>
          <p className="absolute left-0 top-6 -rotate-6 rounded-full border-2 border-ink bg-sun px-4 py-2 font-hand text-xl text-ink">one of a kind</p>
          <SockMark className="absolute right-6 top-10 h-16 w-16 rotate-12 text-paper" />
        </Reveal>
      </div>
    </section>
  );
}

function ServicesOverview() {
  const accents = ["bg-sun text-ink", "bg-red text-paper", "bg-orange text-ink", "bg-ink-soft text-paper", "bg-brand text-paper"];
  return (
    <section id="services" className="bg-ink py-24 text-paper sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading tone="paper" title="What we do." sub="We make your brand hard to ignore." />
          <BrandLink to="/services" variant="paper">Explore all services</BrandLink>
        </div>
        <ol className="mt-16 border-t border-paper/20">
          {SERVICES.map((s, i) => (
            <li key={s.slug}>
              <Reveal delay={i * 0.05}>
                <Link to="/services" hash={s.slug} className="group grid items-center gap-6 border-b border-paper/20 py-8 transition-colors md:grid-cols-[110px_1fr_1.1fr_auto] md:py-10">
                  <span className="font-display text-6xl text-paper/20 transition-colors group-hover:text-orange">{s.no}</span>
                  <h3 className="text-3xl transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl">{s.title}</h3>
                  <div>
                    <p className="text-paper/70">{s.short}</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {s.items.slice(0, 3).map((it) => (
                        <li key={it} className={`rounded-full px-3 py-1 text-xs font-display uppercase ${accents[i]}`}>{it}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center gap-4 justify-self-end">
                    <ServiceVisual index={i} className="h-16 w-16 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
                    <ArrowUpRight className="h-8 w-8 text-paper/40 transition-all group-hover:rotate-45 group-hover:text-paper" />
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const FEATURES = [
  { icon: Lightbulb, t: "Creative thinking", d: "Fresh ideas and original content that help your brand stand out." },
  { icon: Compass, t: "Strategic approach", d: "Creative decisions backed by research, planning, and business objectives." },
  { icon: Repeat, t: "Consistent execution", d: "Reliable content planning and communication that keeps your brand active." },
  { icon: HeartHandshake, t: "Audience connection", d: "Meaningful digital experiences that help brands connect with the right people." },
];

function Why() {
  return (
    <section className="relative overflow-hidden bg-paper py-24 sm:py-32">
      <div className="pattern-sock-paper absolute inset-y-0 right-0 w-1/2" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading title={<>Why be <span className="text-brand">ordinary?</span></>} sub="There's enough of that already." />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-ink/80">
              We don't believe in one-size-fits-all marketing. Every brand has its own personality, audience, and ambitions. We approach every project with creativity, strategy, and an understanding of what makes that business different.
            </p>
          </Reveal>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {FEATURES.map((f, i) => (
            <Reveal key={f.t} delay={i * 0.08} className={i % 2 === 1 ? "sm:translate-y-12" : ""}>
              <div className="h-full rounded-2xl border-2 border-ink bg-paper p-7 transition-all hover:-translate-y-1 hover:shadow-pop">
                <div className="flex items-center justify-between">
                  <f.icon className="h-9 w-9 text-red" />
                  <span className="font-display text-sm text-ink/30">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-2xl">{f.t}</h3>
                <p className="mt-3 text-ink/75">{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { t: "Discover", d: "We learn about your business, audience, goals, and challenges." },
  { t: "Strategize", d: "We develop a marketing direction and content plan suited to your brand." },
  { t: "Create", d: "We produce the creative content and campaigns that bring the strategy to life." },
  { t: "Grow", d: "We monitor performance, learn from results, and continuously improve." },
];

function Process() {
  return (
    <section className="relative overflow-hidden bg-brand grain py-24 text-paper sm:py-32">
      <div className="pattern-sock-light absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading tone="paper" title="From idea to impact." sub={<span className="text-ink">Good things start with a conversation.</span>} />
        <ol className="relative mt-16 grid gap-10 border-l-2 border-paper/60 pl-8 md:grid-cols-4 md:gap-6 md:border-l-0 md:border-t-2 md:pl-0 md:pt-10">
          {STEPS.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.12}>
              <li className="relative">
                <span className="absolute -left-[46px] top-1 grid h-7 w-7 place-items-center rounded-full border-2 border-ink bg-sun md:-top-[58px] md:left-0" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-ink" />
                </span>
                <p className="font-display text-sm text-ink">STEP 0{i + 1}</p>
                <h3 className="mt-2 text-4xl">{s.t}</h3>
                <p className="mt-3 max-w-xs text-paper/90">{s.d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function SelectedWork() {
  const [a, b, c, d] = PROJECTS as [Project, Project, Project, Project];
  return (
    <section className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading title={<>Things we've been <span className="text-brand">making.</span></>} sub="Creativity looks good on every brand." />
          <p className="max-w-xs text-sm text-muted-foreground">These are concept projects with fictional brands, showing the kind of work we create.</p>
        </div>
        <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-7"><ProjectCard p={a} /></Reveal>
          <Reveal delay={0.1} className="md:col-span-5 md:mt-32"><ProjectCard p={b} /></Reveal>
          <Reveal className="md:col-span-5"><ProjectCard p={d} /></Reveal>
          <Reveal delay={0.1} className="md:col-span-7 md:mt-24"><ProjectCard p={c} /></Reveal>
        </div>
        <div className="mt-16 text-center">
          <BrandLink to="/work" variant="ink" size="lg">View all projects</BrandLink>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="bg-paper pattern-sock-paper py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <SectionHeading title={<>Let's get a little <span className="text-brand">odd.</span></>} />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lg text-ink/80">Tell us about your business, your goals, and what you want to achieve. We'd love to hear from you.</p>
            <ContactDetails />
          </Reveal>
        </div>
        <Reveal delay={0.15}><ContactForm /></Reveal>
      </div>
    </section>
  );
}
