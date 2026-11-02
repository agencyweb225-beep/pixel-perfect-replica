import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Reveal } from "@/components/brand/Reveal";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { CATEGORIES, PROJECTS } from "@/lib/projects";
import { cn } from "@/lib/utils";

const TITLE = "Our Work | ODD SOCKS Portfolio";
const DESC = "A look at the social media, content, branding and advertising work ODD SOCKS creates.";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Work,
});

function Work() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All Projects");
  const list = cat === "All Projects" ? PROJECTS : PROJECTS.filter((p) => p.categories.includes(cat));
  return (
    <>
      <PageHero title="Our work speaks. Well, mostly." sub="A little look at what we create." />
      <section className="bg-paper py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="mb-6 max-w-xl text-sm text-muted-foreground">
            The projects shown are concept work using fictional brands. Real client case studies will appear here as they're published.
          </p>
          <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={cat === c}
                onClick={() => setCat(c)}
                className={cn(
                  "rounded-full border-2 border-ink px-4 py-2 font-display text-xs uppercase tracking-wide transition-colors",
                  cat === c ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-sun",
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-10">
            {list.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 0.1} className={i % 2 === 1 ? "md:mt-24" : ""}>
                <ProjectCard p={p} />
              </Reveal>
            ))}
          </div>
          {list.length === 0 && <p className="mt-10 font-hand text-2xl">Nothing here yet — check back soon.</p>}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
