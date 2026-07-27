/**
 * Pill/chip — bilingual keyword callout. Small rounded outline with
 * Korean term + English in parentheses.
 */
export default function Pill({ ko, en, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-[color:var(--kb-gold)]/40 px-4 py-1.5 text-[12px] text-[color:var(--kb-text)]/85 whitespace-nowrap bg-white/40 ${className}`}
    >
      <span className="font-medium text-[color:var(--kb-ink)]">{ko}</span>
      {en && (
        <span className="text-[color:var(--kb-muted)]">({en})</span>
      )}
    </span>
  );
}

/** Dark-variant pill for dark navy backgrounds. */
export function PillDark({ ko, en, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-[color:var(--kb-gold)]/50 px-4 py-1.5 text-[12px] text-white/85 whitespace-nowrap bg-white/[0.03] ${className}`}
    >
      <span className="font-medium text-[color:var(--kb-champagne)]">{ko}</span>
      {en && (
        <span className="text-white/50">({en})</span>
      )}
    </span>
  );
}
