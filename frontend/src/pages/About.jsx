import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { FadeUp, MaskedLineInView } from "@/components/MaskedReveal";
import ChapterBadge from "@/components/ChapterBadge";
import Pill from "@/components/Pill";
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
  Globe,
  TrendingUp,
  Users,
  Rocket,
} from "lucide-react";

const APPROACH_ICONS = {
  route: Route,
  "building-skyscraper": Building2,
  network: Network,
  language: Languages,
  "target-arrow": Target,
};

const WHY_ICONS = {
  globe: Globe,
  "trending-up": TrendingUp,
  users: Users,
  rocket: Rocket,
};

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
    approachClosing: "한 번에 소수의 브랜드만 맡습니다. 깊이 있게, 끝까지.",

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

    whyBadge: "시장 기회",
    whyTitle: "미국 시장은, 새로운 성장 기회입니다.",
    whyInvestment: {
      value: "$1.0T+",
      valueSub: "1조 달러",
      label: "한국의 대미 투자 잔액",
      labelBold: "사상 최초 기록",
      bullets: [
        { pre: "2019–2024년 한국은 대미 외국인직접투자(FDIUS) 증가율 ", bold: "3위국(70% 성장)", suf: ", 그중 약 4분의 3이 도소매업에 집중" },
        { pre: "미국은 한국 ", bold: "해외투자의 최대 대상국", suf: " 지위를 지속적으로 유지 중이며, EU·동남아 대비 압도적 비중을 차지함" },
        { pre: "2026년 1분기 대미 투자, 전년 동기 대비 ", bold: "107.6% 증가", suf: " — 최근 4년 내 최고 수준을 기록함" },
        { pre: "도소매업 투자 51.0% 급증, ", bold: "27.3억 달러", suf: " — 소비재 브랜드가 활용할 유통·수입 인프라 구축이 본격화되고 있음을 시사" },
      ],
    },
    whyChart: {
      title: "대미 총 금융자산 (억 달러)",
      bars: [
        { label: "2024년말", value: 9450 },
        { label: "2025년말", value: 11492 },
      ],
      notes: ["전년 대비 12.9% 증가", "2022년 이후 첫 증가 전환"],
    },
    whyTable: {
      headers: { total: "총액", us: "미국" },
      rows: [
        { label: "2025년말(A)", total: "24,396", totalPct: "100.0", us: "11,492", usPct: "47.1", emphasis: true },
        { label: "직접투자", total: "8,363", totalPct: "100.0", us: "2,501", usPct: "29.9" },
        { label: "증권투자", total: "12,532", totalPct: "100.0", us: "8,028", usPct: "64.1" },
        { label: "파생금융상품", total: "360", totalPct: "100.0", us: "40", usPct: "11.0" },
        { label: "기타투자", total: "3,141", totalPct: "100.0", us: "923", usPct: "29.4" },
        { label: "2024년말(B)", total: "20,947", totalPct: "100.0", us: "9,450", usPct: "45.1", emphasis: true },
        { label: "증감(A-B)", total: "3,448", totalPct: null, us: "2,042", usPct: null, emphasis: true },
      ],
    },
    whyCrossoverTitle: "한식 프랜차이즈, 미국이 최대 해외 시장으로",
    whyCrossoverNote: "2020년 중국이 압도적 우위였으나, 2025년 미국이 역전했습니다.",
    whyCrossoverUS: { label: "미국", from: "528개", to: "1,100개+", change: "+109%" },
    whyCrossoverCN: { label: "중국", from: "1,368개", to: "830개", change: "-39%" },
    whyCrossoverYears: { start: "2020년", end: "2025년" },
    whyBullets: [
      { icon: "globe", text: "세계 최대 소비 시장" },
      { icon: "trending-up", text: "다양한 K-Brand 성장 기회" },
      { icon: "users", text: "아시안 브랜드 수요 증가" },
      { icon: "rocket", text: "글로벌 브랜드로 성장할 수 있는 시장" },
    ],

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
    approachClosing: "We only take on a handful of brands at a time — deep, and to the end.",

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

    whyBadge: "Market Opportunity",
    whyTitle: "The U.S. market is a new growth opportunity.",
    whyInvestment: {
      value: "$1.0T+",
      valueSub: "USD 1 trillion+",
      label: "Korea's cumulative investment balance in the U.S.",
      labelBold: "An all-time high",
      bullets: [
        { pre: "From 2019–2024, Korea ranked ", bold: "3rd globally in U.S. FDI growth (+70%)", suf: ", with roughly three-quarters concentrated in wholesale and retail." },
        { pre: "The U.S. remains Korea's ", bold: "largest destination for outbound investment", suf: ", holding an overwhelming share versus the EU and Southeast Asia." },
        { pre: "Q1 2026 investment into the U.S. grew ", bold: "107.6% year-over-year", suf: " — the highest level in the past four years." },
        { pre: "Wholesale/retail investment surged 51.0% to ", bold: "$2.73B", suf: ", signaling accelerating build-out of distribution and import infrastructure for consumer brands." },
      ],
    },
    whyChart: {
      title: "Korea's U.S.-bound financial assets ($100M)",
      bars: [
        { label: "End of 2024", value: 9450 },
        { label: "End of 2025", value: 11492 },
      ],
      notes: ["Up 12.9% year-over-year", "First increase since 2022"],
    },
    whyTable: {
      headers: { total: "Total", us: "U.S." },
      rows: [
        { label: "End of 2025 (A)", total: "24,396", totalPct: "100.0", us: "11,492", usPct: "47.1", emphasis: true },
        { label: "Direct investment", total: "8,363", totalPct: "100.0", us: "2,501", usPct: "29.9" },
        { label: "Portfolio investment", total: "12,532", totalPct: "100.0", us: "8,028", usPct: "64.1" },
        { label: "Derivatives", total: "360", totalPct: "100.0", us: "40", usPct: "11.0" },
        { label: "Other investment", total: "3,141", totalPct: "100.0", us: "923", usPct: "29.4" },
        { label: "End of 2024 (B)", total: "20,947", totalPct: "100.0", us: "9,450", usPct: "45.1", emphasis: true },
        { label: "Change (A−B)", total: "3,448", totalPct: null, us: "2,042", usPct: null, emphasis: true },
      ],
    },
    whyCrossoverTitle: "Korean F&B franchises: the U.S. is now the largest overseas market",
    whyCrossoverNote: "China led decisively in 2020 — by 2025, the U.S. had overtaken it.",
    whyCrossoverUS: { label: "U.S.", from: "528", to: "1,100+", change: "+109%" },
    whyCrossoverCN: { label: "China", from: "1,368", to: "830", change: "-39%" },
    whyCrossoverYears: { start: "2020", end: "2025" },
    whyBullets: [
      { icon: "globe", text: "The world's largest consumer market" },
      { icon: "trending-up", text: "Broad growth opportunities for K-brands" },
      { icon: "users", text: "Rising demand for Asian brands" },
      { icon: "rocket", text: "A market where brands can scale globally" },
    ],

    ctaTitle: "Let's sketch the next step together.",
    ctaButton: "Free Consultation",
  },
};

