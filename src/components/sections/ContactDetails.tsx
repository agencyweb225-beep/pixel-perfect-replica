import { SITE } from "@/lib/site";

export function ContactDetails() {
  return (
    <ul className="mt-8 space-y-3">
      {SITE.phones.map((p) => (
        <li key={p}>
          <a href={`tel:${p}`} className="font-display text-2xl underline-offset-4 hover:text-red hover:underline sm:text-3xl">{p}</a>
        </li>
      ))}
      <li>
        <a href={`mailto:${SITE.email}`} className="break-all font-display text-xl underline-offset-4 hover:text-red hover:underline sm:text-2xl">{SITE.email}</a>
      </li>
    </ul>
  );
}
