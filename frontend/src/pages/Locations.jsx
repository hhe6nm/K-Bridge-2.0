import PageHeader from "@/components/PageHeader";
import { FadeUp } from "@/components/MaskedReveal";
import { Link } from "react-router-dom";
import { useLang } from "@/lib/i18n";

// Night skyline photography (moody, matches navy + gold palette).
// Note: images treated with a dark navy gradient overlay so the whole set feels cohesive.
const CITIES = [
  { key: "dc", ko: "워싱턴 D.C.", en: "Washington D.C.", state: "DC · Capital Region",
    img: "https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    ko_note: "K Bridge Partners의 홈 마켓. 정부 · 국제기관 인접 지역의 리테일과 F&B 진출의 관문.",
    en_note: "K Bridge's home market — a gateway for retail and F&B entering the U.S. capital corridor.",
    tags: ["Retail", "F&B", "K-Beauty"] },
  { key: "va", ko: "버지니아", en: "Virginia", state: "VA · Northern VA · Richmond",
    img: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    ko_note: "북부 버지니아의 성장 상권과 리치먼드의 저비용 진입 옵션이 공존하는 균형 시장.",
    en_note: "Growth submarkets in Northern Virginia balanced with lower entry cost in Richmond.",
    tags: ["Retail", "F&B"] },
  { key: "mia", ko: "마이애미", en: "Miami", state: "FL · South Florida",
    img: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    ko_note: "라틴 아메리카와 미국을 잇는 관문. 프리미엄 F&B와 라이프스타일 브랜드의 실험 시장.",
    en_note: "The Latin America ↔ U.S. gateway — an experimentation market for premium F&B and lifestyle.",
    tags: ["F&B", "Lifestyle"] },
  { key: "nyc", ko: "뉴욕", en: "New York", state: "NY · Manhattan · Brooklyn · Queens",
    img: "https://images.unsplash.com/photo-1522083165195-3424ed129620?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    ko_note: "글로벌 브랜드의 무대. 프리미엄 포지셔닝과 미디어 노출이 결정적인 도시.",
    en_note: "The stage for global brands — where premium positioning and media exposure decide the outcome.",
    tags: ["Retail", "Fashion", "F&B"] },
  { key: "nj", ko: "뉴저지", en: "New Jersey", state: "NJ · Bergen · Fort Lee · Palisades Park",
    img: "https://images.unsplash.com/photo-1560574188-6a6774965120?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    ko_note: "미국에서 가장 밀도 높은 한인 커뮤니티. F&B와 리테일의 검증된 진입 상권.",
    en_note: "One of the densest Korean-American communities in the U.S. — proven ground for F&B and retail.",
    tags: ["F&B", "Retail"] },
  { key: "dal", ko: "댈러스", en: "Dallas", state: "TX · DFW Metroplex",
    img: "https://images.unsplash.com/photo-1531778272849-d1dd22444c76?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    ko_note: "빠르게 성장하는 아시안 커뮤니티와 상대적으로 낮은 진입 비용의 균형 시장.",
    en_note: "A fast-growing Asian community balanced with relatively lower entry cost.",
    tags: ["F&B", "Franchise"] },
  { key: "atl", ko: "애틀랜타", en: "Atlanta", state: "GA · Metro Atlanta",
    img: "https://images.unsplash.com/photo-1575917649705-5b59aaa12e6b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    ko_note: "미국 남부의 상업 허브. Duluth 등 아시안 커뮤니티 중심 상권의 성장세.",
    en_note: "A commercial hub of the U.S. South — Duluth and Asian-community submarkets are growing rapidly.",
    tags: ["F&B", "Retail"] },
  { key: "lv", ko: "라스베가스", en: "Las Vegas", state: "NV · Strip · Chinatown corridor",
    img: "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    ko_note: "관광객 트래픽 + 아시안 커뮤니티 상권이 공존하는 독특한 진입 시장.",
    en_note: "A unique market where tourist traffic overlaps with a strong Asian-community corridor.",
    tags: ["F&B", "Retail", "Franchise"] },
];

const CONTENT = {
  ko: {
    eyebrow: "Locations", title: "우리가 서있는 도시들.",
    subtitle: "K Bridge Partners는 미국 내 한인 브랜드가 활발히 진출하는 8개 주요 시장에서 활동합니다.",
    marketLabel: "타겟 시장",
    footEyebrow: "COVERAGE",
    footTitle1: "주요 도시가 아니라도",
    footTitleItalic: "문의는 언제나 환영입니다.",
    footBody: "브랜드의 특성에 따라 상기 도시 외 다른 지역이 적합할 수 있습니다. 시장 특성과 브랜드 포지셔닝을 종합해 최적의 진입 지역을 함께 판단해 드립니다.",
    cta: "지역별 상담 요청",
    noteKey: "ko_note",
  },
  en: {
    eyebrow: "Locations", title: "The cities we operate in.",
    subtitle: "K Bridge Partners operates in eight core U.S. markets where Korean brands are actively expanding.",
    marketLabel: "Target market",
    footEyebrow: "COVERAGE",
    footTitle1: "Not on this list?",
    footTitleItalic: "Reach out anyway.",
    footBody: "Depending on your brand, a different market may be the right fit. We help you pick the right region based on market character and brand positioning.",
    cta: "Request a market briefing",
    noteKey: "en_note",
  },
};

export default function Locations() {
  const { lang } = useLang();
  const t = CONTENT[lang];
  return (
    <div>
      <PageHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

      <section className="bg-[color:var(--kb-ink)] text-white py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CITIES.map((c, i) => (
              <FadeUp key={c.key} delay={i * 0.05}>
                <div data-testid={`location-card-${c.key}`} className="group relative overflow-hidden border border-[color:var(--kb-border)] hover:border-[color:var(--kb-gold)] transition-colors aspect-[3/4]">
                  <img
                    src={c.img}
                    alt={c.en}
                    className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:opacity-70 group-hover:scale-105 transition-all duration-[1200ms]"
                    loading="lazy"
                  />
                  {/* Navy overlay to unify palette */}
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
                      <p className="mt-4 text-[13px] text-white/75 leading-[1.7] line-clamp-3">
                        {c[t.noteKey]}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {c.tags.map((tag) => (
                          <span key={tag} className="text-[9px] tracking-[0.2em] uppercase border border-[color:var(--kb-gold)]/30 px-2 py-1 text-[color:var(--kb-champagne)]/80">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <div className="mt-24 border-t border-[color:var(--kb-border)] pt-16 grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-6">
              <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-gold)] mb-4">{t.footEyebrow}</div>
              <h3 className="font-serif-kr text-3xl md:text-4xl font-light leading-tight">
                {t.footTitle1} <span className="italic text-[color:var(--kb-gold)]">{t.footTitleItalic}</span>
              </h3>
            </div>
            <div className="col-span-12 lg:col-span-6 lg:pl-10 flex items-center">
              <p className="text-white/70 text-lg leading-relaxed">{t.footBody}</p>
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
