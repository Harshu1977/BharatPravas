import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Page, PageHero } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { PlanTripForm } from "@/components/PlanTripForm";
import { FaqList, SectionHeading } from "@/components/Sections";
import { WhatsAppIcon } from "@/components/SiteHeader";
import { CONTACT, IMAGES, whatsappLink } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Booking | BharatPravas" },
      {
        name: "description",
        content:
          "Call +91 92707 72205, WhatsApp +91 97632 62025 or email xplorevo@gmail.com to book a Maharashtra group trip, trek or women-only tour.",
      },
      { property: "og:title", content: "Contact BharatPravas" },
      {
        property: "og:description",
        content: "Talk to a real trip planner — phone, WhatsApp or email, 8 AM to 8 PM daily.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { property: "og:image", content: IMAGES.coastal },
      { name: "twitter:image", content: IMAGES.coastal },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          name: CONTACT.brand,
          email: CONTACT.email,
          telephone: `+91${CONTACT.phone}`,
          areaServed: "Maharashtra, India",
        }),
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const cards = [
    {
      Icon: Phone,
      label: "Call us",
      value: CONTACT.phoneDisplay,
      href: `tel:+91${CONTACT.phone}`,
    },
    {
      Icon: Mail,
      label: "Email us",
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
    },
    {
      Icon: WhatsAppIcon,
      label: "WhatsApp",
      value: CONTACT.whatsappDisplay,
      href: whatsappLink(),
    },
    {
      Icon: Clock,
      label: "Open hours",
      value: CONTACT.hours,
      href: undefined,
    },
  ];

  return (
    <Page>
      <PageHero
        eyebrow="Say Hello"
        title={<>Let's plan your next escape</>}
        subtitle="Reach us any day between 8 AM and 8 PM — we usually reply within an hour."
        image={IMAGES.coastal}
      />

      <section className="container-x grid gap-5 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => {
          const inner = (
            <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1">
              <span className="grid size-11 place-items-center rounded-full bg-leaf/15">
                <c.Icon className="size-5 text-forest" />
              </span>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {c.label}
              </p>
              <p className="mt-1 font-medium text-forest">{c.value}</p>
            </div>
          );
          return (
            <Reveal key={c.label} delay={i * 90} variant="zoom">
              {c.href ? (
                <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  {inner}
                </a>
              ) : (
                inner
              )}
            </Reveal>
          );
        })}
      </section>

      <section className="container-x grid gap-10 pb-20 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <PlanTripForm />
        </Reveal>
        <Reveal delay={120}>
          <div className="overflow-hidden rounded-3xl shadow-card">
            <iframe
              title="BharatPravas location — Pune, Maharashtra"
              src="https://www.google.com/maps?q=Pune,Maharashtra,India&output=embed"
              loading="lazy"
              className="h-72 w-full border-0 lg:h-80"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="bg-card p-6">
              <p className="flex items-center gap-2 font-display text-lg font-semibold text-forest">
                <MapPin className="size-5 text-gold" /> Based in Pune, roaming all of Maharashtra
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Pickups available from Pune, Mumbai, Thane and Nashik on most departures.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="container-x pb-20">
        <Reveal>
          <SectionHeading title="Before you write to us" script="✦" subtitle="Quick answers to the usual questions." />
        </Reveal>
        <FaqList />
      </section>
    </Page>
  );
}
