import type { ComponentProps } from "react";
import { brandButton } from "./BrandButton";
import { cn } from "@/lib/utils";

export function BrandAction({ className, variant = "ink", ...props }: ComponentProps<"button"> & { variant?: "ink" | "paper" | "brand" | "outlineInk" | "outlinePaper" | "sun" }) {
  return <button className={cn(brandButton({ variant }), className)} {...props} />;
}