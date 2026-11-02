import { cn } from "@/lib/utils";

// Small abstract graphic per service — each with its own identity.
export function ServiceVisual({ index, className }: { index: number; className?: string }) {
  const common = cn("h-24 w-24 shrink-0", className);
  switch (index) {
    case 0: // management: calendar grid
      return (
        <svg viewBox="0 0 96 96" className={common} aria-hidden="true">
          <rect x="8" y="14" width="80" height="72" rx="8" className="fill-sun" />
          {[0, 1, 2, 3].map((r) => [0, 1, 2, 3].map((c) => (
            <rect key={`${r}${c}`} x={16 + c * 18} y={30 + r * 13} width="12" height="8" rx="2" className={(r + c) % 3 === 0 ? "fill-red" : "fill-ink"} />
          )))}
        </svg>
      );
    case 1: // content: play bubble
      return (
        <svg viewBox="0 0 96 96" className={common} aria-hidden="true">
          <circle cx="48" cy="48" r="40" className="fill-red" />
          <path d="M40 32l26 16-26 16z" className="fill-paper" />
          <circle cx="78" cy="18" r="10" className="fill-sun" />
        </svg>
      );
    case 2: // strategy: target arrows
      return (
        <svg viewBox="0 0 96 96" className={common} aria-hidden="true">
          <circle cx="48" cy="48" r="38" className="fill-orange" />
          <circle cx="48" cy="48" r="24" className="fill-paper" />
          <circle cx="48" cy="48" r="10" className="fill-ink" />
          <path d="M48 48L86 10" strokeWidth="5" strokeLinecap="round" className="stroke-sun" />
        </svg>
      );
    case 3: // ads: megaphone bars
      return (
        <svg viewBox="0 0 96 96" className={common} aria-hidden="true">
          {[20, 36, 52, 68].map((h, i) => (
            <rect key={h} x={10 + i * 20} y={88 - h} width="14" height={h} rx="3" className={i === 3 ? "fill-sun" : "fill-paper"} />
          ))}
        </svg>
      );
    default: // brand: sock star
      return (
        <svg viewBox="0 0 96 96" className={common} aria-hidden="true">
          <path d="M48 6l10 28h30l-24 18 9 30-25-18-25 18 9-30L8 34h30z" className="fill-sun" />
          <circle cx="48" cy="46" r="8" className="fill-ink" />
        </svg>
      );
  }
}
