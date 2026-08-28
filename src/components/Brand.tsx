import logo from "@/assets/logo.png.asset.json";

export const LOGO_URL = logo.url;

/** Circular emblem cropped out of the full logo lockup. */
export function BrandMark({ className = "size-11" }: { className?: string }) {
  return (
    <span
      className={`relative block shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-gold/50 ${className}`}
    >
      <img
        src={LOGO_URL}
        alt="BharatPravas"
        loading="eager"
        decoding="sync"
        className="absolute inset-0 size-full object-contain"
        style={{ transform: "scale(2.45)", transformOrigin: "50% 38%" }}
      />
    </span>
  );
}

/** Full logo lockup (emblem + wordmark). */
export function BrandLockup({ className = "w-56" }: { className?: string }) {
  return (
    <img
      src={LOGO_URL}
      alt="BharatPravas — Offbeat. Authentic. Yours."
      loading="eager"
      decoding="sync"
      className={`block h-auto object-contain ${className}`}
    />
  );
}
