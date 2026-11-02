import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { BrandLink } from "@/components/brand/BrandButton";
import { Reveal } from "@/components/brand/Reveal";
import { getProject } from "@/lib/projects";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    const title = p ? `${p.name} (Concept) | ODD SOCKS Work` : "Project not found | ODD SOCKS";
    const desc = p?.short ?? "This project could not be found.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        ...(p ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { project: p } = Route.useLoaderData();
  return (
    <>
      <section className="bg-ink pattern-sock-dark pb-16 pt-32 text-paper sm:pt-40">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Link to="/work" className="inline-flex items-center gap-2 font-display text-sm uppercase text-paper/70 hover:text-paper">
            <ArrowLeft className="h-4 w-4" /> All work
          </Link>
          <Reveal>
            {p.concept && <p className="mt-8 inline-block rounded-full bg-sun px-3 py-1 font-display text-xs uppercase text-ink">Concept project · fictional brand</p>}
            <h1 className="mt-4 text-6xl sm:text-8xl">{p.name}</h1>
            <p className="mt-4 font-hand text-3xl text-orange">{p.industry}</p>
          </Reveal>
        </div>
      </section>
      <section className="bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <img src={p.image} alt={p.name} width={p.width} height={p.height} className="max-h-[80vh] w-full rounded-2xl border-2 border-ink object-cover" />
          <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.5fr]">
            <dl className="space-y-6">
              <div><dt className="font-display text-xs uppercase text-muted-foreground">Industry</dt><dd className="mt-1 text-xl">{p.industry}</dd></div>
              <div><dt className="font-display text-xs uppercase text-muted-foreground">Services delivered</dt><dd className="mt-1 text-xl">{p.services.join(", ")}</dd></div>
              <div><dt className="font-display text-xs uppercase text-muted-foreground">Results</dt><dd className="mt-1">{p.results ?? "Concept project — no performance results reported."}</dd></div>
            </dl>
            <div className="space-y-10">
              <div><h2 className="text-4xl">Overview</h2><p className="mt-4 text-lg text-ink/80">{p.overview}</p></div>
              <div>
                <h2 className="text-4xl">Objectives</h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-lg text-ink/80">{p.objectives.map((o) => <li key={o}>{o}</li>)}</ul>
              </div>
              <div><h2 className="text-4xl">Creative direction</h2><p className="mt-4 text-lg text-ink/80">{p.direction}</p></div>
            </div>
          </div>
          <h2 className="mt-20 text-4xl">Gallery</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {p.gallery.map((g, i) => (
              <img key={i} src={g} alt={`${p.name} visual ${i + 1}`} loading="lazy" className="aspect-[4/3] w-full rounded-xl border-2 border-ink object-cover" />
            ))}
          </div>
          <div className="mt-16 flex flex-wrap gap-3">
            <BrandLink to="/contact" variant="brand" size="lg">Start a project</BrandLink>
            <BrandLink to="/work" variant="outlineInk" size="lg" arrow={false}>Back to all work</BrandLink>
          </div>
        </div>
      </section>
    </>
  );
}
