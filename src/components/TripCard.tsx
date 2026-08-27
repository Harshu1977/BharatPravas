import { Link } from "@tanstack/react-router";
import { CalendarDays, Users } from "lucide-react";
import type { Trip } from "@/lib/site-data";

export function TripCard({ trip }: { trip: Trip }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={trip.image}
          alt={trip.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-[10px] font-bold tracking-wider text-accent-foreground">
          {trip.badge}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-semibold">{trip.title}</h3>
        <p className="text-xs text-muted-foreground">{trip.category}</p>
        <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <CalendarDays className="size-3.5 text-leaf" /> {trip.dates}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-display text-lg font-semibold text-forest">
            ₹{trip.price.toLocaleString("en-IN")}
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-gold">
            <Users className="size-3.5" /> {trip.seats} Seats Left
          </span>
        </div>
        <Link
          to="/trips/$slug"
          params={{ slug: trip.slug }}
          className="mt-4 block rounded-lg bg-forest px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-forest-deep"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
