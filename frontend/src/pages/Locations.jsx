import PageHeader from "@/components/PageHeader";
import { FadeUp } from "@/components/MaskedReveal";
import { Link } from "react-router-dom";
import { useLang } from "@/lib/i18n";
import { LOCATIONS, LOCATION_FALLBACK_GRADIENT } from "@/lib/locations";

const CONTENT = {
  ko: {
    eyebrow: "Locations",
    title: "우리가 서있는 도시들.",
    subtitle: `K Bridge Partners는 미국 내 한인 브랜드가 활발히 진출하는 ${LOCATIONS.length}개 주요 시장에서 활동합니다.`,
    marketLabel: "타겟 시장",
    hoverCta: "브리핑 요청",
    footEyebrow: "COVERAGE",
    footTitle1: "지역에 상관없이,",
    footTitleItalic: "함께 진출할 수 있습니다.",
    footBody: "브랜드의 특성에 따라 상기 도시 외 다른 지역이 적합할 수 있습니다. 시장 특성과 브랜드 포지셔닝을 종합해 최적의 진입 지역을 함께 판단해 드립니다.",
    cta: "지역별 상담 요청",
    noteKey: "ko_note",
  },
  en: {
    eyebrow: "Locations",
    title: "Where Your Brand Belongs.",
    subtitle: `Every market has its own character. We help you find the places where your brand can compete, connect, and grow.`,
    marketLabel: "Target market",
    hoverCta: "Request a briefing",
    footEyebrow: "COVERAGE",
    footTitle1: "Wherever your brand belongs,",
    footTitleItalic: "we can go there together.",
    footBody: "Depending on your brand, a different market may be the right fit. We help you pick the right region based on market character and brand positioning.",
    cta: "Request a market briefing",
    noteKey: "en_note",
  },
};

function LocationImg({ src, alt }) {
  const onError = (e) => {
    const img = e.currentTarget;
    img.style.display = "none";
    if (img.parentElement) img.parentElement.style.background = LOCATION_FALLBACK_GRADIENT;
  };
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={onError}
      className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:opacity-75 group-hover:scale-110 transition-all duration-[1200ms] ease-out"
    />
  );
}

export default function Locations() {
  const { lang } = useLang();
  const t = CONTENT[lang];
  return (
    <div>
      <PageHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

      <section className="bg-[color:var(--kb-ink)] text-white py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LOCATIONS.map((c, i) => (
              <FadeUp key={c.key} delay={i * 0.05} className="h-full">
                <div
                  data-testid={`location-card-${c.key}`}
                  className="group relative overflow-hidden border border-[color:var(--kb-border)] hover:border-[color:var(--kb-gold)] transition-colors aspect-[3/4] h-full"
                  style={{ background: LOCATION_FALLBACK_GRADIENT }}
                >
                  <LocationImg src={c.img} alt={c.en} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050914] via-[#050914]/70 to-[#050914]/20 pointer-events-none" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-[color:var(--kb-gold)]/10 pointer-events-none" />

                  <div className="relative h-full flex flex-col justify-between p-6">
                    <div className="flex items-start justify-between">
                      <span className="w-8 h-px bg-[color:var(--kb-gold)] mt-4" />
                      <span className="text-[9px] tracking-[0.3em] uppercase text-[color:var(--kb-gold)]/90">
                        {t.marketLabel}
                      </span>
                    </div>
                    <div>
                      <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-gold)] mb-2">{c.state}</div>
                      <h3 className="font-serif-kr text-3xl font-light leading-tight text-[color:var(--kb-champagne)]">
                        {lang === "ko" ? c.ko : c.en}
                      </h3>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {c.tags.map((tag) => (
                          <span key={tag} className="text-[9px] tracking-[0.2em] uppercase border border-[color:var(--kb-gold)]/30 px-2 py-1 text-[color:var(--kb-champagne)]/80">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-[#050914]/95 backdrop-blur-sm border-t border-[color:var(--kb-gold)]/40 p-6">
                    <p className="text-[13px] text-white/85 leading-[1.7]">{c[t.noteKey]}</p>
                    <Link
                      to="/contact"
                      className="mt-4 inline-flex items-center gap-2 text-[color:var(--kb-gold)] text-[10px] tracking-[0.3em] uppercase tick-arrow"
                    >
                      {t.hoverCta}
                    </Link>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <div className="mt-24 border-t border-[color:var(--kb-border)] pt-16 grid grid-cols-12 gap-8 lg:gap-12">
            <div className="col-span-12 lg:col-span-7">
              <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-gold)] mb-4">{t.footEyebrow}</div>
              <h3
                className="font-serif-kr text-3xl md:text-[42px] font-light leading-[1.25] text-balance"
                style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
              >
                {t.footTitle1} <span className="italic text-[color:var(--kb-gold)]">{t.footTitleItalic}</span>
              </h3>
            </div>
            <div className="col-span-12 lg:col-span-5 flex items-start lg:items-center">
              <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-md">{t.footBody}</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link to="/contact" className="inline-flex items-center gap-3 bg-[color:var(--kb-gold)] text-[color:var(--kb-ink)] px-10 py-4 text-sm tracking-[0.25em] uppercase hover:bg-[color:var(--kb-champagne)] transition-colors">
              {t.cta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
