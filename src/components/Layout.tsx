import type { ReactNode } from "react";
import { SiteHeader, WhatsAppIcon } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { whatsappLink } from "@/lib/site-data";
import { Reveal } from "./Reveal";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="animate-pulse-ring fixed bottom-6 right-6 z-50 grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-card transition-transform hover:scale-110"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}

export function ScrollProgress() {
  return (
    <div
      id="scroll-progress"
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left scale-x-0 bg-gold"
      style={{ animation: "none" }}
    />
  );
}

export function Page({ children, overlayHeader = false }: { children: ReactNode; overlayHeader?: boolean }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader overlay={overlayHeader} />
      <main>{children}</main>
      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  image: string;
}) {
  return (
    <section className="relative flex min-h-[52vh] items-end overflow-hidden pb-14 pt-32">
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/70 to-forest-deep/40" />
      <div className="container-x relative">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold text-primary-foreground md:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/80">{subtitle}</p>
        </Reveal>
      </div>
    </section>
  );
}
