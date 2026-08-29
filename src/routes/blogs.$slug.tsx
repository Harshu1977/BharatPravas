import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { Page, PageHero } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { blogs, IMAGES } from "@/lib/site-data";

export const Route = createFileRoute("/blogs/$slug")({
  loader: ({ params }) => {
    const post = blogs.find((b) => b.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article not found | BharatPravas" }, { name: "robots", content: "noindex" }],
      };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} | BharatPravas` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blogs/${params.slug}` },
        { property: "og:image", content: post.image },
        { name: "twitter:image", content: post.image },
      ],
      links: [{ rel: "canonical", href: `/blogs/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            image: post.image,
            datePublished: post.date,
            author: { "@type": "Organization", name: "BharatPravas" },
          }),
        },
      ],
    };
  },
  component: BlogPost,
  notFoundComponent: PostNotFound,
});

function PostNotFound() {
  return (
    <Page>
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="font-display text-3xl font-semibold text-forest">Article not found</h1>
        <p className="mt-3 text-muted-foreground">This story may have moved or been renamed.</p>
        <Link to="/blogs" className="mt-6 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-primary-foreground">
          Back to blog
        </Link>
      </div>
    </Page>
  );
}

function BlogPost() {
  const { post } = Route.useLoaderData();
  const related = blogs.filter((b) => b.slug !== post.slug).slice(0, 2);

  return (
    <Page>
      <PageHero eyebrow="Journal" title={post.title} subtitle={post.excerpt} image={post.image} />

      <article className="container-x grid gap-10 py-16 lg:grid-cols-[1fr_320px]">
        <Reveal>
          <div className="flex flex-wrap items-center gap-5 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-3.5 text-leaf" /> {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5 text-leaf" /> {post.read}
            </span>
          </div>

          <div className="mt-6 space-y-5 text-muted-foreground">
            <p>
              {post.excerpt} Here's the long version, written after seasons of walking these trails
              with travelers of every fitness level.
            </p>
            <h2 className="font-display text-2xl font-semibold text-forest">Why it's worth your weekend</h2>
            <p>
              Maharashtra packs an unreasonable amount of variety into a two-day window — basalt
              cliffs, plateau blooms, sea forts and villages where dinner is whatever the kitchen
              cooked that evening. The trick is picking the right window and going with people who
              know the descent in the dark.
            </p>
            <img
              src={IMAGES.hills}
              alt="Misty hills in the Sahyadri range"
              loading="lazy"
              className="h-72 w-full rounded-3xl object-cover"
            />
            <h2 className="font-display text-2xl font-semibold text-forest">Plan it well</h2>
            <p>
              Start early, carry two litres of water per person, keep your pack under seven kilos
              and always tell someone your route. On our departures the leader carries first-aid,
              a headlamp for every traveler and offline maps of the trail.
            </p>
            <h2 className="font-display text-2xl font-semibold text-forest">Go with us</h2>
            <p>
              If you'd rather not sort logistics, join one of our small-group departures — transport,
              stays, meals and a certified leader are all included.
            </p>
          </div>

          <Link
            to="/blogs"
            className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-leaf"
          >
            <ArrowLeft className="size-4" /> Back to all stories
          </Link>
        </Reveal>

        <Reveal delay={140}>
          <aside className="space-y-5">
            <div className="rounded-3xl bg-forest-gradient p-6 text-primary-foreground">
              <h3 className="font-display text-xl font-semibold">Ready to go?</h3>
              <p className="mt-2 text-sm text-primary-foreground/80">
                Browse upcoming departures or tell us your dates for a private trip.
              </p>
              <Link
                to="/trips"
                className="mt-5 inline-flex rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-accent-foreground"
              >
                View trips
              </Link>
            </div>
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/blogs/$slug"
                params={{ slug: r.slug }}
                className="group flex gap-4 rounded-2xl border border-border bg-card p-3 shadow-soft"
              >
                <img src={r.image} alt={r.title} loading="lazy" className="size-20 rounded-xl object-cover" />
                <span className="text-sm font-medium text-forest group-hover:text-leaf">{r.title}</span>
              </Link>
            ))}
          </aside>
        </Reveal>
      </article>
    </Page>
  );
}
