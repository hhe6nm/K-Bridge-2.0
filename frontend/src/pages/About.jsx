import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { FadeUp, MaskedLineInView } from "@/components/MaskedReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import ChapterBadge from "@/components/ChapterBadge";
import Pill from "@/components/Pill";
import { useLang } from "@/lib/i18n";

// Storefront / retail corridor imagery for the founding-story photo
const FOUNDING_IMG = "https://images.unsplash.com/photo-1519558260268-cde7e03a0152?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600";

const CONTENT = {
  ko: {
    eyebrow: "About K Bridge",
    title: "한국의 도전을, 미국의 현실로.",
    subtitle: "이론이 아닌 현장에서, 함께 만듭니다.",

    introBadge: "회사 개요",
    introTitle: "이론이 아닌, 현장에서 배운 것을 전달합니다.",
    introBody: [
      "K Bridge Partners는 미국 상업 부동산과 프랜차이즈 실무 경험, 그리고 데이터 기반 시장 분석 역량을 바탕으로 설립되었습니다.",
      "26년간 워싱턴 DC 및 버지니아 지역을 중심으로 상업용 부동산 실무를 쌓아온 팀이, 한국 브랜드가 미국 시장에서 겪는 실질적인 어려움을 가까이에서 지켜보며 시작한 파트너십입니다.",
    ],
    stats: [
      { value: "26", unit: "년", label: "상업 부동산 실무 경험" },
      { value: "8", unit: "개", label: "커버하는 미국 주요 시장" },
      { value: "28", unit: "곳", label: "전문 네트워크 파트너" },
      { value: "6", unit: "개", label: "제공 서비스 분야" },
    ],

    missionBadge: "미션",
    missionStatement: "한국 브랜드가 미국 시장에서 지속 가능한 성공을 이루도록, 실질적으로 함께 실행합니다.",
    missionBody: "미국은 세계에서 가장 큰 소비 시장이지만, 동시에 가장 복잡한 상업 인프라를 가진 시장이기도 합니다. 퍼센티지 임대료(percentage rent), 코테넌시 조항(co-tenancy clause), 개인 보증(personal guarantee) — 계약서 안의 몇 줄이 브랜드의 5년을 좌우합니다.",
    missionPills: [
      { ko: "퍼센티지 임대료", en: "percentage rent" },
      { ko: "코테넌시 조항", en: "co-tenancy clause" },
      { ko: "개인 보증", en: "personal guarantee" },
    ],
    missionQuote: "우리는 그 변수들을 이론이 아닌 실무의 언어로 다루는 파트너입니다.",

    approachBadge: "접근 방식",
    approachTitle: "전략만 세우지 않습니다. 끝까지 함께합니다.",
    approachStages: [
      { title: "법인 설립", body: "어떤 주에 법인을 낼지, 어떤 구조가 세제상 유리한지 결정합니다." },
      { title: "임대차 협상", body: "퍼센티지 임대료, 코테넌시 조항 같은 조건을 직접 조율합니다." },
      { title: "시공 조율", body: "시공 파트너 선정부터 일정 관리까지 현장에서 함께합니다." },
      { title: "오픈 이후 운영", body: "매장이 문을 연 후, 안정화될 때까지 오퍼레이션을 튜닝합니다." },
    ],
    approachClosing: "한 번에 소수의 브랜드만 맡습니다. 깊이 있게, 끝까지.",

    foundingBadge: "창업 이야기",
    foundingHook: "좋은 브랜드가, 좋은 아이템을 가지고, 잘못된 자리에서 시작하는 순간을 우리는 수십 년간 지켜봤습니다.",
    foundingPatterns: [
      "임대인의 언어를 몰라서 불리한 조건에 서명하는 브랜드.",
      "상권의 결을 읽지 못해 열정만으로 위치를 정한 브랜드.",
      "좋은 파트너를 만나기까지의 우회 비용을 감당하지 못한 브랜드.",
    ],
    foundingCredibility: "K Bridge는 수십 년간 미국 상업 부동산 현장에서 활동해온 창업 가족의 실전 경험에서 출발했습니다. 그 시간이 만들어 낸 것은 계약서에는 적히지 않은 감각입니다 — 임대인이 어떤 조건에서 유연해지는지, 어떤 상권이 데이터와 달리 실제로 걷기 어려운지, 어떤 시공 업체가 예산을 지키는지.",
    foundingClosing: "리서치로는 얻어지지 않는 이 감각을, 처음부터 열어드리는 것 — 그것이 K Bridge Partners가 존재하는 이유입니다.",

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
      "For 26 years, our team has operated in Washington DC and Virginia commercial real estate — watching, up close, the challenges Korean brands face entering the U.S. This partnership was built from that vantage point.",
    ],
    stats: [
      { value: "26", unit: "yrs", label: "of commercial real estate experience" },
      { value: "8", unit: "markets", label: "U.S. metros we cover" },
      { value: "28", unit: "partners", label: "in our vetted network" },
      { value: "6", unit: "services", label: "verticals we deliver" },
    ],

    missionBadge: "Mission",
    missionStatement: "Help Korean brands achieve sustainable success in the U.S. — by executing alongside them, not advising from a distance.",
    missionBody: "America is the world's largest consumer market — and one of its most operationally complex. Percentage rent, co-tenancy clauses, personal guarantees — a few lines in a contract can decide a brand's next five years.",
    missionPills: [
      { ko: "Percentage Rent", en: "퍼센티지 임대료" },
      { ko: "Co-Tenancy Clause", en: "코테넌시 조항" },
      { ko: "Personal Guarantee", en: "개인 보증" },
    ],
    missionQuote: "We handle those variables in the language of practice, not theory.",

    approachBadge: "Our Approach",
    approachTitle: "We don't just strategize. We stay until it's done.",
    approachStages: [
      { title: "Entity Formation", body: "We decide which state to form in and which structure is tax-optimal for your plan." },
      { title: "Lease Negotiation", body: "Percentage rent, co-tenancy, personal guarantees — we negotiate the terms with you." },
      { title: "Buildout Coordination", body: "From contractor selection to schedule management — we're on-site with you." },
      { title: "Post-Opening Ops", body: "After the doors open, we stay to tune operations until the store stabilizes." },
    ],
    approachClosing: "We only take on a handful of brands at a time — deep, and to the end.",

    foundingBadge: "Founding Story",
    foundingHook: "For decades, we've watched the same moment repeat: a strong brand, with a strong product, starting in the wrong location.",
    foundingPatterns: [
      "Brands who signed disadvantageous terms because they didn't speak the landlord's language.",
      "Brands who picked a location on enthusiasm alone, missing the market's real texture.",
      "Brands who lost momentum before finding the right partners.",
    ],
    foundingCredibility: "K Bridge began with the hands-on experience of a founding family that has worked in U.S. commercial real estate for decades. That time produced an intuition contracts can't articulate — when landlords flex, which trade areas are hard to walk despite the data, which builders actually hit budget.",
    foundingClosing: "Opening up that intuition, from day one — that's why K Bridge Partners exists.",

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

      {/* Intro + stats */}
      <section className="bg-[color:var(--kb-ink)] text-white py-20 md:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <ChapterBadge number={1} label={t.introBadge} variant="dark" className="mb-8" />
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
                    <div data-testid={`about-stat-${i}`} className="border border-[color:var(--kb-border)] p-8 h-full min-h-[180px] flex flex-col justify-between hover:border-[color:var(--kb-gold)] hover:-translate-y-1 transition-all duration-500">
                      <div className="flex items-baseline gap-2">
                        <AnimatedCounter
                          value={s.value}
                          className="font-serif-kr text-5xl md:text-6xl font-light text-[color:var(--kb-gold)]"
                          data-testid={`about-stat-value-${i}`}
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

      {/* Mission */}
      <section className="bg-[color:var(--kb-bone)] py-24 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <ChapterBadge number={2} label={t.missionBadge} className="mb-10" />
          </FadeUp>

          {/* Isolated mission statement with gold left accent */}
          <FadeUp delay={0.1}>
            <div className="border-l-4 border-[color:var(--kb-gold)] pl-8 md:pl-12 py-6 max-w-4xl">
              <h2 className="font-serif-kr text-3xl md:text-5xl font-light leading-[1.25] text-[color:var(--kb-ink)]">
                <MaskedLineInView>{t.missionStatement}</MaskedLineInView>
              </h2>
            </div>
          </FadeUp>

          {/* Body */}
          <FadeUp delay={0.25}>
            <p className="mt-16 text-lg md:text-xl text-[color:var(--kb-text)]/80 leading-[1.9] max-w-3xl">
              {t.missionBody}
            </p>
          </FadeUp>

          {/* Pills */}
          <FadeUp delay={0.35}>
            <div className="mt-10 flex flex-wrap gap-3">
              {t.missionPills.map((p) => (
                <Pill key={p.ko} ko={p.ko} en={p.en} />
              ))}
            </div>
          </FadeUp>

          {/* Closing italic pull-quote */}
          <FadeUp delay={0.5}>
            <div className="mt-20 pt-10 border-t border-[color:var(--kb-gold)]/30 max-w-3xl">
              <blockquote className="font-serif-kr text-2xl md:text-3xl font-light italic text-[color:var(--kb-gold)] leading-[1.4]">
                &ldquo;{t.missionQuote}&rdquo;
              </blockquote>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Approach — vertical timeline */}
      <section className="bg-[color:var(--kb-paper)] py-24 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <ChapterBadge number={3} label={t.approachBadge} className="mb-8" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-serif-kr text-4xl md:text-5xl font-light leading-[1.2] text-[color:var(--kb-ink)] max-w-3xl">
              <MaskedLineInView>{t.approachTitle}</MaskedLineInView>
            </h2>
          </FadeUp>

          <ol className="mt-16 relative max-w-3xl" data-testid="about-approach-timeline">
            {/* Vertical line */}
            <div className="absolute left-[9px] top-2 bottom-2 w-px bg-[color:var(--kb-gold)]/30" aria-hidden />
            {t.approachStages.map((stage, i) => (
              <FadeUp key={i} delay={0.15 + i * 0.08}>
                <li className="relative pl-12 pb-12 last:pb-0">
                  <span
                    className="absolute left-0 top-1.5 w-[19px] h-[19px] rounded-full border-2 border-[color:var(--kb-gold)] bg-[color:var(--kb-paper)] flex items-center justify-center"
                    aria-hidden
                  >
                    <span className="w-2 h-2 rounded-full bg-[color:var(--kb-gold)]" />
                  </span>
                  <h3 className="font-serif-kr text-2xl md:text-3xl font-light text-[color:var(--kb-ink)]">
                    {stage.title}
                  </h3>
                  <p className="mt-3 text-lg text-[color:var(--kb-text)]/75 leading-[1.85]">{stage.body}</p>
                </li>
              </FadeUp>
            ))}
          </ol>

          <FadeUp delay={0.55}>
            <div className="mt-8 pt-8 border-t border-[color:var(--kb-gold)]/30 max-w-3xl">
              <blockquote className="font-serif-kr text-xl md:text-2xl font-light italic text-[color:var(--kb-gold)]">
                &ldquo;{t.approachClosing}&rdquo;
              </blockquote>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Founding Story (merged) */}
      <section className="bg-[color:var(--kb-bone)] py-24 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <ChapterBadge number={4} label={t.foundingBadge} className="mb-8" />
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="relative aspect-[21/9] overflow-hidden mb-14 clip-corner bg-[color:var(--kb-ink)]">
              <img
                src={FOUNDING_IMG}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-[color:var(--kb-gold)]/15 pointer-events-none" />
            </div>
          </FadeUp>

          {/* Narrative hook — serif italic */}
          <FadeUp delay={0.15}>
            <p className="font-serif-kr italic text-2xl md:text-3xl leading-[1.4] text-[color:var(--kb-ink)] max-w-3xl">
              &ldquo;{t.foundingHook}&rdquo;
            </p>
          </FadeUp>

          {/* Three failure patterns, stacked */}
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

          {/* Founder credibility paragraph */}
          <FadeUp delay={0.45}>
            <p className="mt-16 text-lg text-[color:var(--kb-text)]/80 leading-[1.9] max-w-3xl">
              {t.foundingCredibility}
            </p>
          </FadeUp>

          {/* Small gold divider */}
          <FadeUp delay={0.55}>
            <div className="mt-14 mb-8 w-16 h-px bg-[color:var(--kb-gold)]" />
          </FadeUp>

          {/* Closing line — body weight, NOT italic (per brief) */}
          <FadeUp delay={0.65}>
            <p className="text-lg md:text-xl text-[color:var(--kb-ink)] leading-[1.7] max-w-3xl font-medium">
              {t.foundingClosing}
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
