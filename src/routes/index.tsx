import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Award,
  Compass,
  Leaf,
  MapPin,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Page } from "@/components/Layout";
import { Reveal, useParallax } from "@/components/Reveal";
import { TripCard } from "@/components/TripCard";
import { PlanTripForm } from "@/components/PlanTripForm";
import {
  BlogTeasers,
  FaqList,
  MomentsGallery,
  SectionHeading,
  StatsBand,
  Testimonials,
} from "@/components/Sections";
import { WhatsAppIcon } from "@/components/SiteHeader";
import { CONTACT, destinations, heroImage, trips, whatsappLink } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BharatPravas | Offbeat Group Trips, Treks & Women-Only Tours" },
      {
        name: "description",
        content:
          "Maharashtra, unfiltered. Premium group trips, treks and women-only tours with small groups, local stays and a 100% safety record.",
      },
      { property: "og:title", content: "BharatPravas | Maharashtra, Unfiltered" },
      {
        property: "og:description",
        content: "Premium group trips, treks and women-only tours crafted for authentic experiences.",
      },
    ],
  }),
  component: Index,
});

const usps = [
  { Icon: ShieldCheck, title: "Women Safety First", sub: "Verified female leaders" },
  { Icon: Users, title: "Small Groups", sub: "Max 12-16 travelers" },
  { Icon: Leaf, title: "Authentic Experiences", sub: "Local stays, local food" },
  { Icon: Award, title: "Best Safety Record", sub: "5+ years • 10,000+ happy travelers" },
];

const quickFilters = [
  "Women-Only Trips",
  "Weekend Treks",
  "Beach Getaways",
  "Hill Stations",
  "Monsoon Specials",
  "Custom Trips",
];

