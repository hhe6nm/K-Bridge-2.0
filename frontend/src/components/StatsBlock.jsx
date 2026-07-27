import { FadeUp } from "@/components/MaskedReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import ChapterBadge from "@/components/ChapterBadge";

/**
 * Shared 4-stat block with animated count-up. Used by Home and About so both
 * pages stay in sync (previously drifted after independent edits).
 *
 * Props:
 *   stats: [{ value, unit, label }]
 *   badge: { number, label } — the ChapterBadge shown above the stats
 *   testIdPrefix: string — e.g. "home-stat" or "about-stat"
 *   overviewTitle, overviewBody[]: left column content
 */
export default function StatsBlock({ stats, badge, testIdPrefix, overviewTitle, overviewBody, children }) {
  return (
    <section className="bg-[color:var(--kb-ink)] text-white py-16 md:py-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        {badge && (
          <FadeUp>
            <ChapterBadge number={badge.number} label={badge.label} variant="dark" className="mb-6" />
          </FadeUp>
        )}
        <div className="grid grid-cols-12 gap-8 lg:gap-16">
          <div className="col-span-12 lg:col-span-6">
            {overviewTitle && (
              <h2 className="font-serif-kr text-4xl md:text-5xl font-light leading-[1.15] text-balance">
                {overviewTitle}
              </h2>
            )}
            {overviewBody && (
              <FadeUp delay={0.15}>
                {overviewBody.map((p, i) => (
                  <p key={i} className="mt-6 text-base md:text-lg text-white/75 leading-[1.9] max-w-xl">{p}</p>
                ))}
              </FadeUp>
            )}
            {children}
          </div>

          <div className="col-span-12 lg:col-span-6">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {stats.map((s, i) => (
                <FadeUp key={i} delay={0.2 + i * 0.08}>
                  <div
                    data-testid={`${testIdPrefix}-${i}`}
                    className="border border-[color:var(--kb-border)] p-8 h-full min-h-[180px] flex flex-col justify-between hover:border-[color:var(--kb-gold)] hover:-translate-y-1 transition-all duration-500"
                  >
                    <div className="flex items-baseline gap-2">
                      <AnimatedCounter
                        value={s.value}
                        className="font-serif-kr text-5xl md:text-6xl font-light text-[color:var(--kb-gold)]"
                        data-testid={`${testIdPrefix}-value-${i}`}
                      />
                      <span className="text-sm text-[color:var(--kb-champagne)]/80 tracking-widest">{s.unit}</span>
                    </div>
                    <div className="mt-6 text-[13px] text-white/75 leading-relaxed">{s.label}</div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
