import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { FadeUp, MaskedLineInView } from "@/components/MaskedReveal";
import ChapterBadge from "@/components/ChapterBadge";
import StatsBlock from "@/components/StatsBlock";
import SectionQuote from "@/components/SectionQuote";
import { useLang } from "@/lib/i18n";
import {
  Route,
  Building2,
  Network,
  Languages,
  Target,
  Check,
} from "lucide-react";

const APPROACH_ICONS = {
  route: Route,
  "building-skyscraper": Building2,
  network: Network,
  language: Languages,
  "target-arrow": Target,
};

const CONTENT = {
  ko: {
    eyebrow: "About K Bridge",
    title: "한국의 도전을, 미국의 현실로.",
    subtitle: "이론이 아닌 현장에서, 함께 만듭니다.",

    introBadge: "회사 개요",
    introTitle: "이론이 아닌, 현장에서 배운 것을 전달합니다.",
    introBody: [
      "K Bridge Partners LLC는 한국의 유망한 프랜차이즈 및 소비재 브랜드가 미국 시장에 성공적으로 진출하고 안정적으로 성장할 수 있도록 지원하는 U.S. Market Entry & Business Development 전문 파트너입니다.",
      "한국과 미국의 서로 다른 시장환경, 소비자 문화, 법률 및 비즈니스 시스템에 대한 이해를 바탕으로 단순한 컨설팅을 넘어 시장조사부터 사업구조 구축, 현지 파트너 발굴, 입지 선정, 프랜차이즈 개발, 마케팅 및 사업 확장까지 실제 시장 진입에 필요한 전 과정을 연결하고 실행합니다.",
      "K Bridge Partners의 핵심 가치는 \"Bridge\"에 있습니다.",
      "한국의 좋은 브랜드와 미국의 시장·자본·파트너·소비자를 연결하여, 한국 브랜드가 미국에서 지속 가능한 비즈니스로 성장할 수 있도록 돕습니다.",
    ],
    stats: [
      { value: "20+", unit: "년", label: "상업 부동산 실무 경험" },
      { value: "8", unit: "개", label: "커버하는 미국 주요 시장" },
      { value: "28", unit: "곳", label: "전문 네트워크 파트너" },
      { value: "6", unit: "개", label: "제공 서비스 분야" },
    ],

    ceoBadge: "대표 인사말",
    ceoQuote: "한 걸음, 한 걸음을 함께 걷겠습니다.",
    ceoBody: [
      "안녕하십니까. K Bridge Partners CEO Jessica Chong입니다.",
      "저는 오랫동안 미국에서 다양한 비즈니스와 시장을 경험하면서, 한국에는 충분한 경쟁력과 가능성을 갖추고도 미국 진출 과정의 정보와 네트워크 부족으로 기회를 놓치는 좋은 브랜드들이 많다는 것을 보아왔습니다.",
      "\"이 좋은 브랜드들이 미국 시장에서도 제대로 평가받고 성장할 수 있도록 도울 수 없을까?\" 그 고민과 바람에서 K Bridge Partners는 시작되었습니다.",
      "K Bridge Partners는 한국의 경쟁력 있는 브랜드와 미국 시장을 연결하는 비즈니스 파트너입니다. 시장에 대한 이해와 현지 경험을 바탕으로 진입 전략, 프랜차이즈 구축, 현지 파트너 발굴부터 안정적인 정착과 성장까지 함께하고 있습니다.",
      "저는 한국의 우수한 브랜드가 미국에서도 충분히 성공할 수 있다고 믿습니다. 좋은 브랜드에 올바른 전략과 신뢰할 수 있는 현지 파트너가 더해진다면, 낯선 시장은 더 이상 장벽이 아니라 새로운 성장의 기회가 될 수 있습니다.",
      "저희의 목표는 단순히 미국 진출을 돕는 데 그치지 않습니다. 한 브랜드 한 브랜드의 가치와 이야기를 이해하고, 미국 시장에 성공적으로 뿌리내려 지속적으로 성장할 수 있도록 가까이에서 함께하는 것입니다.",
      "가능성을 기회로, 기회를 성공으로 연결하겠습니다.",
      "좋은 인연을 만나 함께 새로운 성공 이야기를 만들어갈 수 있기를 기대합니다. 감사합니다.",
    ],
    ceoSignatureName: "Jessica Chong",
    ceoSignatureTitle: "K Bridge Partners 대표",

    foundingBadge: "진출 과제",
    foundingHook: "많은 한국 기업이 미국 진출 과정에서 다음과 같은 어려움을 경험합니다.",
    foundingPatterns: [
      "적합한 지역 선정의 어려움",
      "현지 부동산 시장 이해 부족",
      "법인 및 인허가 절차",
      "현지 파트너 발굴",
      "브랜드 현지화",
      "운영 시스템 구축",
    ],
    foundingCredibility: "K Bridge는 수십 년간 미국 상업 부동산 현장에서 활동해온 창업팀의 실전 경험에서 출발했습니다. 그 시간이 만들어 낸 것은 계약서에는 적히지 않은 감각입니다 — 임대인이 어떤 조건에서 유연해지는지, 어떤 상권이 데이터와 달리 실제로 걷기 어려운지, 어떤 시공 업체가 예산을 지키는지.",
    foundingClosing: "리서치로는 얻어지지 않는 이 감각을, 처음부터 열어드리는 것 — 그것이 우리가 존재하는 이유입니다.",

    approachBadge: "Why K Bridge",
    approachTitle: "왜 K Bridge와 함께해야 할까요.",
    approachStages: [
      {
        title: "처음부터 오픈까지, 원스톱 솔루션",
        body: "여러 업체를 거치지 않고, 한 팀이 시장 조사부터 매장 오픈까지 함께 실행합니다.",
        icon: "route",
        featured: true,
      },
      {
        title: "프랜차이즈 & 상업용 부동산 전문성",
        body: "일반 컨설팅이 아닌, 실전 부동산과 프랜차이즈 실무에서 나온 전문성입니다.",
        icon: "building-skyscraper",
      },
      {
        title: "미국 현지 네트워크",
        body: "20년 이상 다져온 임대인, 시공사, 전문가 네트워크로 실행력을 더합니다.",
        icon: "network",
      },
      {
        title: "한미 비즈니스 환경에 대한 이해",
        body: "한국의 사업 관행과 미국의 실무 방식, 양쪽 언어로 협상합니다.",
        icon: "language",
      },
      {
        title: "현장에서 실행 가능한 현실적인 전략",
        body: "이론이 아닌, 실제로 작동하는 전략만 제안합니다.",
        icon: "target-arrow",
      },
    ],
    approachClosing: "다섯 가지 이유, 하나의 확신.",

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
      "K Bridge Partners LLC is a specialized U.S. Market Entry & Business Development partner, helping promising Korean franchise and consumer brands enter the U.S. market successfully and grow sustainably.",
      "Built on an understanding of the differing market environments, consumer cultures, legal frameworks, and business systems between Korea and the U.S., we go beyond simple consulting — connecting and executing the full process a real market entry requires, from market research and business structuring to local partner sourcing, site selection, franchise development, marketing, and business expansion.",
      "K Bridge Partners' core value lies in being the \"Bridge.\"",
      "We connect great Korean brands with the U.S. market, capital, partners, and consumers — helping Korean brands grow into sustainable businesses in America.",
    ],
    stats: [
      { value: "20+", unit: "yrs", label: "of commercial real estate experience" },
      { value: "8", unit: "markets", label: "U.S. metros we cover" },
      { value: "28", unit: "partners", label: "in our vetted network" },
      { value: "6", unit: "services", label: "verticals we deliver" },
    ],

    ceoBadge: "A Message from Our CEO",
    ceoQuote: "We'll walk this journey with you, step by step.",
    ceoBody: [
      "Hello. I'm the CEO of K Bridge Partners.",
      "Over many years working across a range of businesses and markets in the U.S., I've seen many strong Korean brands — brands with real competitiveness and potential — lose real opportunities simply due to a lack of information and network in the process of entering the U.S. market.",
      "\"Could we help these great brands get properly recognized and grow in the U.S. market?\" K Bridge Partners began from that question and that hope.",
      "K Bridge Partners is a business partner that connects competitive Korean brands with the U.S. market. Built on market understanding and on-the-ground experience, we stay with our clients from entry strategy, franchise development, and local partner sourcing through to stable settlement and growth.",
      "I believe outstanding Korean brands can succeed in the U.S. as well. When a good brand is paired with the right strategy and a trustworthy local partner, an unfamiliar market stops being a barrier and becomes a new opportunity for growth.",
      "Our goal isn't simply to help with U.S. market entry. It's to understand the value and story behind each individual brand, and to stay close by as it puts down roots in the U.S. market and grows sustainably.",
      "Turning possibility into opportunity, and opportunity into success.",
      "I look forward to meeting great partners and building new success stories together. Thank you.",
    ],
    ceoSignatureName: "Jessica Chong",
    ceoSignatureTitle: "CEO, K Bridge Partners",

    foundingBadge: "Market Challenges",
    foundingHook: "Many Korean companies face the same challenges when entering the U.S. market.",
    foundingPatterns: [
      "Selecting the right target region",
      "Limited understanding of the local real estate market",
      "Entity formation and licensing procedures",
      "Finding trustworthy local partners",
      "Brand localization",
      "Building operational systems",
    ],
    foundingCredibility: "K Bridge began with the hands-on experience of a founding team that has worked in U.S. commercial real estate for decades. That time produced an intuition contracts can't articulate — when landlords flex, which trade areas are hard to walk despite the data, which builders actually hit budget.",
    foundingClosing: "Opening up that intuition, from day one — that's why we exist.",

    approachBadge: "Why K Bridge",
    approachTitle: "Why brands choose K Bridge.",
    approachStages: [
      {
        title: "One-stop, from day one to opening day",
        body: "No handoffs between vendors — one team executes everything from market research to opening day.",
        icon: "route",
        featured: true,
      },
      {
        title: "Franchise & commercial real estate expertise",
        body: "Specialized expertise from real commercial real estate and franchise work — not generalist consulting.",
        icon: "building-skyscraper",
      },
      {
        title: "A real network on the ground",
        body: "20+ years of relationships with landlords, contractors, and vetted partners.",
        icon: "network",
      },
      {
        title: "Fluent in both business cultures",
        body: "We understand Korean business norms and how deals actually get done in the U.S.",
        icon: "language",
      },
      {
        title: "Strategy that's actually executable",
        body: "Not theoretical playbooks — advice that's built to work on the ground.",
        icon: "target-arrow",
      },
    ],
    approachClosing: "Five reasons. One conviction.",

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
        containerClassName="max-w-[1200px] mx-auto px-6 lg:px-10"
      />

      {/* CEO's Message */}
      <section className="bg-[color:var(--kb-bone)] pt-16 md:pt-20 pb-24 md:pb-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          {/* Chapter badge */}
          <FadeUp>
            <ChapterBadge number={2} label={t.ceoBadge} />
          </FadeUp>

          {/* Section heading */}
          <FadeUp delay={0.1}>
            <h2 className="mt-10 font-serif-kr text-4xl md:text-5xl font-light leading-[1.2] text-[color:var(--kb-ink)] max-w-4xl text-balance">
              {t.ceoQuote}
            </h2>
          </FadeUp>

          {/* Body paragraphs */}
          <FadeUp delay={0.25}>
            <div className="mt-8 space-y-5 max-w-3xl">
              {t.ceoBody.map((p, i) => (
                <p key={i} className="text-base md:text-[17px] text-[color:var(--kb-text)]/80 leading-[1.9]">
                  {p}
                </p>
              ))}
            </div>
          </FadeUp>

          {/* Signature */}
          <FadeUp delay={0.35}>
            <div className="mt-10 max-w-3xl" data-testid="ceo-signature">
              <p className="font-serif text-xl italic text-[color:var(--kb-ink)]">{t.ceoSignatureName}</p>
              <p className="mt-1 text-sm text-[color:var(--kb-text)]/60">{t.ceoSignatureTitle}</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Market Challenges (formerly Founding Story) — now sits before Why K Bridge */}
      <section className="bg-[color:var(--kb-bone)] pt-16 md:pt-20 pb-24 md:pb-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <ChapterBadge number={3} label={t.foundingBadge} />
          </FadeUp>

          {/* Section heading */}
          <FadeUp delay={0.1}>
            <h2 className="mt-10 font-serif-kr text-4xl md:text-5xl font-light leading-[1.2] text-[color:var(--kb-ink)] max-w-4xl text-balance">
              {t.foundingClosing}
            </h2>
          </FadeUp>

          {/* Hook line — introduces the challenges list */}
          <FadeUp delay={0.2}>
            <p className="mt-8 text-lg text-[color:var(--kb-text)]/80 leading-[1.9] max-w-3xl">
              {t.foundingHook}
            </p>
          </FadeUp>

          {/* Six challenge points — checklist grid */}
          <FadeUp delay={0.3}>
            <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 max-w-3xl">
              {t.foundingPatterns.map((line, i) => (
                <li key={i} className="flex items-center gap-3 text-base md:text-lg text-[color:var(--kb-text)]/85">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border border-[color:var(--kb-gold)] flex items-center justify-center">
                    <Check size={13} strokeWidth={2} className="text-[color:var(--kb-gold)]" />
                  </span>
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

      {/* Why K Bridge — bento grid: one featured navy card + 4 supporting cards */}
      <section className="bg-[color:var(--kb-paper)] pt-16 md:pt-20 pb-24 md:pb-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <ChapterBadge number={4} label={t.approachBadge} />
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="mt-10 font-serif-kr text-4xl md:text-5xl font-light leading-[1.2] text-[color:var(--kb-ink)] max-w-4xl text-balance">
              {t.approachTitle}
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="mt-4 text-base text-[color:var(--kb-text)]/60 max-w-3xl">
              {t.approachClosing}
            </p>
          </FadeUp>

          <FadeUp delay={0.25}>
            <div
              className="mt-16 grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 gap-4 md:gap-5"
              data-testid="about-why-grid"
            >
              {t.approachStages.map((stage, i) => {
                const Icon = APPROACH_ICONS[stage.icon] || Route;

                if (stage.featured) {
                  return (
                    <div
                      key={i}
                      className="md:col-start-1 md:row-start-1 md:row-span-2 bg-[color:var(--kb-ink)] p-8 md:p-10 flex flex-col justify-between min-h-[220px]"
                    >
                      <Icon size={26} strokeWidth={1.5} className="text-[color:var(--kb-gold)]" />
                      <div>
                        <h3 className="font-serif-kr text-xl md:text-2xl font-light leading-[1.4] text-[color:var(--kb-champagne)] mb-3">
                          {stage.title}
                        </h3>
                        <p className="text-[13px] md:text-sm text-white/85 leading-[1.7]">
                          {stage.body}
                        </p>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={i}
                    className="bg-[color:var(--kb-bone)] border border-[color:var(--kb-border)] p-7 md:p-8"
                  >
                    <Icon size={22} strokeWidth={1.5} className="text-[color:var(--kb-gold)]" />
                    <h3 className="mt-3 font-serif-kr text-lg md:text-xl font-light leading-[1.4] text-[color:var(--kb-ink)] mb-2">
                      {stage.title}
                    </h3>
                    <p className="text-[13px] md:text-sm text-[color:var(--kb-text)]/70 leading-[1.7]">
                      {stage.body}
                    </p>
                  </div>
                );
              })}
            </div>
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
