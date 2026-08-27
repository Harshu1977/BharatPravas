import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CalendarDays, Check, Gauge, MapPin, Timer, Users } from "lucide-react";
import { Page } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { TripCard } from "@/components/TripCard";
import { WhatsAppIcon } from "@/components/SiteHeader";
import { CONTACT, trips, whatsappLink } from "@/lib/site-data";

export const Route = createFileRoute("/trips/$slug")({
  loader: ({ params }) => {
    const trip = trips.find((t) => t.slug === params.slug);
    if (!trip) throw notFound();
    return { trip };
  },
  head: ({ loaderData }) => {
    const trip = loaderData?.trip;
    const title = trip ? `${trip.title} | BharatPravas` : "Trip | BharatPravas";
    const description = trip?.summary ?? "Small-group trips across Maharashtra.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: TripDetail,
});

function TripDetail() {
  const { trip } = Route.useLoaderData();
  const related = trips.filter((t) => t.slug !== trip.slug).slice(0, 3);

  return (
    <Page>
      <section className="relative flex min-h-[60vh] items-end overflow-hidden pb-14 pt-32">
        <img src={trip.image} alt={trip.title} className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/70 to-forest-deep/30" />
        <div className="container-x relative">
          <Reveal>
            <span className="rounded-full bg-gold px-3 py-1 text-[10px] font-bold tracking-wider text-accent-foreground">
              {trip.badge}
            </span>
            <h1 className="mt-4 text-4xl font-semibold text-primary-foreground md:text-5xl">{trip.title}</h1>
            <p className="mt-3 max-w-2xl text-primary-foreground/80">{trip.summary}</p>
          </Reveal>
        </div>
      </section>

      <section className="container-x grid gap-10 py-14 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <Reveal>
            <div className="grid grid-cols-2 gap-4 rounded-2xl bg-card p-6 shadow-soft sm:grid-cols-4">
              <Fact Icon={CalendarDays} label="Dates" value={trip.dates} />
              <Fact Icon={Timer} label="Duration" value={trip.duration} />
              <Fact Icon={Gauge} label="Difficulty" value={trip.difficulty} />
              <Fact Icon={MapPin} label="Region" value={trip.region} />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-10 text-2xl font-semibold">Trip Highlights</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {trip.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 rounded-xl bg-card p-4 text-sm shadow-soft">
                  <Check className="mt-0.5 size-4 shrink-0 text-leaf" /> {h}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={140}>
            <h2 className="mt-10 text-2xl font-semibold">Itinerary</h2>
            <ol className="mt-4 space-y-4 border-l-2 border-border pl-6">
              {trip.itinerary.map((d) => (
                <li key={d.day} className="relative">
                  <span className="absolute -left-[31px] top-1.5 size-3 rounded-full bg-leaf ring-4 ring-background" />
                  <p className="text-sm font-semibold text-forest">{d.day}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{d.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={180}>
            <h2 className="mt-10 text-2xl font-semibold">What's Included</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {trip.includes.map((inc) => (
                <span key={inc} className="rounded-full bg-secondary px-4 py-2 text-xs font-medium text-secondary-foreground">
                  {inc}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <aside className="sticky top-28 rounded-2xl bg-card p-6 shadow-card">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Starting from</p>
            <p className="font-display text-4xl font-semibold text-forest">
              ₹{trip.price.toLocaleString("en-IN")}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-gold">
              <Users className="size-4" /> Only {trip.seats} seats left
            </p>
            <a
              href={whatsappLink(`Hi! I want to book "${trip.title}" (${trip.dates}).`)}
              target="_blank"
              rel="noreferrer"
              className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              <WhatsAppIcon className="size-4" /> Book on WhatsApp
            </a>
            <a
              href={`tel:+91${CONTACT.phone}`}
              className="mt-3 flex items-center justify-center rounded-xl bg-forest px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-forest-deep"
            >
              Call {CONTACT.phoneDisplay}
            </a>
            <Link
              to="/contact"
              className="mt-3 flex items-center justify-center rounded-xl border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-leaf"
            >
              Enquire by Email
            </Link>
          </aside>
        </Reveal>
      </section>

      <section className="container-x pb-8">
        <h2 className="mb-6 text-2xl font-semibold">You may also like</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((t, i) => (
            <Reveal key={t.slug} delay={i * 90}>
              <TripCard trip={t} />
            </Reveal>
          ))}
        </div>
      </section>
    </Page>
  );
}

function Fact({
  Icon,
  label,
  value,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div>
      <Icon className="size-5 text-leaf" />
      <p className="mt-2 text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}
