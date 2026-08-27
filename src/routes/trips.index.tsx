import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import ghats from "@/assets/ghats.jpg";
import { Page, PageHero } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { TripCard } from "@/components/TripCard";
import { trips } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/trips/")({
  validateSearch: z.object({ q: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "All Trips & Departures | BharatPravas" },
      {
        name: "description",
        content:
          "Browse upcoming treks, beach camps, heritage walks and women-only departures across Maharashtra with fixed dates and prices.",
      },
      { property: "og:title", content: "All Trips & Departures | BharatPravas" },
      { property: "og:description", content: "Upcoming small-group departures across Maharashtra." },
    ],
  }),
  component: TripsPage,
});

const categories = ["All", "Women-Only", "Weekend Escape", "Monsoon Special", "Heritage"];

function TripsPage() {
  const { q } = Route.useSearch();
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState(q ?? "");

  const filtered = trips.filter((t) => {
    const matchCat = cat === "All" || t.category === cat;
    const s = search.trim().toLowerCase();
    const matchSearch =
      !s ||
      [t.title, t.region, t.category, t.badge].some((v) => v.toLowerCase().includes(s));
    return matchCat && matchSearch;
  });

  return (
    <Page>
      <PageHero
        eyebrow="Upcoming Departures"
        title={
          <>
            Trips that fill up <span className="text-script text-leaf">fast.</span>
          </>
        }
        subtitle="Fixed departures with small groups, verified stays and local leaders. Book your seat before it's gone."
        image={ghats}
      />

      <section className="container-x py-14">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search trips, regions…"
            className="w-full max-w-xs rounded-full border border-border bg-card px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40"
          />
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-semibold transition-all",
                  cat === c
                    ? "border-forest bg-forest text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-leaf hover:text-forest",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">
            No trips match that search. Try another region or category.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t, i) => (
              <Reveal key={t.slug} delay={i * 80}>
                <TripCard trip={t} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </Page>
  );
}
