import dido from "@/assets/dido.webp";
import { cn } from "@/lib/utils";

// Dido — the official ODD SOCKS sock-puppet character (from the brand guidelines).
export function Dido({
  className,
  say,
  bubbleSide = "left",
  float = true,
  eager = false,
}: {
  className?: string;
  say?: string;
  bubbleSide?: "left" | "right";
  float?: boolean;
  eager?: boolean;
}) {
  return (
    <div className={cn("relative", className)}>
      {say && (
        <div
          className={cn(
            "absolute top-[6%] z-10 w-max max-w-[11rem] rounded-2xl border-2 border-ink bg-paper px-4 py-2 font-hand text-lg leading-tight text-ink shadow-pop",
            bubbleSide === "left" ? "right-[78%]" : "left-[78%]",
          )}
        >
          {say}
        </div>
      )}
      <img
        src={dido}
        alt="Dido, the ODD SOCKS striped sock-puppet mascot"
        width={560}
        height={1155}
        loading={eager ? "eager" : "lazy"}
        className={cn("h-auto w-full select-none drop-shadow-2xl", float && "animate-float")}
        draggable={false}
      />
    </div>
  );
}