function Index() {
  const parallax = useParallax(0.12);
  const [query, setQuery] = useState("");

  return (
    <Page overlayHeader>
      {/* HERO */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden">
        <div ref={parallax} className="absolute inset-0 -top-24 h-[125%] will-change-transform">
          <img src={heroImage} loading="eager" fetchPriority="high" alt="Travelers at sunrise on a Western Ghats ridge" className="size-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/90 via-forest-deep/60 to-transparent" />
        <Leaf className="animate-float absolute right-[12%] top-[18%] hidden size-10 text-gold/50 lg:block" />
        <Leaf className="animate-float absolute left-[6%] top-[62%] hidden size-8 text-leaf/50 lg:block [animation-delay:1.5s]" />

        <div className="container-x relative pb-28 pt-32">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
              Offbeat • Authentic • Safe
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] text-primary-foreground sm:text-5xl lg:text-6xl">
              Maharashtra,
              <br />
              Unfiltered. <span className="text-leaf">Experiences</span>
              <br />
              <span className="text-script">that stay with you.</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 max-w-xl text-primary-foreground/85">
              Premium group trips, treks & women-only tours crafted for authentic experiences and
              lasting memories.
            </p>
          </Reveal>
          <Reveal delay={340}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/trips"
                className="group inline-flex items-center gap-2 rounded-full bg-leaf px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
              >
                Explore Trips
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-primary-foreground backdrop-blur transition-colors hover:bg-white/20"
              >
                <WhatsAppIcon className="size-4" /> Chat on WhatsApp
              </a>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {usps.map((u, i) => (
              <Reveal key={u.title} delay={i * 110}>
                <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gold/20">
                    <u.Icon className="size-5 text-gold" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-primary-foreground">{u.title}</span>
                    <span className="block text-xs text-primary-foreground/70">{u.sub}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SEARCH BAR */}
      <section className="container-x -mt-14 relative z-10">
        <Reveal variant="zoom">
          <div className="rounded-3xl bg-card p-5 shadow-card md:p-7">
            <div className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto]">
              <label className="flex items-center gap-2 rounded-xl border border-border px-3.5 py-3">
                <Search className="size-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search destinations"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </label>
              <select className="rounded-xl border border-border px-3.5 py-3 text-sm outline-none">
                <option>All Types</option>
                <option>Trek</option>
                <option>Women-Only</option>
                <option>Beach Camping</option>
                <option>Heritage Walk</option>
              </select>
              <select className="rounded-xl border border-border px-3.5 py-3 text-sm outline-none">
                <option>Select Month</option>
                {["May", "June", "July", "August", "September", "October"].map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
              <Link
                to="/trips"
                search={{ q: query || undefined }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-forest px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-forest-deep"
              >
                <Search className="size-4" /> Search Trips
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {quickFilters.map((f) => (
                <Link
                  key={f}
                  to="/trips"
                  search={{ q: f }}
                  className="rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-leaf hover:text-forest"
                >
                  {f}
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* DESTINATIONS */}
      <section className="container-x py-20">
        <Reveal>
          <SectionHeading
            title="Explore Maharashtra"
            script="✦"
            subtitle="Handpicked regions. Offbeat experiences."
            link="/destinations"
            linkLabel="View all destinations"
          />
        </Reveal>
        <div className="hide-scrollbar -mx-5 flex snap-x gap-5 overflow-x-auto px-5 pb-2 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
          {destinations.map((d, i) => (
            <Reveal key={d.slug} delay={i * 90} variant="zoom" className="min-w-[240px] snap-start">
              <Link
                to="/destinations/$slug"
                params={{ slug: d.slug }}
                className="group relative block aspect-[3/4] overflow-hidden rounded-2xl shadow-soft"
              >
                <img
                  src={d.image}
                  alt={d.name}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/25 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-4">
                  <span className="block font-display text-lg font-semibold text-primary-foreground">
                    {d.name}
                  </span>
                  <span className="block text-xs text-primary-foreground/75">{d.sub}</span>
                  <span className="mt-2 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[11px] text-gold">
                      <MapPin className="size-3" /> {d.trips}
                    </span>
                    <span className="grid size-7 place-items-center rounded-full bg-leaf text-primary-foreground transition-transform group-hover:translate-x-1">
                      <ArrowRight className="size-3.5" />
                    </span>
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* UPCOMING DEPARTURES */}
      <section className="bg-forest-gradient py-20">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              title="Upcoming Departures"
              script="✦"
              light
              link="/trips"
              linkLabel="View all trips"
            />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trips.slice(0, 4).map((t, i) => (
              <Reveal key={t.slug} delay={i * 110}>
                <TripCard trip={t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <StatsBand />
      <MomentsGallery />

      {/* PLAN TRIP */}
      <section className="container-x py-16">
        <Reveal variant="zoom">
          <div className="grid gap-8 rounded-3xl bg-card p-8 shadow-card md:grid-cols-[1fr_1.2fr] md:p-12">
            <div>
              <Compass className="size-10 text-leaf" />
              <h2 className="mt-4 text-3xl font-semibold">
                Plan Your Perfect Trip <span className="text-script text-leaf">✦</span>
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Tell us your preferences, we'll craft the perfect itinerary for you — usually within 24
                hours.
              </p>
              <div className="mt-6 space-y-2 text-sm">
                <p>
                  <span className="font-semibold">Call:</span>{" "}
                  <a className="text-forest hover:underline" href={`tel:+91${CONTACT.phone}`}>
                    {CONTACT.phoneDisplay}
                  </a>
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  <a className="text-forest hover:underline" href={`mailto:${CONTACT.email}`}>
                    {CONTACT.email}
                  </a>
                </p>
              </div>
            </div>
            <PlanTripForm />
          </div>
        </Reveal>
      </section>

      <BlogTeasers />

      {/* FAQ */}
      <section className="container-x py-16">
        <Reveal>
          <SectionHeading title="Frequently Asked Questions" script="✦" link="/contact" linkLabel="View all FAQs" />
        </Reveal>
        <FaqList />
      </section>
    </Page>
  );
}
