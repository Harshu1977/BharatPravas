import { useEffect, useRef, useState } from "react";

// Self-hosted from /public so the clip streams from the same origin on Netlify.
export const heroVideoUrl = "/media/hero-loop.mp4";

/**
 * Full-bleed background video with an eager poster image underneath so the
 * hero paints instantly and never shows an empty frame while the clip buffers.
 */
export function HeroVideo({
  poster,
  className = "",
  alt = "",
}: {
  poster: string;
  className?: string;
  alt?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (v.readyState >= 3) setReady(true);
    const play = () => void v.play().catch(() => undefined);
    play();
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <img
        src={poster}
        alt={alt}
        aria-hidden={alt ? undefined : true}
        loading="eager"
        fetchPriority="high"
        className={`animate-kenburns absolute inset-0 size-full object-cover transition-opacity duration-1000 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      />
      <video
        ref={ref}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        onCanPlay={() => setReady(true)}
        className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 motion-reduce:hidden ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src={heroVideoUrl} type="video/mp4" />
      </video>
    </div>
  );
}
