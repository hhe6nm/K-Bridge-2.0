import { forwardRef } from "react";

/**
 * K Bridge Partners wordmark logo.
 * Palette: navy "K BRIDGE" wordmark with a gold accent stroke through the K,
 * gold "PARTNERS" and divider lines underneath, "LLC" in navy.
 *
 * variant:
 *   - "dark"  → navy elements on light backgrounds
 *   - "light" → cream/champagne elements on dark (navy) backgrounds
 *
 * Sizes are controlled by parent `width`/`height` or Tailwind classes.
 */
const Logo = forwardRef(function Logo({ variant = "dark", className = "", ...rest }, ref) {
  const wordmark = variant === "light" ? "#F9F0DA" : "#0A1128";
  const accent = "#C6A87C";
  const llc = variant === "light" ? "#E5D3B3" : "#0A1128";
  return (
    <svg
      ref={ref}
      viewBox="0 0 400 160"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="K Bridge Partners"
      {...rest}
    >
      {/* Gold accent stroke through the K */}
      <line x1="8" y1="94" x2="94" y2="8" stroke={accent} strokeWidth="3" strokeLinecap="square" />
      {/* K BRIDGE wordmark */}
      <text
        x="0" y="92"
        fontFamily="'Noto Serif KR', 'Playfair Display', serif"
        fontWeight="300"
        fontSize="98"
        letterSpacing="-2"
        fill={wordmark}
      >
        K BRIDGE
      </text>
      {/* Divider lines */}
      <line x1="0" y1="110" x2="90" y2="110" stroke={accent} strokeWidth="1.5" />
      <line x1="308" y1="110" x2="400" y2="110" stroke={accent} strokeWidth="1.5" />
      {/* PARTNERS */}
      <text
        x="200" y="118"
        textAnchor="middle"
        fontFamily="'Pretendard', 'Inter', sans-serif"
        fontSize="18"
        letterSpacing="10"
        fill={accent}
      >
        PARTNERS
      </text>
      {/* LLC */}
      <text
        x="200" y="150"
        textAnchor="middle"
        fontFamily="'Pretendard', 'Inter', sans-serif"
        fontSize="12"
        letterSpacing="6"
        fill={llc}
        opacity="0.75"
      >
        LLC
      </text>
    </svg>
  );
});

/** Compact "K" mark for tight spaces (favicon, mobile nav collapsed). */
export const LogoMark = forwardRef(function LogoMark({ variant = "dark", className = "", ...rest }, ref) {
  const wordmark = variant === "light" ? "#F9F0DA" : "#0A1128";
  const accent = "#C6A87C";
  return (
    <svg ref={ref} viewBox="0 0 100 100" className={className} role="img" aria-label="K Bridge" {...rest}>
      <line x1="10" y1="90" x2="90" y2="10" stroke={accent} strokeWidth="4" strokeLinecap="square" />
      <text
        x="0" y="88"
        fontFamily="'Noto Serif KR', 'Playfair Display', serif"
        fontWeight="300"
        fontSize="100"
        letterSpacing="-4"
        fill={wordmark}
      >
        K
      </text>
    </svg>
  );
});

export default Logo;
