import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { FadeUp, MaskedLineInView } from "@/components/MaskedReveal";
import { useLang } from "@/lib/i18n";

const CONTENT = {
  ko: {
    eyebrow: "About K Bridge",
    title: "우리는 다리를 놓습니다.",
    subtitle: "한국과 미국, 브랜드와 시장, 계획과 실행 사이에. K Bridge Partners는 이론이 아닌 경험 위에 세워진 자문 파트너입니다.",
    introEyebrow: "CHAPTER — 회사 개요",
    introTitle: "이론이 아닌, 현장에서 배운 것을 전달합니다.",
    introBody: [
      "K Bridge Partners는 미국 상업 부동산과 프랜차이즈 실무 경험, 그리고 데이터 기반 시장 분석 역량을 바탕으로 설립되었습니다.",
      "[수년/수십 년]간 워싱턴 DC 및 버지니아 지역을 중심으로 상업용 부동산 실무를 쌓아온 팀이, 한국 브랜드가 미국 시장에서 겪는 실질적인 어려움을 가까이에서 지켜보며 시작한 파트너십입니다.",
      "저희는 이론이 아닌 현장에서 배운 것을 전달합니다.",
    ],
    stats: [
      { value: "[수십]", unit: "년", label: "미국 상업 부동산 실무 경험" },
      { value: "[X]", unit: "개사", label: "지원한 브랜드 · 클라이언트" },
      { value: "[X]", unit: "건", label: "완결된 딜 · 프로젝트" },
      { value: "[8]", unit: "개", label: "커버하는 미국 주요 시장" },
    ],
    statsFootnote: "* 수치는 실 데이터로 교체 예정 (placeholder)",
    chapters: [
      {
        eyebrow: "CHAPTER — 미션",
        title: "미션",
        body: [
          "K Bridge Partners의 미션은 단순합니다. 한국 브랜드가 미국 시장에서 지속 가능한 성공을 이루도록, 실질적으로 함께 실행하는 것.",
          "미국은 세계에서 가장 큰 소비 시장이지만, 동시에 가장 복잡한 상업 인프라를 가진 시장이기도 합니다. 그래서 이곳에서의 성공은 좋은 브랜드만으로 결정되지 않습니다. 임대차의 미세한 조항, 상권의 감각적 이해, 로컬 파트너와의 신뢰 관계 — 이 모든 것이 성패를 가르는 변수입니다.",
          "우리는 그 변수들을 이론이 아닌 실무의 언어로 다루는 파트너입니다.",
        ],
      },
      {
        eyebrow: "CHAPTER — 창업 배경",
        title: "왜 이 회사를 시작했는가",
        body: [
          "창업 가족은 수십 년간 미국 서부와 동부의 상업 부동산 시장에서 실전을 쌓아왔습니다. 그 시간 동안 반복적으로 목격한 장면이 있었습니다 — 좋은 브랜드가, 좋은 아이템을 가지고, 잘못된 자리에서 시작하는 순간.",
          "임대인의 언어를 몰라서 불리한 조건에 서명하는 브랜드, 상권의 결을 읽지 못해 열정만으로 위치를 결정한 브랜드, 좋은 파트너를 만나기까지의 우회 비용을 감당하지 못한 브랜드들.",
          "K Bridge Partners는 그 반복을 끝내기 위해 시작되었습니다. 이론이 아니라 현장에서 확인한 함정과 지름길을, 한국 브랜드에게 처음부터 열어드리는 것 — 그것이 이 회사의 존재 이유입니다.",
        ],
      },
      {
        eyebrow: "CHAPTER — 접근 방식",
        title: "우리의 접근 방식",
        body: [
          "일반적인 컨설팅 펌은 리포트를 만듭니다. 우리는 실행을 함께합니다.",
          "K Bridge Partners는 시장 리서치와 진입 전략에서 끝나지 않습니다. 법인 설립의 실무 서류, 임대차 협상 테이블의 조건 조율, 시공 파트너와의 조율, 오픈 이후의 오퍼레이션 튜닝까지 — 실제로 매장이 문을 열고 안정적으로 운영되기까지의 전 여정을 하나의 팀이 책임집니다.",
          "그래서 우리는 프로젝트를 많이 맡지 않습니다. 각 브랜드에 충분한 밀도의 시간을 투입할 수 있는 규모로만 파트너십을 구성합니다.",
        ],
      },
      {
        eyebrow: "CHAPTER — 창업자 이야기",
        title: "창업자의 이야기",
        body: [
          "K Bridge는 수십 년간 미국 상업 부동산의 현장에서 활동해온 창업 가족의 실전 경험에서 출발했습니다. 대형 프랜차이즈의 앵커 딜부터, 독립 부티크의 첫 매장 오픈까지 — 규모와 카테고리를 가로지르는 다양한 프로젝트를 임대인과 임차인 양측의 시각에서 모두 경험한 이력이 회사의 뿌리입니다.",
          "그 시간이 만들어낸 것은 계약서에는 적히지 않은 관행에 대한 감각입니다. 임대인이 어떤 조건에서 유연해지는지, 어떤 상권이 데이터와 달리 실제로 걷기 어려운지, 어떤 시공 업체가 예산을 지키는지 — 이 모든 것이 리서치로는 얻어지지 않는 K Bridge의 자산입니다.",
        ],
      },
    ],
    quoteEyebrow: "A MESSAGE",
    quote: "\u201C한국 브랜드가 미국에서 실패하는 이유는 대부분 실력이 부족해서가 아닙니다. 시장의 문법을 몰라서입니다. 우리는 그 문법을 함께 읽어드립니다.\u201D",
    quoteAttr: "— K Bridge Partners, 창업자",
    recognitionEyebrow: "RECOGNITION",
    recognitionTitle: "수상 · 인증",
    recognitionBody: "추후 업데이트 예정입니다.",
    recognitionCta: "상담 신청",
    placeholder: "Placeholder",
  },
  en: {
    eyebrow: "About K Bridge",
    title: "We build the bridge.",
    subtitle: "Between Korea and America, between brand and market, between plan and execution. K Bridge Partners is an advisory partnership built on experience, not theory.",
    introEyebrow: "CHAPTER — COMPANY OVERVIEW",
    introTitle: "What we've learned in the field — not from reports.",
    introBody: [
      "K Bridge Partners was founded on hands-on U.S. commercial real estate and franchise experience, combined with data-driven market analysis.",
      "For [years/decades], our team has operated in Washington DC and Virginia commercial real estate — watching, up close, the challenges Korean brands face entering the U.S. This partnership was built from that vantage point.",
      "We share what we've learned on the ground, not what's written in reports.",
    ],
    stats: [
      { value: "[Decades]", unit: "yrs", label: "of U.S. real estate experience" },
      { value: "[X]", unit: "brands", label: "supported to date" },
      { value: "[X]", unit: "deals", label: "closed & projects delivered" },
      { value: "[8]", unit: "markets", label: "U.S. metros we cover" },
    ],
    statsFootnote: "* Numbers are placeholders — to be replaced with real data.",
    chapters: [
      { eyebrow: "CHAPTER — MISSION", title: "Mission", body: [
        "Our mission is simple. Help Korean brands achieve sustainable success in the U.S. — not by advising from a distance, but by executing alongside you.",
        "America is the world's largest consumer market, and also one of its most operationally complex. Success here isn't determined by brand alone. Nuanced lease terms, an intuitive read of a trade area, trust with local partners — these are the real variables.",
        "We handle those variables in the language of practice, not theory.",
      ]},
      { eyebrow: "CHAPTER — WHY WE STARTED", title: "Why we started this firm", body: [
        "Our founding family has worked in U.S. West and East coast commercial real estate for decades. Across that time, one scene repeated itself — a strong brand, with a strong product, starting in the wrong location.",
        "Brands who signed disadvantageous terms because they didn't speak the landlord's language. Brands who picked a location on enthusiasm alone, missing the market's real texture. Brands who lost momentum before finding the right partners.",
        "K Bridge Partners was founded to end that repetition. Opening up the shortcuts and pitfalls we've seen firsthand — for Korean brands, from day one.",
      ]},
      { eyebrow: "CHAPTER — OUR APPROACH", title: "Our approach", body: [
        "Consultants produce reports. We execute alongside you.",
        "We don't stop at strategy. We handle entity paperwork, lease negotiations, buildout coordination, opening logistics, and post-opening operational tuning — until the store is open and running stably.",
        "That's why we don't take on many projects at once. Our partnerships are sized so that we can give each brand the density of time it needs.",
      ]},
      { eyebrow: "CHAPTER — FOUNDER STORY", title: "The founder's story", body: [
        "K Bridge began with the hands-on experience of a founding family that has worked in U.S. commercial real estate for decades. From anchor deals for major franchises to first-store openings for independent boutiques — across categories and scales, on both landlord and tenant sides.",
        "That time produced an intuition for what contracts don't say. When landlords flex on which terms. Which trade areas — despite the data — are hard to walk. Which builders actually hit budget. This intuition is the asset a research report cannot deliver.",
      ]},
    ],
    quoteEyebrow: "A MESSAGE",
    quote: "\u201CMost Korean brands don't fail in America because of quality. They fail because they don't yet speak the market's language. We help you read it — with you.\u201D",
    quoteAttr: "— K Bridge Partners, Founder",
    recognitionEyebrow: "RECOGNITION",
    recognitionTitle: "Awards & Certifications",
    recognitionBody: "Coming soon.",
    recognitionCta: "Contact us",
    placeholder: "Placeholder",
  },
};

