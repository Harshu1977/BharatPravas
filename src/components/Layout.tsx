import { useEffect, useRef, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { SiteHeader, WhatsAppIcon } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { whatsappLink } from "@/lib/site-data";
import { Reveal } from "./Reveal";
import { HeroVideo } from "./HeroVideo";

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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left scale-x-0 bg-gold"
    />
  );
}


export function Page({ children, overlayHeader = false }: { children: ReactNode; overlayHeader?: boolean }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader overlay={overlayHeader} />
      <main key={pathname} className="animate-page-enter">
        {children}
      </main>
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
    <section className="img-vignette relative flex min-h-[56vh] items-end overflow-hidden pb-14 pt-32">
      <HeroVideo poster={image} />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/72 to-forest-deep/35" />
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
