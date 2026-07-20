import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Building2, Compass, Store, Landmark, Rocket, ShieldCheck, Award, Users, MapPin } from "lucide-react";
import { MaskedLine, MaskedLineInView, FadeUp } from "@/components/MaskedReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import Logo from "@/components/Logo";
import { TID } from "@/lib/testIds";
import { useLang } from "@/lib/i18n";

const HERO_IMG = "https://images.unsplash.com/photo-1664353655151-9d94a9170eb0?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000";

const CONTENT = {
  ko: {
    eyebrow: "FROM KOREA TO AMERICA",
    heroLine1: "한국 브랜드의",
    heroLine2: "미국 시장 진출,",
    heroLine3: "가장 든든한 현지 파트너.",
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
    aboutEyebrow: "CHAPTER — ABOUT K BRIDGE",
    aboutTitle: "이론이 아닌, 현장에서 배운 것을 전달합니다.",
    aboutBody: [
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
    challengeEyebrow: "CHAPTER — 회사의 관점",
    challengeTitle: "한국 브랜드의 미국 시장 진출,",
    challengeTitleItalic: "가장 든든한 현지 파트너.",
    challengeBody: [
      "많은 한국 브랜드가 국내에서의 성공 방정식이 미국에서도 통할 것이라 기대합니다. 하지만 미국은 임대차 조건, 프랜차이즈 규제(FDD), 주마다 다른 라이센싱과 세제, 소비자 문화까지 한국과는 전혀 다른 기준으로 움직입니다.",
      "실패의 대부분은 브랜드의 실력이 부족해서가 아닙니다. 시장의 규칙을 모른 채 입지를 잘못 고르거나, 임대차 계약의 세부 조건을 놓치거나, 초기 운영 셋업에서 발이 묶이기 때문입니다.",
      "K Bridge Partners는 이 지점에서 시작되었습니다. 수십 년간 미국 현장에서 쌓은 경험으로, 리포트만으로는 알 수 없는 것들을 알려드립니다.",
    ],
    challengeCta: "회사의 관점 자세히 보기",
    servicesEyebrow: "CHAPTER — 서비스",
    servicesTitle1: "미국 진출의 모든 단계를,",
    servicesTitle2: "단 하나의 파트너와.",
    servicesLead: "시장 조사부터 매장 오픈까지 — 다섯 개의 축을 하나의 팀이 책임집니다.",
    services: [
      { title: "시장 조사 · 진입 전략", en: "Market Research", desc: "지역별 상권과 소비 성향을 정밀 분석해 최적의 진입 방식과 우선 시장을 결정합니다.", icon: Compass },
      { title: "법인 설립 · 셋업", en: "Entity Setup", desc: "주별 법인 형태 · 세제 · 라이센싱을 검토해 향후 확장에 유리한 구조를 설계합니다.", icon: Landmark },
      { title: "상업용 부동산", en: "Commercial Real Estate", desc: "부지 분석부터 임대차 협상까지, 현장 경험이 있는 팀과 함께합니다.", icon: Building2 },
      { title: "프랜차이즈 개발", en: "Franchise Development", desc: "미국형 FDD 문서와 파트너 매칭까지, 프랜차이즈 확장의 전 과정을 함께합니다.", icon: Store },
      { title: "매장 오픈 · 초기 운영", en: "Store Opening", desc: "시공 · 스태핑 · 오픈 마케팅까지 오픈 이후 안정화 단계를 함께 챙깁니다.", icon: Rocket },
    ],
    servicesMore: "더 알아보기",
    ctaEyebrow: "FROM KOREA TO AMERICA",
    ctaTitle1: "당신의 다음 매장은",
    ctaTitle2: "미국에서 시작됩니다.",
    ctaButton: "무료 상담 신청",
  },
  en: {
    eyebrow: "FROM KOREA TO AMERICA",
    heroLine1: "Your Trusted",
    heroLine2: "Local Partner for",
    heroLine3: "U.S. Market Entry.",
    heroSub: "K Bridge Partners is the one-stop partner for Korean brands entering the U.S. — from market research and entity formation to commercial real estate, franchise development, and store opening.",
    ctaPrimary: "Free Consultation",
    ctaSecondary: "Explore Services",
    pillarsLabel: "WHAT WE STAND FOR",
    pillars: [
      { label: "Trust", en: "신뢰" },
      { label: "Experience", en: "실전 경험" },
      { label: "Professionalism", en: "전문성" },
      { label: "Local Expertise", en: "현지 네트워크" },
    ],
    aboutEyebrow: "CHAPTER — ABOUT K BRIDGE",
    aboutTitle: "What we've learned in the field — not from reports.",
    aboutBody: [
      "K Bridge Partners was founded on hands-on U.S. commercial real estate and franchise experience, combined with data-driven market analysis.",
      "For [years/decades], our team has operated in Washington DC and Virginia commercial real estate — watching, up close, the challenges Korean brands face entering the U.S. market. This partnership was built from that vantage point.",
      "We share what we've learned on the ground, not what's written in reports.",
    ],
    stats: [
      { value: "[Decades]", unit: "yrs", label: "of U.S. real estate experience" },
      { value: "[X]", unit: "brands", label: "supported to date" },
      { value: "[X]", unit: "deals", label: "closed & projects delivered" },
      { value: "[8]", unit: "markets", label: "U.S. metros we cover" },
    ],
    statsFootnote: "* Numbers are placeholders — to be replaced with real data.",
    challengeEyebrow: "CHAPTER — OUR PERSPECTIVE",
    challengeTitle: "The most reliable local partner",
    challengeTitleItalic: "for Korean brands entering the U.S.",
    challengeBody: [
      "Many Korean brands assume the playbook that worked at home will also work in the U.S. But America operates by fundamentally different rules — lease structures, franchise regulation (FDD), state-by-state licensing and tax, consumer culture.",
      "Most failures aren't about brand quality. They happen when brands pick the wrong location without understanding the market's rules, miss the fine print of a lease, or get stuck during the early operational setup.",
      "K Bridge Partners was founded at that exact gap. Decades of on-the-ground U.S. experience surface the things reports simply cannot show you.",
    ],
    challengeCta: "Read our perspective",
    servicesEyebrow: "CHAPTER — SERVICES",
    servicesTitle1: "Every stage of U.S. entry —",
    servicesTitle2: "under one partner.",
    servicesLead: "From research to store opening — five pillars, one accountable team.",
    services: [
      { title: "Market Research & Strategy", en: "시장 조사", desc: "Region-by-region trade area and consumer analysis. We define entry priorities and the right method for your brand.", icon: Compass },
      { title: "Entity Setup", en: "법인 설립", desc: "State selection, entity form, tax structure, and licensing — designed for the expansion you'll want in five years.", icon: Landmark },
      { title: "Commercial Real Estate", en: "상업용 부동산", desc: "Site analysis, market study, lease review, and negotiation — led by a team that has sat on both sides of the table.", icon: Building2 },
      { title: "Franchise Development", en: "프랜차이즈", desc: "FDD documents, state registrations, master franchisee models, and local partner introductions.", icon: Store },
      { title: "Store Opening & Ops", en: "매장 오픈", desc: "Buildout, staffing, opening marketing — we stay with you until the store is stable and running.", icon: Rocket },
    ],
    servicesMore: "Learn more",
    ctaEyebrow: "FROM KOREA TO AMERICA",
    ctaTitle1: "Your next store",
    ctaTitle2: "starts in America.",
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

        {/* Wordmark logo inside hero — anchor moment above the headline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.9 }}
          className="absolute top-28 lg:top-32 left-6 lg:left-10"
          data-testid="hero-wordmark"
        >
          <Logo variant="light" className="w-40 md:w-52 h-auto" />
        </motion.div>

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 pt-40 lg:pt-48 pb-24 min-h-[100svh] flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
            className="flex items-center gap-6"
          >
            <span className="inline-block w-10 h-px bg-[color:var(--kb-gold)]" />
            <span className="text-[11px] tracking-[0.4em] uppercase text-[color:var(--kb-gold)]">
              {t.eyebrow}
            </span>
          </motion.div>

          <div className="mt-16">
            <h1 className="font-serif-kr font-light tracking-tight leading-[0.98] text-[clamp(2.5rem,7vw,7rem)]">
              <div><MaskedLine delay={0.1}>{t.heroLine1}</MaskedLine></div>
              <div><MaskedLine delay={0.25}>{t.heroLine2}</MaskedLine></div>
              <div className="text-[color:var(--kb-champagne)] italic"><MaskedLine delay={0.4}>{t.heroLine3}</MaskedLine></div>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.8 }}
              className="mt-12 max-w-2xl text-base md:text-lg text-white/75 leading-[1.85]"
            >
              {t.heroSub}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.8 }}
            className="mt-16 flex flex-wrap items-center gap-4"
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
      </section>

      {/* PILLARS */}
      <section className="bg-[color:var(--kb-paper)] py-20 md:py-24 border-y border-[color:var(--kb-border)]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <div className="text-[11px] tracking-[0.35em] uppercase text-[color:var(--kb-gold)] mb-10 text-center">
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
                    <div className="mt-6 font-serif-kr text-2xl md:text-3xl font-light text-[color:var(--kb-ink)]">
                      {p.label}
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT K BRIDGE + STATS */}
      <section className="bg-[color:var(--kb-ink)] text-white py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <div className="flex items-center gap-4 mb-8">
              <span className="w-10 h-px bg-[color:var(--kb-gold)]" />
              <span className="text-[11px] tracking-[0.35em] uppercase text-[color:var(--kb-gold)]">{t.aboutEyebrow}</span>
            </div>
          </FadeUp>
          <div className="grid grid-cols-12 gap-8 lg:gap-16">
            <div className="col-span-12 lg:col-span-6">
              <h2 className="font-serif-kr text-4xl md:text-5xl font-light leading-[1.15] text-balance">
                <MaskedLineInView>{t.aboutTitle}</MaskedLineInView>
              </h2>
              <FadeUp delay={0.15}>
                {t.aboutBody.map((p, i) => (
                  <p key={i} className="mt-6 text-base md:text-lg text-white/75 leading-[1.9] max-w-xl">
                    {p}
                  </p>
                ))}
              </FadeUp>
            </div>

            <div className="col-span-12 lg:col-span-6">
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {t.stats.map((s, i) => (
                  <FadeUp key={i} delay={0.2 + i * 0.08}>
                    <div data-testid={`home-stat-${i}`} className="border border-[color:var(--kb-border)] p-8 h-full min-h-[200px] flex flex-col justify-between hover:border-[color:var(--kb-gold)] hover:-translate-y-1 transition-all duration-500">
                      <div className="flex items-baseline gap-2">
                        <AnimatedCounter
                          value={s.value}
                          className="font-serif-kr text-5xl md:text-6xl font-light text-[color:var(--kb-gold)]"
                          data-testid={`home-stat-value-${i}`}
                        />
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

      {/* CHALLENGE — Company perspective */}
      <section className="bg-[color:var(--kb-bone)] py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12 md:col-span-4">
              <div className="flex items-center gap-4">
                <span className="w-10 h-px bg-[color:var(--kb-gold)]" />
                <span className="text-[11px] tracking-[0.35em] uppercase text-[color:var(--kb-gold)]">
                  {t.challengeEyebrow}
                </span>
              </div>
            </div>
            <div className="col-span-12 md:col-span-8">
              <h2 className="font-serif-kr text-4xl md:text-5xl font-light leading-[1.15]">
                <MaskedLineInView>{t.challengeTitle}</MaskedLineInView><br />
                <MaskedLineInView delay={0.15} className="italic text-[color:var(--kb-gold)]">{t.challengeTitleItalic}</MaskedLineInView>
              </h2>
              <FadeUp delay={0.3}>
                {t.challengeBody.map((p, i) => (
                  <p key={i} className="mt-6 text-lg text-[color:var(--kb-text)]/80 leading-[1.9] max-w-2xl">{p}</p>
                ))}
              </FadeUp>
              <FadeUp delay={0.5}>
                <div className="mt-12">
                  <Link to="/about" className="inline-flex items-center gap-3 text-[color:var(--kb-ink)] text-sm tracking-[0.25em] uppercase tick-arrow border-b border-[color:var(--kb-ink)] pb-1">
                    {t.challengeCta}
                  </Link>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES — 5 equal cards */}
      <section className="bg-[color:var(--kb-paper)] py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-10 mb-16">
            <div className="col-span-12 md:col-span-4">
              <div className="flex items-center gap-4">
                <span className="w-10 h-px bg-[color:var(--kb-gold)]" />
                <span className="text-[11px] tracking-[0.35em] uppercase text-[color:var(--kb-gold)]">
                  {t.servicesEyebrow}
                </span>
              </div>
            </div>
            <div className="col-span-12 md:col-span-8">
              <h2 className="font-serif-kr text-4xl md:text-6xl font-light tracking-tight leading-[1.1]">
                <MaskedLineInView delay={0}>{t.servicesTitle1}</MaskedLineInView><br />
                <MaskedLineInView delay={0.15} className="text-[color:var(--kb-gold)] italic">{t.servicesTitle2}</MaskedLineInView>
              </h2>
              <FadeUp delay={0.3} className="mt-8 max-w-2xl text-lg text-[color:var(--kb-muted)] leading-relaxed">
                {t.servicesLead}
              </FadeUp>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.map((s, i) => {
              const Icon = s.icon;
              return (
                <FadeUp key={i} delay={i * 0.06} className="h-full">
                  <Link
                    to="/services"
                    data-testid={`${TID.homeServiceCard}-${String(i + 1).padStart(2, "0")}`}
                    className="group relative block bg-white p-8 border border-[color:var(--kb-border)] hover:-translate-y-1 hover:border-[color:var(--kb-gold)] hover:shadow-[0_28px_60px_-20px_rgba(5,9,20,0.25)] transition-all duration-500 h-full flex flex-col"
                  >
                    <div className="flex items-start justify-between">
                      <Icon size={26} strokeWidth={1.2} className="text-[color:var(--kb-gold)]" />
                    </div>
                    <div className="mt-16 flex-1 flex flex-col">
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
      <section className="bg-[color:var(--kb-paper)] pb-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 text-center">
          <FadeUp>
            <div className="text-[11px] tracking-[0.4em] uppercase text-[color:var(--kb-gold)] mb-8">
              {t.ctaEyebrow}
            </div>
            <h2 className="font-serif-kr text-4xl md:text-6xl font-light leading-[1.1] text-balance">
              <MaskedLineInView>{t.ctaTitle1}</MaskedLineInView>{" "}
              <MaskedLineInView delay={0.15} className="italic text-[color:var(--kb-gold)]">{t.ctaTitle2}</MaskedLineInView>
            </h2>
            <div className="mt-12">
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