export default function About() {
  const { lang } = useLang();
  const t = CONTENT[lang];
  return (
    <div>
      <PageHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

      {/* Intro + stats */}
      <section className="bg-[color:var(--kb-ink)] text-white py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <div className="flex items-center gap-4 mb-8">
              <span className="w-10 h-px bg-[color:var(--kb-gold)]" />
              <span className="text-[11px] tracking-[0.35em] uppercase text-[color:var(--kb-gold)]">{t.introEyebrow}</span>
            </div>
          </FadeUp>
          <div className="grid grid-cols-12 gap-8 lg:gap-16">
            <div className="col-span-12 lg:col-span-6">
              <h2 className="font-serif-kr text-4xl md:text-5xl font-light leading-[1.15] text-balance">
                <MaskedLineInView>{t.introTitle}</MaskedLineInView>
              </h2>
              <FadeUp delay={0.15}>
                {t.introBody.map((p, i) => (
                  <p key={i} className="mt-6 text-base md:text-lg text-white/75 leading-[1.9] max-w-xl">{p}</p>
                ))}
              </FadeUp>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {t.stats.map((s, i) => (
                  <FadeUp key={i} delay={0.2 + i * 0.08}>
                    <div data-testid={`about-stat-${i}`} className="border border-[color:var(--kb-border)] p-8 h-full min-h-[200px] flex flex-col justify-between hover:border-[color:var(--kb-gold)] transition-colors">
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif-kr text-5xl md:text-6xl font-light text-[color:var(--kb-gold)]">{s.value}</span>
                        <span className="text-sm text-[color:var(--kb-champagne)]/80 tracking-widest">{s.unit}</span>
                      </div>
                      <div className="mt-6 text-[13px] text-white/75 leading-relaxed">{s.label}</div>
                    </div>
                  </FadeUp>
                ))}
              </div>
              <div className="mt-6 text-xs text-white/40 italic">{t.statsFootnote}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapters */}
      <section className="bg-[color:var(--kb-bone)] py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          {t.chapters.map((c, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="grid grid-cols-12 gap-8 py-16 border-b border-[color:var(--kb-border)]">
                <div className="col-span-12 md:col-span-4">
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-px bg-[color:var(--kb-gold)]" />
                    <span className="text-[11px] tracking-[0.35em] uppercase text-[color:var(--kb-gold)]">{c.eyebrow}</span>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-8">
                  <h3 className="font-serif-kr text-3xl md:text-4xl font-light leading-tight">
                    <MaskedLineInView>{c.title}</MaskedLineInView>
                  </h3>
                  {c.body.map((b, j) => (
                    <p key={j} className="mt-6 text-lg text-[color:var(--kb-text)]/75 leading-[1.9] max-w-2xl">{b}</p>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="bg-[color:var(--kb-ink)] text-white py-32">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-10 text-center">
          <div className="text-[11px] tracking-[0.35em] uppercase text-[color:var(--kb-gold)] mb-10">{t.quoteEyebrow}</div>
          <FadeUp>
            <blockquote className="font-serif-kr text-3xl md:text-5xl font-light leading-[1.25] italic text-balance">
              {t.quote}
            </blockquote>
            <div className="mt-10 text-[color:var(--kb-champagne)] text-sm tracking-[0.25em] uppercase">{t.quoteAttr}</div>
          </FadeUp>
        </div>
      </section>

      {/* Recognition */}
      <section className="bg-[color:var(--kb-paper)] py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="text-[11px] tracking-[0.35em] uppercase text-[color:var(--kb-gold)] mb-6">{t.recognitionEyebrow}</div>
          <h3 className="font-serif-kr text-3xl md:text-4xl font-light">{t.recognitionTitle}</h3>
          <p className="mt-4 text-[color:var(--kb-muted)] max-w-xl">{t.recognitionBody}</p>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="aspect-[3/2] border border-[color:var(--kb-border)] bg-white/60 flex items-center justify-center text-[color:var(--kb-muted)] text-xs tracking-[0.3em] uppercase">
                {t.placeholder}
              </div>
            ))}
          </div>
          <div className="mt-16">
            <Link to="/contact" className="inline-flex items-center gap-2 text-[color:var(--kb-ink)] tick-arrow text-sm tracking-[0.25em] uppercase">{t.recognitionCta}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
