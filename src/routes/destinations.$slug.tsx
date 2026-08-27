import { createFileRoute, notFound } from "@tanstack/react-router";
import { Page, PageHero } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { TripCard } from "@/components/TripCard";
import { PlanTripForm } from "@/components/PlanTripForm";
import { destinations, trips } from "@/lib/site-data";

export const Route = createFileRoute("/destinations/$slug")({
  loader: ({ params }) => {
    const destination = destinations.find((d) => d.slug === params.slug);
    if (!destination) throw notFound();
    return { destination };
  },
  head: ({ loaderData }) => {
    const d = loaderData?.destination;
    const title = d ? `${d.name} Trips & Treks | BharatPravas` : "Destination | BharatPravas";
    const description = d?.blurb ?? "Offbeat regions across Maharashtra.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: DestinationDetail,
});

function DestinationDetail() {
  const { destination } = Route.useLoaderData();
  const regionTrips = trips.filter((t) => t.region === destination.name);

  return (
    <Page>
      <PageHero
        eyebrow={destination.sub}
        title={destination.name}
        subtitle={destination.blurb}
        image={destination.image}
      />
      <section className="container-x py-16">
        <h2 className="mb-6 text-2xl font-semibold">
          Trips in {destination.name} <span className="text-script text-leaf">✦</span>
        </h2>
        {regionTrips.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {regionTrips.map((t, i) => (
              <Reveal key={t.slug} delay={i * 90}>
                <TripCard trip={t} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            No fixed departures listed right now — tell us your dates and we'll create one for you.
          </p>
        )}
      </section>
      <section className="container-x pb-8">
        <Reveal variant="zoom">
          <div className="rounded-3xl bg-card p-8 shadow-card md:p-12">
            <h2 className="text-2xl font-semibold">
              Want a custom {destination.name} itinerary?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Share your preferences and our local experts will design it for you.
            </p>
            <div className="mt-6">
              <PlanTripForm />
            </div>
          </div>
        </Reveal>
      </section>
    </Page>
  );
}
