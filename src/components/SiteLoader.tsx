import { useEffect, useState } from "react";
import { BrandMark } from "./Brand";
import { allImages, CONTACT } from "@/lib/site-data";
import { heroVideoUrl } from "./HeroVideo";

const DURATION = 5000;

export function SiteLoader() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(6);

  useEffect(() => {
    // Warm every hero/thumbnail so pages paint instantly after the intro.
    allImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // Warm the hero background clip too.
    const v = document.createElement("video");
    v.preload = "auto";
    v.muted = true;
    v.src = heroVideoUrl;

    // Intro plays once per browser session — repeat visits open instantly.
    let seen = false;
    try {
      seen = window.sessionStorage.getItem("bp-intro") === "1";
      window.sessionStorage.setItem("bp-intro", "1");
    } catch {
      seen = false;
    }
    if (seen) {
      setProgress(100);
      setDone(true);
      return;
    }

    const start = Date.now();
    const tick = window.setInterval(() => {
      setProgress(Math.min(100, ((Date.now() - start) / DURATION) * 100));
    }, 60);
    const end = window.setTimeout(() => setDone(true), DURATION);
    document.body.style.overflow = "hidden";

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(end);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <div
      aria-hidden={done}
      className={`fixed inset-0 z-[100] grid place-items-center bg-forest-gradient transition-all duration-700 ${
        done ? "pointer-events-none -translate-y-full opacity-0" : "opacity-100"
      }`}
    >
      {/* drifting mist */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="animate-float absolute left-[8%] top-[22%] size-56 rounded-full bg-leaf/30 blur-3xl" />
        <div
          className="animate-float absolute right-[10%] top-[38%] size-72 rounded-full bg-gold/20 blur-3xl"
          style={{ animationDelay: "1.2s" }}
        />
        <div
          className="animate-float absolute bottom-[12%] left-1/3 size-64 rounded-full bg-leaf/20 blur-3xl"
          style={{ animationDelay: "2.4s" }}
        />
      </div>

      {/* layered hills */}
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full text-forest-deep"
      >
        <path
          fill="currentColor"
          fillOpacity="0.55"
          d="M0,224L120,197.3C240,171,480,117,720,133.3C960,149,1200,235,1320,277.3L1440,320L0,320Z"
        />
        <path
          fill="currentColor"
          d="M0,288L180,245.3C360,203,720,213,1080,245.3L1440,277L1440,320L0,320Z"
        />
      </svg>

      <div className="relative flex flex-col items-center px-6 text-center">
        <span className="animate-pulse-ring rounded-full">
          <BrandMark className="size-24 md:size-28" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-semibold text-primary-foreground md:text-4xl">
          {CONTACT.brand}
        </h1>
        <p className="mt-2 text-[11px] uppercase tracking-[0.42em] text-gold">{CONTACT.tagline}</p>

        <div className="mt-8 h-1 w-56 overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-gold transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 text-xs text-primary-foreground/60">Packing your journey…</p>
      </div>
    </div>
  );
}
