import { createFileRoute, Link } from "@tanstack/react-router";
import { HeartHandshake, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Page, PageHero } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { TripCard } from "@/components/TripCard";
import { FaqList, SectionHeading, Testimonials } from "@/components/Sections";
import { IMAGES, trips } from "@/lib/site-data";

export const Route = createFileRoute("/women-only-tours")({
  head: () => ({
    meta: [
      { title: "Women-Only Tours in Maharashtra | BharatPravas" },
      {
        name: "description",
        content:
          "All-women group treks and getaways led by certified female trek leaders, with verified stays and 24x7 support across Maharashtra.",
      },
      { property: "og:title", content: "Women-Only Tours | BharatPravas" },
      {
        property: "og:description",
        content: "Safe, joyful, all-women departures across the Sahyadris and the Konkan coast.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/women-only-tours" },
      { property: "og:image", content: IMAGES.trekWomen },
      { name: "twitter:image", content: IMAGES.trekWomen },
    ],
    links: [{ rel: "canonical", href: "/women-only-tours" }],
  }),
  component: WomenOnly,
});

const pillars = [
  { Icon: ShieldCheck, title: "Certified Female Leaders", text: "Every departure is led by trained women trek leaders with wilderness first-aid." },
  { Icon: Users, title: "Small, Warm Groups", text: "Capped at 12 travelers so nobody gets lost in the crowd." },
  { Icon: HeartHandshake, title: "Verified Stays", text: "Female-friendly homestays and campsites we have personally vetted." },
  { Icon: Sparkles, title: "24x7 Support", text: "A live support line from the day you book until you reach home." },
];

function WomenOnly() {
  const list = trips.filter((t) => t.category === "Women-Only");

  return (
    <Page>
      <PageHero
        eyebrow="For Women, By Women"
        title={<>Women-Only Tours</>}
        subtitle="Travel further, safer and louder — with a group that feels like home."
        image={IMAGES.trekWomen}
      />

      <section className="container-x grid gap-5 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 90} variant="zoom">
            <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1">
              <span className="grid size-11 place-items-center rounded-full bg-leaf/15">
                <p.Icon className="size-5 text-forest" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-forest">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="container-x pb-8">
        <Reveal>
          <SectionHeading
            title="Upcoming Women-Only Departures"
            script="✦"
            subtitle="Small batches. Big freedom."
            link="/trips"
            linkLabel="See all trips"
          />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((t, i) => (
            <Reveal key={t.slug} delay={i * 90}>
              <TripCard trip={t} />
            </Reveal>
          ))}
        </div>
      </section>

      <Testimonials />

      <section className="container-x py-16">
        <Reveal>
          <SectionHeading title="Questions before you book" script="✦" subtitle="Everything women travelers ask us." />
        </Reveal>
        <FaqList />
        <Reveal>
          <div className="mt-10 rounded-3xl bg-forest-gradient p-8 text-center text-primary-foreground md:p-12">
            <h3 className="font-display text-2xl font-semibold md:text-3xl">Travelling with friends?</h3>
            <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
              Groups of 6 or more get a private women-only departure on your own dates.
            </p>
            <Link
              to="/custom-trips"
              className="mt-6 inline-flex rounded-full bg-gold px-7 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
            >
              Plan a private trip
            </Link>
          </div>
        </Reveal>
      </section>
    </Page>
  );
}
