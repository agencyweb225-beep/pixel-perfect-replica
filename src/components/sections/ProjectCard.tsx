import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function ProjectCard({ p, className }: { p: Project; className?: string }) {
  return (
    <Link to="/work/$slug" params={{ slug: p.slug }} className={cn("group block", className)}>
      <div className="relative overflow-hidden rounded-xl border-2 border-ink">
        <img
          src={p.image}
          alt={`${p.name} — ${p.short}`}
          width={p.width}
          height={p.height}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {p.concept && (
          <span className="absolute left-3 top-3 rounded-full border-2 border-ink bg-sun px-3 py-1 font-display text-[10px] uppercase tracking-wider text-ink">
            Concept project
          </span>
        )}
        <span className="absolute bottom-3 right-3 rounded-full bg-paper p-3 text-ink opacity-0 transition-all group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>
      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-2xl sm:text-3xl">{p.name}</h3>
        <span className="font-hand text-lg text-red">{p.industry}</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{p.services.join(" · ")}</p>
      <p className="mt-2 max-w-md">{p.short}</p>
    </Link>
  );
}