function BarChart({ bars, title }) {
  const max = 12000;
  const chartTop = 20;
  const chartBottom = 190;
  const chartHeight = chartBottom - chartTop;
  const barWidth = 70;
  const positions = [150, 330];
  const colors = ["var(--kb-text)", "var(--kb-gold)"];
  const opacities = [0.35, 1];

  return (
    <svg viewBox="0 0 500 220" className="w-full h-auto" role="img" aria-label={title}>
      <line x1="40" y1={chartBottom} x2="460" y2={chartBottom} stroke="var(--kb-border)" strokeWidth="1" />
      {bars.map((bar, i) => {
        const h = (bar.value / max) * chartHeight;
        const y = chartBottom - h;
        const x = positions[i];
        return (
          <g key={i}>
            <rect x={x} y={y} width={barWidth} height={h} fill={colors[i]} fillOpacity={opacities[i]} rx="2" />
            <text x={x + barWidth / 2} y={y - 10} fontSize="14" fontWeight="500" fill="var(--kb-ink)" textAnchor="middle">
              {bar.value.toLocaleString()}
            </text>
            <text x={x + barWidth / 2} y={chartBottom + 20} fontSize="13" fill="var(--kb-muted)" textAnchor="middle">
              {bar.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function CrossoverChart({ us, cn, years }) {
  // Fixed geometry: three x-positions (start, crossover, end), y mapped from value/1400 range.
  const usPoints = "60,140 300,90 540,74";
  const cnPoints = "60,44 300,90 540,105";

  return (
    <svg viewBox="0 0 600 220" className="w-full h-auto" role="img" aria-label="US vs China Korean F&B franchise store count crossover chart">
      <line x1="60" y1="200" x2="540" y2="200" stroke="var(--kb-border)" strokeWidth="1" />
      <line x1="300" y1="30" x2="300" y2="200" stroke="var(--kb-border)" strokeWidth="1" strokeDasharray="4 4" />

      <polyline points={cnPoints} fill="none" stroke="var(--kb-text)" strokeOpacity="0.35" strokeWidth="2" />
      <polyline points={usPoints} fill="none" stroke="var(--kb-gold)" strokeWidth="2.5" />

      {usPoints.split(" ").map((p, i) => {
        const [x, y] = p.split(",");
        return <circle key={`us-${i}`} cx={x} cy={y} r="4" fill="var(--kb-gold)" />;
      })}
      {cnPoints.split(" ").map((p, i) => {
        const [x, y] = p.split(",");
        return <circle key={`cn-${i}`} cx={x} cy={y} r="4" fill="var(--kb-text)" fillOpacity="0.5" />;
      })}

      <text x="60" y="210" fontSize="12" fill="var(--kb-muted)" textAnchor="middle">{years.start}</text>
      <text x="540" y="210" fontSize="12" fill="var(--kb-muted)" textAnchor="middle">{years.end}</text>

      <text x="545" y="70" fontSize="13" fill="var(--kb-gold)" fontWeight="500">{us.label}</text>
      <text x="545" y="112" fontSize="13" fill="var(--kb-text)" fillOpacity="0.6">{cn.label}</text>
    </svg>
  );
}

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

      {/* Why K Bridge — bento grid: one featured navy card + 4 supporting cards */}
      <section className="bg-[color:var(--kb-paper)] pt-16 md:pt-20 pb-24 md:pb-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <ChapterBadge number={3} label={t.approachBadge} />
          </FadeUp>

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

      {/* Market Challenges (formerly Founding Story) */}
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

      {/* Why Enter the U.S. Market — stats + crossover chart + opportunity bullets */}
      <section className="bg-[color:var(--kb-paper)] pt-16 md:pt-20 pb-24 md:pb-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <ChapterBadge number={5} label={t.whyBadge} />
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="mt-10 font-serif-kr text-4xl md:text-5xl font-light leading-[1.2] text-[color:var(--kb-ink)] max-w-3xl">
              <MaskedLineInView>{t.whyTitle}</MaskedLineInView>
            </h2>
          </FadeUp>

          {/* Investment data — headline stat + bullets, bar chart, breakdown table */}
          <FadeUp delay={0.2}>
            <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6" data-testid="why-investment">
              {/* Headline stat + bullets */}
              <div className="bg-[color:var(--kb-bone)] border border-[color:var(--kb-border)] p-7 md:p-8">
                <p className="font-serif text-4xl md:text-5xl font-light text-[color:var(--kb-ink)]">
                  {t.whyInvestment.value}
                  <span className="ml-2 text-base font-normal text-[color:var(--kb-muted)]">
                    {t.whyInvestment.valueSub}
                  </span>
                </p>
                <p className="mt-3 text-sm text-[color:var(--kb-text)]/70">{t.whyInvestment.label}</p>
                <p className="text-sm font-medium text-[color:var(--kb-gold)] mb-5">{t.whyInvestment.labelBold}</p>
                <ul className="space-y-4">
                  {t.whyInvestment.bullets.map((b, i) => (
                    <li key={i} className="text-[13px] leading-[1.7] text-[color:var(--kb-text)]/75">
                      {b.pre}
                      <span className="font-medium text-[color:var(--kb-ink)]">{b.bold}</span>
                      {b.suf}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bar chart */}
              <div className="bg-[color:var(--kb-bone)] border border-[color:var(--kb-border)] p-7 md:p-8">
                <h3 className="text-sm font-medium text-[color:var(--kb-ink)] mb-4">{t.whyChart.title}</h3>
                <BarChart bars={t.whyChart.bars} title={t.whyChart.title} />
                <ul className="mt-2 space-y-1">
                  {t.whyChart.notes.map((n, i) => (
                    <li key={i} className="text-[13px] text-[color:var(--kb-text)]/70 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[color:var(--kb-gold)]" />
                      {n}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Breakdown table */}
              <div className="bg-[color:var(--kb-bone)] border border-[color:var(--kb-border)] p-7 md:p-8 overflow-x-auto">
                <table className="w-full text-[12px] border-collapse" style={{ tableLayout: "fixed" }}>
                  <thead>
                    <tr>
                      <th className="w-[38%]"></th>
                      <th className="bg-[color:var(--kb-ink)] text-white font-medium py-2 px-2 text-center">
                        {t.whyTable.headers.total}
                      </th>
                      <th className="bg-[color:var(--kb-gold)] text-[color:var(--kb-ink)] font-medium py-2 px-2 text-center">
                        {t.whyTable.headers.us}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.whyTable.rows.map((row, i) => (
                      <tr
                        key={i}
                        className={`border-b border-[color:var(--kb-border)] ${row.emphasis ? "font-medium" : ""}`}
                      >
                        <td className="py-2 pr-1 text-[color:var(--kb-text)]/80">{row.label}</td>
                        <td className="py-2 px-2 text-right text-[color:var(--kb-ink)]">
                          {row.total}
                          {row.totalPct && (
                            <span className="block text-[10px] font-normal text-[color:var(--kb-muted)]">
                              ({row.totalPct})
                            </span>
                          )}
                        </td>
                        <td className="py-2 px-2 text-right text-[color:var(--kb-ink)]">
                          {row.us}
                          {row.usPct && (
                            <span className="block text-[10px] font-normal text-[color:var(--kb-muted)]">
                              ({row.usPct})
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeUp>

          {/* Crossover chart */}
          <FadeUp delay={0.3}>
            <div className="mt-8 bg-[color:var(--kb-bone)] border border-[color:var(--kb-border)] p-7 md:p-10">
              <h3 className="font-serif-kr text-xl md:text-2xl font-light text-[color:var(--kb-ink)] mb-2">
                {t.whyCrossoverTitle}
              </h3>
              <p className="text-[13px] md:text-sm text-[color:var(--kb-text)]/60 mb-6">
                {t.whyCrossoverNote}
              </p>
              <CrossoverChart us={t.whyCrossoverUS} cn={t.whyCrossoverCN} years={t.whyCrossoverYears} />
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
                <span className="text-[color:var(--kb-gold)]">
                  {t.whyCrossoverUS.label} {t.whyCrossoverUS.from} → {t.whyCrossoverUS.to} ({t.whyCrossoverUS.change})
                </span>
                <span className="text-[color:var(--kb-text)]/60">
                  {t.whyCrossoverCN.label} {t.whyCrossoverCN.from} → {t.whyCrossoverCN.to} ({t.whyCrossoverCN.change})
                </span>
              </div>
            </div>
          </FadeUp>

          {/* Opportunity bullets */}
          <FadeUp delay={0.4}>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.whyBullets.map((b, i) => {
                const Icon = WHY_ICONS[b.icon] || Globe;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-4 bg-[color:var(--kb-bone)] border border-[color:var(--kb-border)] p-5"
                  >
                    <Icon size={20} strokeWidth={1.5} className="flex-shrink-0 text-[color:var(--kb-gold)]" />
                    <span className="text-base text-[color:var(--kb-ink)]">{b.text}</span>
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
