import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { Page, PageHero } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { destinations, IMAGES } from "@/lib/site-data";

export const Route = createFileRoute("/destinations/")({
  head: () => ({
    meta: [
      { title: "Destinations in Maharashtra | BharatPravas" },
      {
        name: "description",
        content:
          "Western Ghats treks, Konkan beaches, hill stations, heritage forts and monsoon waterfalls — explore our handpicked regions.",
      },
      { property: "og:title", content: "Destinations in Maharashtra | BharatPravas" },
      { property: "og:description", content: "Handpicked offbeat regions across Maharashtra." },
    ],
  }),
  component: DestinationsPage,
});

function DestinationsPage() {
  return (
    <Page>
      <PageHero
        eyebrow="Explore"
        title={
          <>
            Handpicked regions, <span className="text-script text-leaf">offbeat routes.</span>
          </>
        }
        subtitle="Five distinct landscapes, one state. Pick your terrain and we'll handle the rest."
        image={IMAGES.fort}
      />
      <section className="container-x grid gap-8 py-16 md:grid-cols-2">
        {destinations.map((d, i) => (
          <Reveal key={d.slug} delay={i * 90} variant="zoom">
            <Link
              to="/destinations/$slug"
              params={{ slug: d.slug }}
              className="group grid h-full overflow-hidden rounded-3xl bg-card shadow-soft transition-all hover:-translate-y-2 hover:shadow-card sm:grid-cols-2"
            >
              <div className="aspect-[4/3] overflow-hidden sm:aspect-auto">
                <img
                  src={d.image}
                  alt={d.name}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col justify-center p-6">
                <p className="flex items-center gap-1 text-xs font-semibold text-gold">
                  <MapPin className="size-3" /> {d.trips}
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold">{d.name}</h2>
                <p className="text-xs text-muted-foreground">{d.sub}</p>
                <p className="mt-3 text-sm text-muted-foreground">{d.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest">
                  Explore region
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>
    </Page>
  );
}
