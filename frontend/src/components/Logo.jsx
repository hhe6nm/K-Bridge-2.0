import { forwardRef } from "react";

/**
 * K Bridge Partners logo (raster wordmark).
 *
 * variant:
 *   - "dark"  → full-color logo (navy K BRIDGE, gold PARTNERS/LLC) for light backgrounds
 *   - "light" → monochrome gold silhouette for dark (navy) backgrounds
 *
 * Aspect ratio of source: 954 x 306 (~3.12:1).
 * Size via Tailwind height class (e.g., h-10, h-14) — width auto.
 */
const Logo = forwardRef(function Logo({ variant = "dark", className = "", alt = "K Bridge Partners", ...rest }, ref) {
  const src = variant === "light" ? "/kbp-logo-gold.png" : "/kbp-logo.png";
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      draggable={false}
      {...rest}
    />
  );
});

/** Compact "K" mark for tight spaces (favicon, mobile nav collapsed). */
export const LogoMark = forwardRef(function LogoMark({ className = "", ...rest }, ref) {
  return (
    <img
      ref={ref}
      src="/favicon-64.png"
      alt="K Bridge"
      className={className}
      draggable={false}
      {...rest}
    />
  );
});

export default Logo;
