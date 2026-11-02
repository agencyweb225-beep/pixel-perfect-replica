import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { BrandLink } from "@/components/brand/BrandButton";
import { NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", scrolled || open ? "bg-ink/95 py-3 backdrop-blur" : "bg-transparent py-5")}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Main">
        <Link to="/" aria-label="ODD SOCKS home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <li key={n.to}>
              <Link
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                className="relative px-4 py-2 font-display text-sm uppercase tracking-wide text-paper/80 transition-colors hover:text-paper data-[status=active]:text-paper data-[status=active]:after:absolute data-[status=active]:after:inset-x-4 data-[status=active]:after:-bottom-0.5 data-[status=active]:after:h-0.5 data-[status=active]:after:bg-sun"
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden lg:block">
          <BrandLink to="/contact" variant="paper">Let's Talk</BrandLink>
        </div>
        <button
          className="rounded-full border-2 border-paper p-2 text-paper lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div className={cn("fixed inset-x-0 bottom-0 top-[64px] overflow-y-auto bg-ink pattern-sock-dark transition-all duration-300 lg:hidden", open ? "visible opacity-100" : "invisible opacity-0")}>
        <ul className="flex flex-col gap-2 px-6 pt-10">
          {NAV.map((n) => (
            <li key={n.to}>
              <Link
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                onClick={() => setOpen(false)}
                className="block py-2 font-display text-5xl uppercase text-paper/70 data-[status=active]:text-brand"
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="px-6 pt-8" onClick={() => setOpen(false)}>
          <BrandLink to="/contact" variant="sun" size="lg">Let's Talk</BrandLink>
        </div>
      </div>
    </header>
  );
}
