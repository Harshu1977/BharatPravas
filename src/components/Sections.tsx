import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Play, Quote, Star, X, ChevronDown } from "lucide-react";
import { Reveal, CountUp } from "./Reveal";
import { blogs, faqs, heroStats, moments, reviews } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  script,
  subtitle,
  link,
  linkLabel = "View all",
  light = false,
}: {
  title: string;
  script?: string;
  subtitle?: string;
  link?: string;
  linkLabel?: string;
  light?: boolean;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2
          className={cn(
            "text-3xl font-semibold md:text-4xl",
            light ? "text-primary-foreground" : "text-foreground",
          )}
        >
          {title} {script && <span className="text-script text-leaf">{script}</span>}
        </h2>
        {subtitle && (
          <p className={cn("mt-2 text-sm", light ? "text-primary-foreground/70" : "text-muted-foreground")}>
            {subtitle}
          </p>
        )}
      </div>
      {link && (
        <Link
          to={link}
          className={cn(
            "group inline-flex items-center gap-1.5 text-sm font-semibold",
            light ? "text-gold" : "text-forest",
          )}
        >
          {linkLabel}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}

export function StatsBand() {
  return (
    <section className="container-x py-16">
      <div className="grid grid-cols-2 gap-6 rounded-3xl bg-card p-10 shadow-soft md:grid-cols-4">
        {heroStats.map((s, i) => (
          <Reveal key={s.label} delay={i * 90} className="text-center">
            <p className="font-display text-3xl font-semibold text-forest md:text-4xl">
              <CountUp value={s.value} />
            </p>
            <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="container-x py-16">
      <Reveal>
        <SectionHeading title="What Travelers Say" script="✦" link="/about" linkLabel="View all reviews" />
      </Reveal>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {reviews.map((r, i) => (
          <Reveal key={r.name} delay={i * 100} variant="zoom">
            <figure className="flex h-full flex-col rounded-2xl bg-card p-6 shadow-soft transition-transform duration-500 hover:-translate-y-1.5">
              <Quote className="size-6 text-gold" />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                "{r.text}"
              </blockquote>
              <div className="mt-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="size-3.5 fill-gold text-gold" />
                ))}
              </div>
              <figcaption className="mt-3">
                <p className="text-sm font-semibold">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.from}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const videoIds = ["Scxs7L0vhZ4", "hpUAyMV1Rgo", "0Fj0R8vC_1E", "1La4QzGeaaQ"];

export function MomentsGallery() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="container-x py-16">
      <Reveal>
        <SectionHeading
          title="Moments That Matter"
          script="✦"
          subtitle="Follow our journey @bharatpravas"
        />
      </Reveal>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
        {moments.map((src, i) => (
          <Reveal key={i} delay={i * 60} variant="zoom">
            <button
              onClick={() => setActive(videoIds[i % videoIds.length])}
              className="group relative block aspect-[3/4] w-full overflow-hidden rounded-xl shadow-soft"
              aria-label="Play travel reel"
            >
              <img
                src={src}
                alt="Travel moment"
                loading="lazy"
                className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <span className="absolute inset-0 grid place-items-center bg-forest-deep/25 transition-colors group-hover:bg-forest-deep/45">
                <span className="grid size-9 place-items-center rounded-full bg-white/85 text-forest transition-transform group-hover:scale-110">
                  <Play className="size-4 fill-current" />
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[70] grid place-items-center bg-forest-deep/85 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActive(null)}
              aria-label="Close video"
              className="absolute -top-11 right-0 grid size-9 place-items-center rounded-full bg-white/15 text-white"
            >
              <X className="size-5" />
            </button>
            <div className="aspect-video overflow-hidden rounded-2xl shadow-card">
              <iframe
                className="size-full"
                src={`https://www.youtube.com/embed/${active}?autoplay=1&rel=0`}
                title="BharatPravas travel film"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export function FaqList({ items = faqs }: { items?: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((f, i) => (
        <Reveal key={f.q} delay={i * 70}>
          <div className="overflow-hidden rounded-xl bg-card shadow-soft">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold"
            >
              {f.q}
              <ChevronDown
                className={cn("size-4 shrink-0 text-leaf transition-transform", open === i && "rotate-180")}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-500",
                open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function BlogTeasers() {
  return (
    <section className="container-x py-16">
      <Reveal>
        <SectionHeading title="Stories from the Trail" script="✦" link="/blogs" linkLabel="Read all blogs" />
      </Reveal>
      <div className="grid gap-6 md:grid-cols-3">
        {blogs.map((b, i) => (
          <Reveal key={b.slug} delay={i * 110}>
            <Link
              to="/blogs/$slug"
              params={{ slug: b.slug }}
              className="group block h-full overflow-hidden rounded-2xl bg-card shadow-soft transition-all hover:-translate-y-2 hover:shadow-card"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={b.image}
                  alt={b.title}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <p className="text-xs text-muted-foreground">
                  {b.date} • {b.read}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold group-hover:text-forest">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.excerpt}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
