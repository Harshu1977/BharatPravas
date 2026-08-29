import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { Page, PageHero } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { blogs, IMAGES } from "@/lib/site-data";

export const Route = createFileRoute("/blogs/")({
  head: () => ({
    meta: [
      { title: "Travel Blog | Maharashtra Treks, Guides & Stories | BharatPravas" },
      {
        name: "description",
        content:
          "Trail guides, monsoon trek lists, women's travel safety tips and Konkan food trails — written by the leaders who run our trips.",
      },
      { property: "og:title", content: "BharatPravas Travel Blog" },
      {
        property: "og:description",
        content: "Guides and stories from the Sahyadris and the Konkan coast.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/blogs" },
      { property: "og:image", content: IMAGES.waterfall },
      { name: "twitter:image", content: IMAGES.waterfall },
    ],
    links: [{ rel: "canonical", href: "/blogs" }],
  }),
  component: Blogs,
});

function Blogs() {
  return (
    <Page>
      <PageHero
        eyebrow="Journal"
        title={<>Stories from the trail</>}
        subtitle="Guides, checklists and field notes from our trek leaders."
        image={IMAGES.waterfall}
      />

      <section className="container-x grid gap-6 py-16 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((b, i) => (
          <Reveal key={b.slug} delay={i * 90} variant="zoom">
            <Link
              to="/blogs/$slug"
              params={{ slug: b.slug }}
              className="group flex h-full flex-col overflow-hidden rounded-3xl bg-card shadow-soft transition-transform hover:-translate-y-1"
            >
              <img
                src={b.image}
                alt={b.title}
                loading="lazy"
                className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="size-3.5 text-leaf" /> {b.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5 text-leaf" /> {b.read}
                  </span>
                </div>
                <h2 className="mt-3 font-display text-lg font-semibold text-forest">{b.title}</h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{b.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest">
                  Read article
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
