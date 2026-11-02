import { createFileRoute } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { Dido } from "@/components/brand/Dido";
import { PageHero, Reveal } from "@/components/brand/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { SITE } from "@/lib/site";

const TITLE = "Contact ODD SOCKS | Let's Make Something Happen";
const DESC = "Call, email or send a message to ODD SOCKS to start your next social media project.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Contact,
});

const icons = { Facebook, Instagram, LinkedIn: Linkedin } as const;

function Contact() {
  return (
    <>
      <PageHero title="Let's make something happen." sub="Your next big idea starts here.">
        <Dido say="READY TO GROW?" className="mx-auto hidden w-52 lg:block lg:-mb-32" eager />
      </PageHero>
      <section className="bg-paper py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.5fr]">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl">Talk to a human.</h2>
            <p className="mt-3 font-hand text-2xl text-red">Or a sock. We're flexible.</p>
            <ContactDetails />
            <div className="mt-8 flex gap-3">
              {SITE.socials.map((s) => {
                const Icon = icons[s.label];
                return (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="rounded-full border-2 border-ink p-3 transition-colors hover:bg-ink hover:text-paper">
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </Reveal>
          <Reveal delay={0.1}><ContactForm /></Reveal>
        </div>
      </section>
    </>
  );
}
