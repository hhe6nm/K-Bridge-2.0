import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

/**
 * Count-up counter that animates once when scrolled into view.
 * `value` can be a number or a string like "30+" or "[Decades]".
 *   - if numeric parts are found (e.g. "30+"), the digits count up and suffix is preserved
 *   - if it's purely non-numeric (e.g. "[Decades]"), it's rendered as-is (no animation)
 * Uses IntersectionObserver via framer-motion's useInView, `once: true`.
 */
export default function AnimatedCounter({ value, className = "", duration = 1.4, "data-testid": testId }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const raw = String(value ?? "");
  const match = raw.match(/^(\D*)(\d[\d,]*)(.*)$/); // prefix + digits + suffix
  const [display, setDisplay] = useState(match ? `${match[1]}0${match[3]}` : raw);

  useEffect(() => {
    if (!match) return; // no numeric part — nothing to animate
    if (!inView) return;
    const target = parseInt(match[2].replace(/,/g, ""), 10);
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        const n = Math.round(v).toLocaleString();
        setDisplay(`${match[1]}${n}${match[3]}`);
      },
    });
    return () => controls.stop();
  }, [inView, match, duration]);

  return (
    <span ref={ref} className={className} data-testid={testId}>
      {display}
    </span>
  );
}
