import { MaskedLine } from "./MaskedReveal";

export default function PageHeader({ eyebrow, title, subtitle, chapter }) {
  return (
    <section className="relative bg-[color:var(--kb-ink)] text-white pt-40 pb-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(198,168,124,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(198,168,124,0.3) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative">
        <div className="flex items-center gap-4 mb-8">
          {chapter && (
            <span className="editorial-num text-[color:var(--kb-gold)] text-5xl">{chapter}</span>
          )}
          <span className="text-[11px] tracking-[0.35em] uppercase text-[color:var(--kb-gold)]">
            {eyebrow}
          </span>
        </div>
        <h1 className="font-serif-kr text-5xl md:text-7xl font-light tracking-tight leading-[1.02] max-w-5xl">
          <MaskedLine>{title}</MaskedLine>
        </h1>
        {subtitle && (
          <p className="mt-8 max-w-2xl text-lg text-white/70 leading-relaxed">{subtitle}</p>
        )}
      </div>
      <div className="hairline-gold mt-16 max-w-[1440px] mx-auto" />
    </section>
  );
}
