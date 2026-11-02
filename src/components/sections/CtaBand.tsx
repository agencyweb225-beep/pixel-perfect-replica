import { Dido } from "@/components/brand/Dido";
import { BrandLink } from "@/components/brand/BrandButton";
import { Reveal } from "@/components/brand/Reveal";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-ink pattern-sock-dark py-28 text-paper sm:py-36">
      <div className="absolute -left-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-brand opacity-30 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <h2 className="max-w-4xl text-5xl sm:text-7xl lg:text-8xl">
            Your brand has a story. <span className="text-brand">Let's make people listen.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-lg text-lg text-paper/80">Have something in mind? Let's talk about what we can create together.</p>
          <BrandLink to="/contact" variant="brand" size="lg" className="mt-8 border-paper">Start a project</BrandLink>
        </Reveal>
      </div>
      <Dido say="READY TO GROW?" className="absolute -bottom-24 right-[-2rem] hidden w-56 rotate-[-12deg] md:block lg:w-72" />
    </section>
  );
}
