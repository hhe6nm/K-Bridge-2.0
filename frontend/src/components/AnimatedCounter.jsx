import { useEffect, useMemo, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

/**
 * Count-up counter that animates once when scrolled into view.
 * `value` can be a number or a string like "30+" or "26" — numeric parts count up,
 * pre/suffix text (like "+" or spacing) is preserved.
 * Non-numeric values (e.g. "[TBD]") render as-is.
 */
export default function AnimatedCounter({
  value,
  className = "",
  duration = 1.6,
  "data-testid": testId,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const raw = String(value ?? "");

  // Memoize parsing so a fresh regex result doesn't retrigger the effect on every parent re-render.
  const parsed = useMemo(() => {
    const m = raw.match(/^(\D*)(\d[\d,]*)(.*)$/);
    if (!m) return null;
    return {
      prefix: m[1] ?? "",
      digits: m[2],
      suffix: m[3] ?? "",
      target: parseInt(m[2].replace(/,/g, ""), 10),
    };
  }, [raw]);

  const [display, setDisplay] = useState(
    parsed ? `${parsed.prefix}0${parsed.suffix}` : raw
  );

  useEffect(() => {
    if (!parsed || !inView) return;
    const controls = animate(0, parsed.target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        const n = Math.round(v).toLocaleString();
        setDisplay(`${parsed.prefix}${n}${parsed.suffix}`);
      },
      onComplete: () => {
        setDisplay(`${parsed.prefix}${parsed.target.toLocaleString()}${parsed.suffix}`);
      },
    });
    return () => controls.stop();
  }, [inView, parsed, duration]);

  return (
    <span ref={ref} className={className} data-testid={testId}>
      {display}
    </span>
  );
}
