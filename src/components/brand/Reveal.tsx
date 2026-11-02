import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({ children, delay = 0, className, y = 28 }: { children: ReactNode; delay?: number; className?: string | undefined; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  title,
  sub,
  tone = "ink",
  as: Tag = "h2",
  className,
}: {
  title: ReactNode;
  sub?: ReactNode;
  tone?: "ink" | "paper";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <Tag className={`text-5xl sm:text-6xl lg:text-7xl ${tone === "paper" ? "text-paper" : "text-ink"}`}>{title}</Tag>
      {sub && <p className={`mt-4 font-hand text-2xl sm:text-3xl ${tone === "paper" ? "text-sun" : "text-red"}`}>{sub}</p>}
    </Reveal>
  );
}

export function PageHero({ title, sub, intro, children }: { title: ReactNode; sub: ReactNode; intro?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-brand grain">
      <div className="pattern-sock-light pattern-drift absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl items-end gap-10 px-5 pb-20 pt-36 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:pb-28 lg:pt-44">
        <div>
          <SectionHeading as="h1" title={title} sub={sub} tone="paper" className="[&_h1]:text-6xl sm:[&_h1]:text-7xl lg:[&_h1]:text-8xl [&_p]:!text-ink" />
          {intro && (
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper">{intro}</p>
            </Reveal>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
