import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Mountain } from "lucide-react";
import { CONTACT, whatsappLink } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/destinations", label: "Destinations" },
  { to: "/trips", label: "Trips" },
  { to: "/women-only-tours", label: "Women-Only Tours" },
  { to: "/custom-trips", label: "Custom Trips" },
  { to: "/about", label: "About Us" },
  { to: "/blogs", label: "Blogs" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !overlay;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid ? "bg-forest-deep/95 backdrop-blur-md shadow-soft py-2" : "py-4",
      )}
    >
      <div className="container-x flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 text-primary-foreground">
          <span className="grid size-10 place-items-center rounded-full bg-leaf/25 ring-1 ring-gold/40">
            <Mountain className="size-5 text-gold" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold">{CONTACT.brand}</span>
            <span className="block text-[10px] tracking-[0.18em] uppercase text-gold/80">
              {CONTACT.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "text-gold" }}
              className="relative text-sm font-medium text-primary-foreground/85 transition-colors hover:text-gold after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
            className="hidden size-10 place-items-center rounded-full bg-whatsapp text-white transition-transform hover:scale-110 sm:grid"
          >
            <WhatsAppIcon className="size-5" />
          </a>
          <Link
            to="/contact"
            className="hidden rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-soft transition-transform hover:scale-105 sm:block"
          >
            Book Now
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="grid size-10 place-items-center rounded-full bg-white/10 text-primary-foreground lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden bg-forest-deep/98 transition-[max-height] duration-500 lg:hidden",
          open ? "max-h-[520px]" : "max-h-0",
        )}
      >
        <nav className="container-x flex flex-col gap-1 py-4">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-primary-foreground/90 hover:bg-white/10"
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-gold px-5 py-2.5 text-center text-sm font-semibold text-accent-foreground"
          >
            Book Now
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
    </svg>
  );
}
