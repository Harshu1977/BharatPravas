import logo from "@/assets/logo.png.asset.json";

export const LOGO_URL = logo.url;

export function BrandLogo({
  className = "size-11",
  spin = false,
}: {
  className?: string;
  spin?: boolean;
}) {
  return (
    <span
      className={`relative block shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-gold/50 ${className}`}
    >
      <img
        src={LOGO_URL}
        alt="BharatPravas logo"
        width={512}
        height={512}
        loading="eager"
        decoding="sync"
        // @ts-expect-error - valid HTML attribute
        fetchpriority="high"
        className={`size-full scale-[1.35] object-contain object-center ${spin ? "animate-float" : ""}`}
      />
    </span>
  );
}
