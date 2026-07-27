/**
 * Shared closing pull-quote used by About Mission, Approach, and Founding.
 * One canonical style — italic Noto Serif KR, gold, ~22px, top divider.
 *
 * Props:
 *   children — the quote text (no need to include quote marks; component adds them)
 *   showMarks — if true, wraps text in “ ”. Default true.
 *   variant   — "gold" (default) or "muted"
 */
export default function SectionQuote({ children, showMarks = true, className = "" }) {
  return (
    <div className={`pt-8 border-t border-[color:var(--kb-gold)]/30 max-w-3xl ${className}`}>
      <blockquote className="font-serif-kr text-[22px] md:text-[26px] font-light italic text-[color:var(--kb-gold)] leading-[1.5]">
        {showMarks ? <>&ldquo;{children}&rdquo;</> : children}
      </blockquote>
    </div>
  );
}
