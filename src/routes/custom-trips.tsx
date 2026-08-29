import { createFileRoute } from "@tanstack/react-router";
import { CalendarRange, MessagesSquare, Route as RouteIcon, Wallet } from "lucide-react";
import { Page, PageHero } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { PlanTripForm } from "@/components/PlanTripForm";
import { SectionHeading } from "@/components/Sections";
import { IMAGES } from "@/lib/site-data";

export const Route = createFileRoute("/custom-trips")({
  head: () => ({
    meta: [
      { title: "Custom & Corporate Trips | BharatPravas" },
      {
        name: "description",
        content:
          "Tell us your dates, group size and budget — we craft a private Maharashtra itinerary with stays, transport and local experiences in 24 hours.",
      },
      { property: "og:title", content: "Custom Trips | BharatPravas" },
      {
        property: "og:description",
        content: "Private, tailor-made group and corporate journeys across Maharashtra.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/custom-trips" },
      { property: "og:image", content: IMAGES.hills },
      { name: "twitter:image", content: IMAGES.hills },
    ],
    links: [{ rel: "canonical", href: "/custom-trips" }],
  }),
  component: CustomTrips,
});

const steps = [
  { Icon: MessagesSquare, title: "Share your idea", text: "Dates, group size, vibe and budget — a couple of lines is enough." },
  { Icon: RouteIcon, title: "We design it", text: "A day-by-day itinerary with stays, transport and local experiences within 24 hours." },
  { Icon: Wallet, title: "Tune the budget", text: "Swap stays, add activities or trim days until the numbers feel right." },
  { Icon: CalendarRange, title: "Travel worry-free", text: "On-ground captain, verified vendors and 24x7 support through the trip." },
];

const occasions = [
  "Friends' reunion treks",
  "Corporate offsites",
  "College & school trips",
  "Family weekend escapes",
  "Birthday & anniversary getaways",
  "Photography expeditions",
];

function CustomTrips() {
  return (
    <Page>
      <PageHero
        eyebrow="Made For You"
        title={<>Custom Trips</>}
        subtitle="Your dates, your people, your pace — we handle everything else."
        image={IMAGES.hills}
      />

      <section className="container-x py-16">
        <Reveal>
          <SectionHeading title="How it works" script="✦" subtitle="Four simple steps from idea to itinerary." />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 90} variant="zoom">
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1">
                <span className="grid size-11 place-items-center rounded-full bg-gold/20">
                  <s.Icon className="size-5 text-forest" />
                </span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Step {i + 1}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-forest">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x grid gap-10 pb-20 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="rounded-3xl bg-forest-gradient p-8 text-primary-foreground md:p-10">
            <h2 className="font-display text-2xl font-semibold md:text-3xl">We plan trips for</h2>
            <ul className="mt-6 space-y-3 text-sm text-primary-foreground/85">
              {occasions.map((o) => (
                <li key={o} className="flex items-start gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" />
                  {o}
                </li>
              ))}
            </ul>
            <img
              src={IMAGES.beachCamp}
              alt="Beach camp set up at sunset in coastal Maharashtra"
              loading="lazy"
              className="mt-8 h-52 w-full rounded-2xl object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <PlanTripForm />
        </Reveal>
      </section>
    </Page>
  );
}
