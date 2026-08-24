import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { FadeUp, MaskedLineInView } from "@/components/MaskedReveal";
import ChapterBadge from "@/components/ChapterBadge";
import Pill from "@/components/Pill";
import StatsBlock from "@/components/StatsBlock";
import SectionQuote from "@/components/SectionQuote";
import { useLang } from "@/lib/i18n";

// Commercial storefront / retail corridor — reflects the CRE background
const FOUNDING_IMG = "https://images.unsplash.com/photo-1480944657103-7fed22359e1d?fm=jpg&q=85&w=1600&auto=format&fit=crop";

const CONTENT = {
  ko: {
    eyebrow: "About K Bridge",
    title: "한국의 도전을, 미국의 현실로.",
    subtitle: "이론이 아닌 현장에서, 함께 만듭니다.",

    introBadge: "회사 개요",
    introTitle: "이론이 아닌, 현장에서 배운 것을 전달합니다.",
    introBody: [
      "K Bridge Partners는 미국 상업 부동산과 프랜차이즈 실무 경험, 그리고 데이터 기반 시장 분석 역량을 바탕으로 설립되었습니다.",
      "20년 이상 워싱턴 DC 및 버지니아 지역을 중심으로 상업용 부동산 실무를 쌓아온 팀이, 한국 브랜드가 미국 시장에서 겪는 실질적인 어려움을 가까이에서 지켜보며 시작한 파트너십입니다.",
    ],
    stats: [
      { value: "20+", unit: "년", label: "상업 부동산 실무 경험" },
      { value: "8", unit: "개", label: "커버하는 미국 주요 시장" },
      { value: "28", unit: "곳", label: "전문 네트워크 파트너" },
      { value: "6", unit: "개", label: "제공 서비스 분야" },
    ],

    missionBadge: "미션",
    missionStatement: "한국 브랜드가 미국 시장에서 지속 가능한 성공을 이루도록, 실질적으로 함께 실행합니다.",
    missionBody: "미국 상업 임대차 계약에는 한국에 없는 구조가 있습니다. 퍼센티지 임대료, 코테넌시 조항, 개인 보증 — 이름조차 낯선 이 조항들이, 실제로는 브랜드의 손익을 결정합니다.",
    missionPills: [
      { ko: "퍼센티지 임대료", en: "percentage rent" },
      { ko: "코테넌시 조항", en: "co-tenancy clause" },
      { ko: "개인 보증", en: "personal guarantee" },
    ],
    missionQuote: "숫자와 조항 너머의 판단은, 현장에서 나옵니다.",

    approachBadge: "접근 방식",
    approachTitle: "한 팀이, 처음부터 끝까지.",
    approachStages: [
      { title: "미국 시장 조사", body: "미국 시장과 소비자, 경쟁 브랜드를 분석해 진출 방향을 그립니다." },
      { title: "미국 법인 설립 지원", body: "어떤 주에 법인을 낼지, 어떤 구조가 세제상 유리한지 결정하고 등록과 EIN 발급까지 지원합니다." },
      { title: "상표 등록 지원", body: "미국 상표 출원과 브랜드 보호 절차를 함께 진행합니다." },
      { title: "상권 분석", body: "후보 지역의 유동인구와 경쟁 환경을 데이터로 검토합니다." },
      { title: "부동산 입지 선정", body: "상권 리서치를 바탕으로 최적의 입지 후보를 함께 좁혀갑니다." },
      { title: "임대차 협상", body: "퍼센티지 임대료, 코테넌시 조항 같은 조건을 직접 조율합니다." },
      { title: "인허가 및 사업자 등록 지원", body: "업종별 인허가와 사업자 등록 절차를 안내하고 대행합니다." },
      { title: "시공 조율", body: "시공 파트너 선정부터 일정 관리까지 현장에서 함께합니다." },
      { title: "오픈 이후 운영", body: "매장이 문을 연 후, 안정화될 때까지 오퍼레이션을 튜닝합니다." },
      { title: "프랜차이즈 확장", body: "운영 데이터를 바탕으로 추가 매장과 가맹 확장 전략을 수립합니다." },
    ],
    approachClosing: "한 번에 소수의 브랜드만 맡습니다. 깊이 있게, 끝까지.",

    foundingBadge: "창업 이야기",
    foundingHook: "좋은 브랜드가, 좋은 아이템을 가지고, 잘못된 자리에서 시작하는 순간을 우리는 수십 년간 지켜봤습니다.",
    foundingPatterns: [
      "임대인의 언어를 몰라서 불리한 조건에 서명하는 브랜드.",
      "상권의 결을 읽지 못해 열정만으로 위치를 정한 브랜드.",
      "좋은 파트너를 만나기까지의 우회 비용을 감당하지 못한 브랜드.",
    ],
    foundingCredibility: "K Bridge는 수십 년간 미국 상업 부동산 현장에서 활동해온 창업팀의 실전 경험에서 출발했습니다. 그 시간이 만들어 낸 것은 계약서에는 적히지 않은 감각입니다 — 임대인이 어떤 조건에서 유연해지는지, 어떤 상권이 데이터와 달리 실제로 걷기 어려운지, 어떤 시공 업체가 예산을 지키는지.",
    foundingClosing: "리서치로는 얻어지지 않는 이 감각을, 처음부터 열어드리는 것 — 그것이 우리가 존재하는 이유입니다.",

    ctaTitle: "다음 단계를 함께 그려봅니다.",
    ctaButton: "무료 상담 신청",
  },

  en: {
    eyebrow: "About K Bridge",
    title: "Turning Korean ambition into American reality.",
    subtitle: "Built in the field — with you, not for you.",

    introBadge: "Company Overview",
    introTitle: "What we've learned in the field — not from reports.",
    introBody: [
      "K Bridge Partners was founded on hands-on U.S. commercial real estate and franchise experience, combined with data-driven market analysis.",
      "For 20+ years, our team has operated in Washington DC and Virginia commercial real estate — watching, up close, the challenges Korean brands face entering the U.S. This partnership was built from that vantage point.",
    ],
    stats: [
      { value: "20+", unit: "yrs", label: "of commercial real estate experience" },
      { value: "8", unit: "markets", label: "U.S. metros we cover" },
      { value: "28", unit: "partners", label: "in our vetted network" },
      { value: "6", unit: "services", label: "verticals we deliver" },
    ],

    missionBadge: "Mission",
    missionStatement: "Help Korean brands achieve sustainable success in the U.S. — by executing alongside them, not advising from a distance.",
    missionBody: "U.S. commercial leases carry structures Korea simply doesn't have. Percentage rent, co-tenancy clauses, personal guarantees — clauses whose names alone are unfamiliar are the ones that actually decide a brand's P&L.",
    missionPills: [
      { ko: "Percentage Rent", en: "퍼센티지 임대료" },
      { ko: "Co-Tenancy Clause", en: "코테넌시 조항" },
      { ko: "Personal Guarantee", en: "개인 보증" },
    ],
    missionQuote: "Judgment beyond the numbers and clauses comes from being on the ground.",

    approachBadge: "Our Approach",
    approachTitle: "One team, from start to finish.",
    approachStages: [
      { title: "U.S. Market Research", body: "We analyze the U.S. market, target consumers, and competing brands to shape your entry." },
      { title: "U.S. Entity Formation", body: "We decide which state to form in and which structure is tax-optimal, then handle registration and EIN issuance." },
      { title: "Trademark Registration", body: "We file your U.S. trademark and manage brand protection." },
      { title: "Trade Area Analysis", body: "We assess foot traffic and the competitive landscape across candidate regions." },
      { title: "Site Selection", body: "Building on trade area research, we narrow down the strongest location candidates together." },
      { title: "Lease Negotiation", body: "Percentage rent, co-tenancy, personal guarantees — we negotiate the terms with you." },
      { title: "Permits & Business Registration", body: "We guide and manage industry-specific permits and business registration." },
      { title: "Buildout Coordination", body: "From contractor selection to schedule management — we're on-site with you." },
      { title: "Post-Opening Ops", body: "After the doors open, we stay to tune operations until the store stabilizes." },
      { title: "Franchise Expansion", body: "Using performance data, we build strategies for additional locations and franchise growth." },
    ],
    approachClosing: "We only take on a handful of brands at a time — deep, and to the end.",

    foundingBadge: "Founding Story",
    foundingHook: "For decades, we've watched the same moment repeat: a strong brand, with a strong product, starting in the wrong location.",
    foundingPatterns: [
      "Brands who signed disadvantageous terms because they didn't speak the landlord's language.",
      "Brands who picked a location on enthusiasm alone, missing the market's real texture.",
      "Brands who lost momentum before finding the right partners.",
    ],
    foundingCredibility: "K Bridge began with the hands-on experience of a founding team that has worked in U.S. commercial real estate for decades. That time produced an intuition contracts can't articulate — when landlords flex, which trade areas are hard to walk despite the data, which builders actually hit budget.",
    foundingClosing: "Opening up that intuition, from day one — that's why we exist.",

    ctaTitle: "Let's sketch the next step together.",
    ctaButton: "Free Consultation",
  },
};

