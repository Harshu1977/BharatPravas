import { Link } from "@tanstack/react-router";
import { CalendarDays, Users } from "lucide-react";
import type { Trip } from "@/lib/site-data";

export function TripCard({ trip }: { trip: Trip }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-card shadow-soft ring-1 ring-border/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-card hover:ring-gold/40">
      <div className="img-vignette relative aspect-[4/3] overflow-hidden">
        <img
          src={trip.image}
          alt={trip.title}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.12]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-gold-gradient px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-accent-foreground shadow-soft">
          {trip.badge}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold leading-snug">{trip.title}</h3>
        <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {trip.category}
        </p>
        <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <CalendarDays className="size-3.5 text-leaf" /> {trip.dates}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-4">
          <span className="font-display text-xl font-semibold text-forest">
            ₹{trip.price.toLocaleString("en-IN")}
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-gold">
            <Users className="size-3.5" /> {trip.seats} Seats Left
          </span>
        </div>
        <Link
          to="/trips/$slug"
          params={{ slug: trip.slug }}
          className="sheen mt-4 block rounded-full bg-forest px-4 py-3 text-center text-sm font-semibold tracking-wide text-primary-foreground transition-all duration-300 hover:bg-forest-deep"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
