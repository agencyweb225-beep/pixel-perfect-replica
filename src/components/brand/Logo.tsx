import { cn } from "@/lib/utils";

// Temporary logo: sock symbol + ODD SOCKS wordmark.
// Replace <SockMark/> with the official logo file when supplied.
export function SockMark({ className, circle = false }: { className?: string; circle?: boolean }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {circle && <circle cx="24" cy="24" r="22" strokeWidth={2.5} />}
      <g transform={circle ? "translate(9 7) scale(0.6)" : "translate(3 1) scale(0.88)"}>
        <path d="M20 4l16 3-1.4 8-16-3z" />
        <path d="M24 5l-1.2 7.6M28 5.8l-1.2 7.6M32 6.6l-1.2 7.6" />
        <path d="M18.6 12l-2.6 17-10 10a7 7 0 0 0 10 10l14-10.5L34.6 15" />
        <path d="M8 36a8 8 0 0 1 6 10M30 30a7 7 0 0 0-4 9" />
      </g>
    </svg>
  );
}

export function Logo({ className, tone = "paper" }: { className?: string; tone?: "paper" | "ink" }) {
  return (
    // padding = clear space ≈ height of the letter O
    <span className={cn("inline-flex items-center gap-2 p-1", tone === "paper" ? "text-paper" : "text-ink", className)}>
      <SockMark className="h-8 w-8" />
      <span className="font-display text-xl leading-none tracking-tight">ODD SOCKS</span>
    </span>
  );
}
