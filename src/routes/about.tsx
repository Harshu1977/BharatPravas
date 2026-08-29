import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, Heart, Leaf, ShieldCheck } from "lucide-react";
import { Page, PageHero } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { SectionHeading, StatsBand, Testimonials } from "@/components/Sections";
import { IMAGES } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About BharatPravas | Offbeat Travel from Maharashtra" },
      {
        name: "description",
        content:
          "We are a small Maharashtra-based travel crew running offbeat group trips, treks and women-only tours with local stays and a 100% safety record.",
      },
      { property: "og:title", content: "About BharatPravas" },
      {
        property: "og:description",
        content: "Local experts, small groups and a decade of Sahyadri trails behind every trip.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { property: "og:image", content: IMAGES.ghats },
      { name: "twitter:image", content: IMAGES.ghats },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const values = [
  { Icon: ShieldCheck, title: "Safety, always", text: "Trained leaders, wilderness first-aid kits and verified vendors on every departure." },
  { Icon: Leaf, title: "Leave no trace", text: "We carry our waste back, cap group sizes and travel with local operators only." },
  { Icon: Heart, title: "People first", text: "Stays with families, meals cooked in village kitchens and fair pay for guides." },
  { Icon: Compass, title: "Offbeat by default", text: "If a place is overcrowded, we find the ridge next to it that nobody photographs." },
];

const team = [
  { name: "Aarav Deshmukh", role: "Founder & Lead Trek Guide", image: IMAGES.fort },
  { name: "Meera Kulkarni", role: "Head of Women-Only Tours", image: IMAGES.trekWomen },
  { name: "Rohan Pawar", role: "Operations & Safety", image: IMAGES.nightSky },
];

function About() {
  return (
    <Page>
      <PageHero
        eyebrow="Who We Are"
        title={<>About BharatPravas</>}
        subtitle="A small crew of Sahyadri regulars turning weekends into stories since 2021."
        image={IMAGES.ghats}
      />

      <section className="container-x grid items-center gap-10 py-16 lg:grid-cols-2">
        <Reveal>
          <img
            src={IMAGES.heritage}
            alt="Heritage fort walls in Maharashtra at golden hour"
            loading="lazy"
            className="h-80 w-full rounded-3xl object-cover shadow-card lg:h-[26rem]"
          />
        </Reveal>
        <Reveal delay={120}>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-leaf">Our Story</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-forest md:text-4xl">
            Built on early mornings and shared chai
          </h2>
          <p className="mt-5 text-muted-foreground">
            BharatPravas began with six friends, one rented tempo traveller and a stubborn belief
            that Maharashtra deserves better than rushed, crowded tours. Five years on, we still
            plan every itinerary ourselves, still sleep in the same homestays as our travelers, and
            still cap our groups so the mountain never feels like a queue.
          </p>
          <p className="mt-4 text-muted-foreground">
            Today we run treks, coastal escapes, heritage walks and India's warmest women-only
            departures — all with local leaders, honest pricing and a safety record we protect
            fiercely.
          </p>
          <Link
            to="/trips"
            className="mt-7 inline-flex rounded-full bg-forest px-7 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            Explore our trips
          </Link>
        </Reveal>
      </section>

      <StatsBand />

      <section className="container-x py-16">
        <Reveal>
          <SectionHeading title="What we stand for" script="✦" subtitle="The rules we don't bend." />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 90} variant="zoom">
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1">
                <span className="grid size-11 place-items-center rounded-full bg-leaf/15">
                  <v.Icon className="size-5 text-forest" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-forest">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x pb-16">
        <Reveal>
          <SectionHeading title="Meet the crew" script="✦" subtitle="The people you'll actually travel with." />
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 100}>
              <div className="group overflow-hidden rounded-3xl bg-card shadow-soft">
                <img
                  src={m.image}
                  alt={m.name}
                  loading="lazy"
                  className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-forest">{m.name}</h3>
                  <p className="text-sm text-muted-foreground">{m.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Testimonials />
    </Page>
  );
}
