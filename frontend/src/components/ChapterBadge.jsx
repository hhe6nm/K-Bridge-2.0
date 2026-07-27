/**
 * Numbered chapter badge — replaces the old "CHAPTER — X" pattern site-wide.
 * Gold outlined circle with a 2-digit number + label in gold caps to the right.
 *
 * variant:
 *   - "dark"  → light label text for dark navy backgrounds
 *   - "light" → default kb-gold on light backgrounds
 */
export default function ChapterBadge({ number, label, variant = "light", className = "" }) {
  const n = String(number).padStart(2, "0");
  return (
    <div className={`inline-flex items-center gap-4 ${className}`} data-testid={`chapter-badge-${n}`}>
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[color:var(--kb-gold)] text-[color:var(--kb-gold)] text-[11px] tracking-[0.1em] font-medium">
        {n}
      </span>
      <span
        className={`text-[12px] tracking-[0.35em] uppercase text-[color:var(--kb-gold)] ${
          variant === "dark" ? "" : ""
        }`}
      >
        {label}
      </span>
    </div>
  );
}
