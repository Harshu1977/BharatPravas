import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, Mountain, Phone, Clock, Youtube } from "lucide-react";
import { CONTACT, whatsappLink } from "@/lib/site-data";
import { WhatsAppIcon } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-forest-gradient text-primary-foreground">
      <div className="pointer-events-none absolute inset-x-0 -top-1 h-16 bg-background [clip-path:polygon(0_0,100%_0,100%_10%,88%_60%,72%_20%,55%_75%,38%_25%,20%_70%,8%_30%,0_65%)]" />
      <div className="container-x grid gap-10 py-20 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid size-10 place-items-center rounded-full bg-leaf/25 ring-1 ring-gold/40">
              <Mountain className="size-5 text-gold" />
            </span>
            <span>
              <span className="block font-display text-xl font-semibold">{CONTACT.brand}</span>
              <span className="block text-[10px] uppercase tracking-[0.18em] text-gold/80">
                {CONTACT.tagline}
              </span>
            </span>
          </div>
          <p className="mt-5 max-w-sm text-sm text-primary-foreground/75">
            Premium offbeat travel experiences across Maharashtra. Safe, authentic and unforgettable
            journeys crafted by local experts.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { Icon: Instagram, href: "https://instagram.com" },
              { Icon: Facebook, href: "https://facebook.com" },
              { Icon: Youtube, href: "https://youtube.com" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="grid size-10 place-items-center rounded-full bg-white/10 transition-all hover:-translate-y-1 hover:bg-gold hover:text-accent-foreground"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterCol
          title="Destinations"
          links={[
            ["Western Ghats", "/destinations"],
            ["Coastal Maharashtra", "/destinations"],
            ["Hill Stations", "/destinations"],
            ["Heritage & Forts", "/destinations"],
            ["View All Destinations", "/destinations"],
          ]}
        />
        <FooterCol
          title="Quick Links"
          links={[
            ["All Trips", "/trips"],
            ["Women-Only Tours", "/women-only-tours"],
            ["Custom Trips", "/custom-trips"],
            ["Blogs", "/blogs"],
            ["About Us", "/about"],
          ]}
        />

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">Let's Connect!</h4>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
            <li>
              <a className="flex items-center gap-2 hover:text-gold" href={`tel:+91${CONTACT.phone}`}>
                <Phone className="size-4 text-gold" /> {CONTACT.phoneDisplay}
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2 hover:text-gold" href={`mailto:${CONTACT.email}`}>
                <Mail className="size-4 text-gold" /> {CONTACT.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="size-4 text-gold" /> {CONTACT.hours}
            </li>
          </ul>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            <WhatsAppIcon className="size-4" /> Chat on WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} {CONTACT.brand}. All rights reserved.
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">{title}</h4>
      <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/80">
        {links.map(([label, to], i) => (
          <li key={i}>
            <Link to={to} className="transition-colors hover:text-gold">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
