import type { ReactNode } from "react";
import { Dido } from "@/components/brand/Dido";

export const accountField = "w-full rounded-lg border-2 border-ink bg-paper px-4 py-3 text-ink focus:outline-none focus:ring-4 focus:ring-sun";
export const accountLabel = "mb-2 block font-display text-sm uppercase";

export function AccountFrame({ title, children }: { title: string; children: ReactNode }) {
  return <section className="bg-ink pattern-sock-dark px-5 pb-20 pt-36 text-paper">
    <div className="mx-auto max-w-5xl">
      <h1 className="text-5xl sm:text-7xl">{title}</h1>
      <div className="mt-10 grid items-start gap-12 md:grid-cols-[1.4fr_1fr]">
        <div className="min-w-0 rounded-lg border-2 border-paper bg-paper p-6 text-ink sm:p-8">{children}</div>
        <Dido className="mx-auto hidden w-48 md:block" />
      </div>
    </div>
  </section>;
}