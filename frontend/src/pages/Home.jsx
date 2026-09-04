import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Building2, Compass, Store, Landmark, Rocket, ShieldCheck, Award, Users, MapPin, Network } from "lucide-react";
import { MaskedLine, FadeUp } from "@/components/MaskedReveal";
import StatsBlock from "@/components/StatsBlock";
import ChapterBadge from "@/components/ChapterBadge";
import { TID } from "@/lib/testIds";
import { useLang } from "@/lib/i18n";

const HERO_IMG = "https://images.unsplash.com/photo-1664353655151-9d94a9170eb0?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000";
// DC / Northern Virginia commercial storefront corridor (M Street, Georgetown-style retail)
const PERSPECTIVE_IMG = "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?fm=jpg&q=80&w=1200&auto=format&fit=crop";

const CONTENT = {
  ko: {
    heroLines: [
      { text: "한국 브랜드의" },
      { text: "미국 시장 진출," },
      { text: "가장 든든한 현지 파트너.", accent: true },
    ],
    heroSub: "K Bridge Partners는 미국 시장 조사부터 법인 설립, 상업용 부동산, 프랜차이즈 개발, 매장 오픈까지 한국 브랜드의 성공적인 미국 진출을 위한 원스톱 솔루션을 제공합니다.",
    ctaPrimary: "무료 상담 신청",
    ctaSecondary: "서비스 살펴보기",
    pillarsLabel: "WHAT WE STAND FOR",
    pillars: [
      { label: "신뢰", en: "Trust" },
      { label: "실전 경험", en: "Experience" },
      { label: "전문성", en: "Professionalism" },
      { label: "현지 네트워크", en: "Local Expertise" },
    ],
    aboutBadge: "회사 개요",
    aboutTitle: "한국과 미국을 잇는, 하나의 파트너.",
    aboutBody: [
      "K Bridge Partners는 한국의 유망한 프랜차이즈 및 소비재 브랜드가 미국 시장에 성공적으로 진출하고 안정적으로 성장할 수 있도록 지원하는 U.S. Market Entry & Business Development 전문 파트너입니다.",
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
    challengeBadge: "회사의 관점",
    challengeTitle: "한국 브랜드의 미국 시장 진출,",
    challengeTitleItalic: "가장 든든한 현지 파트너.",
    challengeBody: [
      "미국 시장은 하나의 기준으로 움직이지 않습니다. 주(State)마다 임대차 관행이 다르고, 프랜차이즈 규제(FDD)가 다르며, 소비자의 결도 다릅니다. 한국에서 검증된 방식이라 해도, 그대로 옮겨질 수는 없습니다.",
      "브랜드가 흔들리는 지점은 대개 같습니다. 입지 선정의 오판, 계약서 안에 놓인 조항 하나, 그리고 충분히 준비되지 않은 초기 운영. 이는 실력의 문제가 아니라, 현장에 대한 이해의 문제입니다.",
      "K Bridge Partners는 그 이해에서 출발합니다.",
    ],
    challengeCta: "회사의 관점 자세히 보기",
    servicesBadge: "서비스",
    servicesTitle: "시장 조사부터 매장 오픈까지,",
    servicesTitleItalic: "하나의 팀이 함께합니다.",
    services: [
      { title: "시장 조사 · 진입 전략", desc: "지역별 상권과 소비 성향을 정밀 분석해 최적의 진입 방식과 우선 시장을 결정합니다.", icon: Compass },
      { title: "현지 네트워크 연결", desc: "변호사, 회계사, 시공업체까지 — 검증된 현지 파트너 네트워크를 연결합니다.", icon: Network },
      { title: "법인 설립 · 셋업", desc: "주별 법인 형태 · 세제 · 라이센싱을 검토해 향후 확장에 유리한 구조를 설계합니다.", icon: Landmark },
      { title: "상업용 부동산", desc: "부지 분석부터 임대차 협상까지, 현장 경험이 있는 팀과 함께합니다.", icon: Building2 },
      { title: "프랜차이즈 개발", desc: "미국형 FDD 문서와 파트너 매칭까지, 프랜차이즈 확장의 전 과정을 함께합니다.", icon: Store },
      { title: "매장 오픈 · 초기 운영", desc: "시공 · 스태핑 · 오픈 마케팅까지 오픈 이후 안정화 단계를 함께 챙깁니다.", icon: Rocket },
    ],
    servicesMore: "더 알아보기",
    ctaButton: "무료 상담 신청",
  },
  en: {
    heroLines: [
      { text: "Made in Korea." },
      { text: "Built to win in America.", accent: true },
    ],
    heroSub: "K Bridge Partners advises Korean brands on every stage of U.S. market entry, from market research, entity formation, commercial real estate, franchise development, and store opening.",
    ctaPrimary: "Free Consultation",
    ctaSecondary: "Explore Services",
    pillarsLabel: "WHAT WE STAND FOR",
    pillars: [
      { label: "Trust", en: "신뢰" },
      { label: "Experience", en: "실전 경험" },
      { label: "Professionalism", en: "전문성" },
      { label: "Local Expertise", en: "현지 네트워크" },
    ],
    aboutBadge: "Company Overview",
    aboutTitle: "Korea's Brands, Built for America.",
    aboutBody: [
      "K Bridge Partners is a U.S. market entry and business development firm built specifically for Korean franchise and consumer brands. We operate today in eight U.S. metro markets, working through a network of 28 vetted local partners assembled over 25 years in U.S. commercial real estate.",
      "Korea and the U.S. run on different market conditions, consumer habits, legal frameworks, and business systems. We built our process around that gap. Rather than offering advice from the sidelines, we handle the work directly: market research, business structuring, partner sourcing, site selection, franchise development, marketing, and expansion.",
      "That's the whole job. Getting it right the first time, every time.",
    ],
    stats: [
      { value: "20+", unit: "years", label: "of commercial real estate experience" },
      { value: "8", unit: "markets", label: "U.S. metros we cover" },
      { value: "28", unit: "partners", label: "in our vetted network" },
      { value: "6", unit: "services", label: "verticals we deliver" },
    ],
    challengeBadge: "Our Perspective",
    challengeTitle: "The most reliable local partner",
    challengeTitleItalic: "for Korean brands entering the U.S.",
    challengeBody: [
      "Expanding into the U.S. takes more than a strong business model. It takes an understanding of a new market, the right relationships on the ground, and sound decisions at every stage of entry.",
      "K Bridge Partners works alongside Korean companies to navigate the U.S. market and build a lasting presence here. We evaluate opportunities, connect clients with the right partners, and map out a clear path from entry to growth, staying with them through execution, not just strategy.",
      "Our job is to make the U.S. market easier to understand, easier to enter, and easier to act on.",
    ],
    challengeCta: "Read our perspective",
    servicesBadge: "Services",
    servicesTitle: "Everything it takes.",
    servicesTitleItalic: "Already covered.",
    services: [
      { title: "Market Research & Strategy", desc: "Region-by-region trade area and consumer analysis. We define entry priorities and the right method for your brand.", icon: Compass },
      { title: "Local Network Connections", desc: "Lawyers, accountants, and contractors. We connect you to a vetted network of local partners.", icon: Network },
      { title: "Entity Setup", desc: "State selection, entity form, tax structure, and licensing, designed for the expansion you'll want in five years.", icon: Landmark },
      { title: "Commercial Real Estate", desc: "Site analysis, market study, lease review, and negotiation, led by a team that has sat on both sides of the table.", icon: Building2 },
      { title: "Franchise Development", desc: "FDD documents, state registrations, master franchisee models, and local partner introductions.", icon: Store },
      { title: "Store Opening & Ops", desc: "Buildout, staffing, and opening marketing. We stay with you until the store is stable and running.", icon: Rocket },
    ],
    servicesMore: "Learn more",
    ctaTitle1: "Ready when",
    ctaTitleAccent: "you",
    ctaTitle2: "are.",
    ctaButton: "Free Consultation",
  },
};

export default function Home() {
  const { lang } = useLang();
  const t = CONTENT[lang];
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.3]);
  const pillarIcons = [ShieldCheck, Award, Users, MapPin];

  return (
    <div>
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[100svh] bg-[color:var(--kb-ink)] text-white overflow-hidden">
        <motion.div style={{ y, scale, opacity }} className="absolute inset-0">
          <motion.img
            src={HERO_IMG}
            alt=""
            className="w-full h-full object-cover opacity-45"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1.18 }}
            transition={{ duration: 22, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050914]/60 via-[#050914]/40 to-[#050914]" />
        </motion.div>

        <div className="absolute inset-0 pointer-events-none opacity-[0.06]" aria-hidden>
          <div className="h-full w-full" style={{
            backgroundImage: "linear-gradient(to right, rgba(198,168,124,0.4) 1px, transparent 1px)",
            backgroundSize: "16.6666% 100%",
          }} />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 pt-37 lg:pt-40 pb-24 min-h-[100svh] flex flex-col justify-center">
          <div>
            <h1 className="font-serif-kr font-light tracking-tight leading-[1.14] text-[clamp(2.25rem,6vw,6rem)] break-keep">
              {t.heroLines.map((line, i) => (
                <div
                  key={i}
                  className={`mb-2 md:mb-3 ${line.accent ? "text-[color:var(--kb-champagne)] italic" : ""}`}
                >
                  <MaskedLine delay={0.1 + i * 0.15}>{line.text}</MaskedLine>
                </div>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.8 }}
              className="mt-10 max-w-2xl text-base md:text-lg text-white/75 leading-[1.85]"
            >
              {t.heroSub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.8 }}
              className="mt-12 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/contact"
                data-testid={TID.heroCta}
                className="group inline-flex items-center gap-3 bg-[color:var(--kb-gold)] text-[color:var(--kb-ink)] px-8 py-4 text-sm tracking-[0.2em] uppercase font-medium hover:bg-[color:var(--kb-champagne)] transition-colors"
              >
                {t.ctaPrimary} <ArrowUpRight size={16} />
              </Link>
              <Link
                to="/services"
                data-testid={TID.heroSecondaryCta}
                className="inline-flex items-center gap-3 text-white/80 border border-[color:var(--kb-border)] px-8 py-4 text-sm tracking-[0.2em] uppercase hover:text-[color:var(--kb-gold)] hover:border-[color:var(--kb-gold)] transition-colors"
              >
                {t.ctaSecondary}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="bg-[color:var(--kb-paper)] py-14 md:py-16 border-y border-[color:var(--kb-border)]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <div className="text-[11px] tracking-[0.35em] uppercase text-[color:var(--kb-gold)] mb-8 text-center">
              {t.pillarsLabel}
            </div>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {t.pillars.map((p, i) => {
              const Icon = pillarIcons[i];
              return (
                <FadeUp key={p.label} delay={i * 0.08}>
                  <div className="flex flex-col items-center text-center px-4 group">
                    <Icon size={26} strokeWidth={1.2} className="text-[color:var(--kb-gold)] transition-transform duration-500 group-hover:-translate-y-1" />
                    <div className="mt-5 font-serif-kr text-2xl md:text-3xl font-light text-[color:var(--kb-ink)]">
                      {p.label}
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT K BRIDGE + STATS (shared block) */}
      <StatsBlock
        badge={{ number: 1, label: t.aboutBadge }}
        stats={t.stats}
        testIdPrefix="home-stat"
        overviewTitle={t.aboutTitle}
        overviewBody={t.aboutBody}
      />

      {/* CHALLENGE — Company perspective (with photo) */}
      <section className="bg-[color:var(--kb-bone)] py-20 md:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-8 lg:gap-10 items-start">
            <FadeUp className="col-span-12 lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--kb-ink)] clip-corner">
                <img
                  src={PERSPECTIVE_IMG}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-[color:var(--kb-gold)]/15 pointer-events-none" />
              </div>
            </FadeUp>
            <div className="col-span-12 lg:col-span-7">
              <FadeUp>
                <ChapterBadge number={2} label={t.challengeBadge} className="mb-4" />
              </FadeUp>
              <FadeUp delay={0.1}>
                <h2 className="font-serif-kr text-4xl md:text-5xl font-light leading-[1.45] text-balance break-keep text-[color:var(--kb-ink)]">
                  {t.challengeTitle}
                  <br />
                  <span className="italic text-[color:var(--kb-gold)]">{t.challengeTitleItalic}</span>
                </h2>
              </FadeUp>
              <FadeUp delay={0.3}>
                {t.challengeBody.map((p, i) => (
                  <p key={i} className="mt-6 text-lg text-[color:var(--kb-text)]/80 leading-[1.9] max-w-2xl">{p}</p>
                ))}
              </FadeUp>
              <FadeUp delay={0.5}>
                <div className="mt-10">
                  <Link to="/about" className="inline-flex items-center gap-3 text-[color:var(--kb-ink)] text-sm tracking-[0.25em] uppercase tick-arrow border-b border-[color:var(--kb-ink)] pb-1">
                    {t.challengeCta}
                  </Link>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES — 6 cards in 3x2 grid */}
      <section className="bg-[color:var(--kb-paper)] py-20 md:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-10 mb-14">
            <div className="col-span-12 md:col-span-4">
              <ChapterBadge number={3} label={t.servicesBadge} />
            </div>
            <div className="col-span-12 md:col-span-8">
              <FadeUp delay={0.3}>
                <h2 className="font-serif-kr text-4xl md:text-5xl font-light leading-[1.45] text-balance break-keep text-[color:var(--kb-ink)]">
                  {t.servicesTitle}
                  <br />
                  <span className="italic text-[color:var(--kb-gold)]">{t.servicesTitleItalic}</span>
                </h2>
              </FadeUp>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.map((s, i) => {
              const Icon = s.icon;
              return (
                <FadeUp key={i} delay={i * 0.05} className="h-full">
                  <Link
                    to="/services"
                    data-testid={`${TID.homeServiceCard}-${String(i + 1).padStart(2, "0")}`}
                    className="group relative block bg-white p-8 border border-[color:var(--kb-border)] hover:-translate-y-1 hover:border-[color:var(--kb-gold)] hover:shadow-[0_28px_60px_-20px_rgba(5,9,20,0.25)] transition-all duration-500 h-full flex flex-col"
                  >
                    <div className="flex items-start justify-between">
                      <Icon size={26} strokeWidth={1.2} className="text-[color:var(--kb-gold)]" />
                      <span className="text-[10px] tracking-[0.25em] text-[color:var(--kb-muted)]/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="mt-14 flex-1 flex flex-col">
                      <h3 className="font-serif-kr text-2xl font-light leading-tight">{s.title}</h3>
                      <p className="mt-4 text-sm text-[color:var(--kb-muted)] leading-relaxed flex-1">
                        {s.desc}
                      </p>
                      <div className="mt-6 inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase tick-arrow text-[color:var(--kb-ink)]">
                        {t.servicesMore}
                      </div>
                    </div>
                  </Link>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[color:var(--kb-paper)] pb-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 text-center">
          <FadeUp>
            <h2 className="font-serif-kr text-4xl md:text-6xl font-light leading-[1.1] text-balance break-keep">
              {t.ctaTitle1}{" "}
              <span className="italic text-[color:var(--kb-gold)]">{t.ctaTitleAccent}</span>{" "}
              {t.ctaTitle2}
            </h2>
            <div className="mt-10">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-[color:var(--kb-ink)] text-white px-10 py-5 text-sm tracking-[0.25em] uppercase hover:bg-[color:var(--kb-gold)] hover:text-[color:var(--kb-ink)] transition-colors"
              >
                {t.ctaButton} <ArrowUpRight size={16} />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
