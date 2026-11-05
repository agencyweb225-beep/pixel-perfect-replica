import dido from "@/assets/dido.webp";
import { cn } from "@/lib/utils";

// Dido — the official ODD SOCKS sock-puppet character (from the brand guidelines).
export function Dido({
  className,
  say,
  bubbleSide = "left",
  bubbleClassName,
  float = true,
  eager = false,
}: {
  className?: string;
  say?: string;
  bubbleSide?: "left" | "right" | "top";
  bubbleClassName?: string;
  float?: boolean;
  eager?: boolean;
}) {
  return (
    <div className={cn("relative", className)}>
      {say && (
        <div
          className={cn(
            "absolute z-10 w-max max-w-[11rem]",
            bubbleSide === "top" ? "bottom-[105%] left-1/2 -translate-x-1/2" : bubbleSide === "left" ? "top-[6%] right-[78%]" : "top-[6%] left-[78%]",
          )}
        >
          <div className={cn("animate-float rounded-2xl border-2 border-ink bg-paper px-4 py-2 text-center font-hand text-lg leading-tight text-ink shadow-pop", bubbleClassName)}>
            {say}
          </div>
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
