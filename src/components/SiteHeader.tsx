import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { CONTACT, whatsappLink } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { BrandMark } from "./Brand";

const nav = [
  { to: "/", label: "Home" },
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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || !overlay || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid ? "bg-forest-deep/95 py-2 shadow-soft backdrop-blur-md" : "py-4",
      )}
    >
      <div className="container-x flex items-center justify-between gap-3">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="flex min-w-0 items-center gap-2.5 text-primary-foreground"
        >
          <BrandMark className="size-10 sm:size-11" />
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-base font-semibold sm:text-lg">
              {CONTACT.brand}
            </span>
            <span className="block truncate text-[9px] uppercase tracking-[0.18em] text-gold/85 sm:text-[10px]">
              {CONTACT.tagline}
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
            className="grid size-10 place-items-center rounded-full bg-whatsapp text-white transition-transform hover:scale-110"
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
            aria-expanded={open}
            className="grid size-10 place-items-center rounded-full bg-white/10 text-primary-foreground transition-colors hover:bg-gold hover:text-accent-foreground"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Slide-down menu — same three-bar menu on every screen size */}
      <div
        className={cn(
          "overflow-hidden bg-forest-deep/98 transition-[max-height,opacity] duration-500",
          open ? "max-h-[620px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="container-x grid gap-1 py-4 sm:grid-cols-2">
          {nav.map((n, i) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              activeProps={{ className: "text-gold" }}
              style={{ transitionDelay: `${i * 30}ms` }}
              className={cn(
                "rounded-xl px-4 py-3 text-sm font-medium text-primary-foreground/90 transition-all duration-500 hover:bg-white/10 hover:pl-6",
                open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="container-x flex flex-wrap items-center gap-4 border-t border-white/10 py-4 text-sm text-primary-foreground/80">
          <a className="flex items-center gap-2 hover:text-gold" href={`tel:+91${CONTACT.phone}`}>
            <Phone className="size-4 text-gold" /> {CONTACT.phoneDisplay}
          </a>
          <a className="flex items-center gap-2 hover:text-gold" href={`mailto:${CONTACT.email}`}>
            <Mail className="size-4 text-gold" /> {CONTACT.email}
          </a>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="rounded-full bg-gold px-5 py-2 font-semibold text-accent-foreground sm:hidden"
          >
            Book Now
          </Link>
        </div>
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
