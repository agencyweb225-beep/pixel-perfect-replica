import { Link } from "@tanstack/react-router";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const brandButton = cva(
  "group inline-flex items-center justify-center gap-2 rounded-full border-2 px-6 py-3 font-display text-sm uppercase tracking-wide transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sun disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        ink: "border-ink bg-ink text-paper hover:shadow-pop-paper",
        paper: "border-paper bg-paper text-ink hover:shadow-pop",
        outlinePaper: "border-paper bg-transparent text-paper hover:bg-paper hover:text-ink",
        outlineInk: "border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
        brand: "border-ink bg-brand text-paper hover:shadow-pop",
        sun: "border-ink bg-sun text-ink hover:shadow-pop",
      },
      size: { md: "", lg: "px-8 py-4 text-base" },
    },
    defaultVariants: { variant: "ink", size: "md" },
  },
);

type Props = VariantProps<typeof brandButton> & { className?: string; children: ReactNode; arrow?: boolean };

export function BrandLink({ to, hash, variant, size, className, children, arrow = true }: Props & { to: ComponentProps<typeof Link>["to"]; hash?: string }) {
  return (
    <Link to={to as string} {...(hash ? { hash } : {})} className={cn(brandButton({ variant, size }), className)}>
      {children}
      {arrow && <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />}
    </Link>
  );
}