export default function About() {
  const { lang } = useLang();
  const t = CONTENT[lang];

  return (
    <div>
      <PageHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

      {/* Intro + stats — shared component */}
      <StatsBlock
        badge={{ number: 1, label: t.introBadge }}
        badgeClassName="mb-10"
        stats={t.stats}
        testIdPrefix="about-stat"
        overviewTitle={<MaskedLineInView>{t.introTitle}</MaskedLineInView>}
        overviewBody={t.introBody}
      />

      {/* Mission — precise spec-per-brief layout */}
      <section className="bg-[color:var(--kb-bone)] pt-16 md:pt-20 pb-24 md:pb-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          {/* Chapter badge */}
          <FadeUp>
            <ChapterBadge number={2} label={t.missionBadge} />
          </FadeUp>

          {/* Gap ~40px, then quote w/ solid gold left bar */}
          <FadeUp delay={0.1}>
            <div className="mt-10 flex items-center gap-5" data-testid="mission-statement-block">
              <span className="w-2 self-stretch flex-shrink-0 bg-[color:var(--kb-gold)]" aria-hidden />
              <p className="font-serif text-3xl md:text-4xl font-light italic leading-[1.4] text-[color:var(--kb-gold)]">
                {t.missionQuote}
              </p>
            </div>
          </FadeUp>

          {/* Gap ~32px, then body paragraph */}
          <FadeUp delay={0.25}>
            <p className="mt-8 text-base md:text-[17px] text-[color:var(--kb-text)]/80 leading-[1.9] max-w-3xl">
              {t.missionBody}
            </p>
          </FadeUp>

          {/* Gap ~24px, then chip row (real components, not inline text) */}
          <FadeUp delay={0.35}>
            <div className="mt-6 flex flex-wrap gap-3" data-testid="mission-pills">
              {t.missionPills.map((p) => (
                <Pill key={p.ko} ko={p.ko} en={p.en} />
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Approach — new headline + timeline with connector line + ~32px between steps */}
      <section className="bg-[color:var(--kb-paper)] pt-16 md:pt-20 pb-24 md:pb-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <ChapterBadge number={3} label={t.approachBadge} />
          </FadeUp>

          {/* Closing quote moved to top, styled to match Mission section's gold-bar quote */}
          <FadeUp delay={0.1}>
            <div className="mt-10 flex items-center gap-5" data-testid="approach-quote-block">
              <span className="w-2 self-stretch flex-shrink-0 bg-[color:var(--kb-gold)]" aria-hidden />
              <p className="font-serif text-3xl md:text-4xl font-light italic leading-[1.4] text-[color:var(--kb-gold)]">
                {t.approachClosing}
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <h2 className="mt-8 font-serif-kr text-4xl md:text-5xl font-light leading-[1.2] text-[color:var(--kb-ink)] max-w-3xl">
              <MaskedLineInView>{t.approachTitle}</MaskedLineInView>
            </h2>
          </FadeUp>

          <FadeUp delay={0.25}>
            <ol
              className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6"
              data-testid="about-approach-timeline"
            >
              {t.approachStages.map((stage, i) => (
                <li
                  key={i}
                  className="bg-[color:var(--kb-bone)] border border-[color:var(--kb-border)] p-7 md:p-8"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex-shrink-0 w-9 h-9 rounded-full border border-[color:var(--kb-gold)] flex items-center justify-center">
                      <span className="text-[13px] text-[color:var(--kb-gold)] font-medium">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </span>
                    <h3 className="font-serif-kr text-xl md:text-2xl font-light text-[color:var(--kb-ink)]">
                      {stage.title}
                    </h3>
                  </div>
                  <p className="text-[15px] md:text-base text-[color:var(--kb-text)]/75 leading-[1.75]">
                    {stage.body}
                  </p>
                </li>
              ))}
            </ol>
          </FadeUp>
        </div>
      </section>

      {/* Founding Story */}
      <section className="bg-[color:var(--kb-bone)] pt-16 md:pt-20 pb-24 md:pb-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <ChapterBadge number={4} label={t.foundingBadge} />
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="relative aspect-[21/9] overflow-hidden mt-10 mb-14 clip-corner bg-[color:var(--kb-ink)]">
              <img
                src={FOUNDING_IMG}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-[color:var(--kb-gold)]/15 pointer-events-none" />
            </div>
          </FadeUp>

          {/* Quote — gold bar treatment matching Mission/Approach sections, right after image */}
          <FadeUp delay={0.15}>
            <div className="flex items-center gap-5 max-w-3xl" data-testid="founding-quote-block">
              <span className="w-2 self-stretch flex-shrink-0 bg-[color:var(--kb-gold)]" aria-hidden />
              <p className="font-serif text-3xl md:text-4xl font-light italic leading-[1.4] text-[color:var(--kb-gold)]">
                {t.foundingClosing}
              </p>
            </div>
          </FadeUp>

          {/* Narrative hook — NOT italic, no quote marks. Large plain narration. */}
          <FadeUp delay={0.2}>
            <p className="mt-8 text-lg text-[color:var(--kb-text)]/80 leading-[1.9] max-w-3xl">
              {t.foundingHook}
            </p>
          </FadeUp>

          {/* Three failure patterns */}
          <FadeUp delay={0.3}>
            <ul className="mt-14 space-y-6 max-w-3xl">
              {t.foundingPatterns.map((line, i) => (
                <li key={i} className="flex gap-5 text-lg text-[color:var(--kb-text)]/85 leading-[1.7]">
                  <span className="mt-3 flex-shrink-0 w-8 h-px bg-[color:var(--kb-gold)]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </FadeUp>

          {/* Credibility paragraph */}
          <FadeUp delay={0.4}>
            <p className="mt-14 text-lg text-[color:var(--kb-text)]/80 leading-[1.9] max-w-3xl">
              {t.foundingCredibility}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[color:var(--kb-ink)] text-white py-24 md:py-28">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-10 text-center">
          <FadeUp>
            <h2 className="font-serif-kr text-4xl md:text-6xl font-light leading-[1.1] italic text-[color:var(--kb-champagne)]">
              <MaskedLineInView>{t.ctaTitle}</MaskedLineInView>
            </h2>
            <div className="mt-10">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-[color:var(--kb-gold)] text-[color:var(--kb-ink)] px-10 py-5 text-sm tracking-[0.25em] uppercase hover:bg-[color:var(--kb-champagne)] transition-colors"
              >
                {t.ctaButton}
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
