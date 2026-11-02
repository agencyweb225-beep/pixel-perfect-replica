// Central place for agency contact details and social links.
// Social URLs are placeholders until the real accounts are provided.
export const SITE = {
  name: "ODD SOCKS",
  slogan: "ODD STANDS OUT.",
  tagline: "WE GROW YOUR STORY ONLINE.",
  phones: ["01600955701", "01319339722"],
  email: "oddsocksagency@gmail.com",
  socials: [
    { label: "Facebook", href: "https://facebook.com/" },
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
  ],
} as const;

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Our Work" },
  { to: "/contact", label: "Contact" },
] as const;
