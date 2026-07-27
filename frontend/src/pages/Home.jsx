import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Building2, Compass, Store, Landmark, Rocket, ShieldCheck, Award, Users, MapPin, Network } from "lucide-react";
import { MaskedLine, MaskedLineInView, FadeUp } from "@/components/MaskedReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import ChapterBadge from "@/components/ChapterBadge";
import { TID } from "@/lib/testIds";
import { useLang } from "@/lib/i18n";

const HERO_IMG = "https://images.unsplash.com/photo-1664353655151-9d94a9170eb0?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000";
// DC / Northern Virginia retail streetscape — Georgetown corridor
const PERSPECTIVE_IMG = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600";

const CONTENT = {
  ko: {
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
    aboutBadge: "회사 개요",
    aboutTitle: "이론이 아닌, 현장에서 배운 것을 전달합니다.",
    aboutBody: [
      "K Bridge Partners는 미국 상업 부동산과 프랜차이즈 실무 경험, 그리고 데이터 기반 시장 분석 역량을 바탕으로 설립되었습니다.",
      "26년간 워싱턴 DC 및 버지니아 지역을 중심으로 상업용 부동산 실무를 쌓아온 팀이, 한국 브랜드가 미국 시장에서 겪는 실질적인 어려움을 가까이에서 지켜보며 시작한 파트너십입니다.",
    ],
    stats: [
      { value: "26", unit: "년", label: "상업 부동산 실무 경험" },
      { value: "8", unit: "개", label: "커버하는 미국 주요 시장" },
      { value: "28", unit: "곳", label: "전문 네트워크 파트너" },
      { value: "6", unit: "개", label: "제공 서비스 분야" },
    ],
    challengeBadge: "회사의 관점",
    challengeTitle: "한국 브랜드의 미국 시장 진출,",
    challengeTitleItalic: "가장 든든한 현지 파트너.",
    challengeBody: [
      "한국에서 통했던 방식이 미국에서도 통할 것이라 생각하기 쉽습니다. 하지만 미국은 다릅니다. 주마다 다른 임대차 조건, 프랜차이즈 규제(FDD), 라이센싱과 세제. 그리고 한국과는 전혀 다른 소비자 문화.",
      "브랜드가 실패하는 이유는 실력이 부족해서가 아닙니다. 잘못된 입지, 놓친 계약 조건, 준비되지 않은 초기 운영. 현장을 몰랐기 때문입니다.",
      "K Bridge Partners는 그 현장에서 시작합니다. 리포트가 알려주지 않는 것들을, 직접 확인하고 전달합니다.",
    ],
    challengeCta: "회사의 관점 자세히 보기",
    servicesBadge: "서비스",
    servicesTitle1: "미국 진출의 모든 단계를,",
    servicesTitle2: "단 하나의 파트너와.",
    servicesLead: "시장 조사부터 매장 오픈까지, 하나의 팀이 함께합니다.",
    services: [
      { title: "시장 조사 · 진입 전략", desc: "지역별 상권과 소비 성향을 정밀 분석해 최적의 진입 방식과 우선 시장을 결정합니다.", icon: Compass },
      { title: "현지 네트워크 연결", desc: "변호사, 회계사, 시공업체까지 — 검증된 현지 파트너 네트워크를 연결합니다.", icon: Network },
      { title: "법인 설립 · 셋업", desc: "주별 법인 형태 · 세제 · 라이센싱을 검토해 향후 확장에 유리한 구조를 설계합니다.", icon: Landmark },
      { title: "상업용 부동산", desc: "부지 분석부터 임대차 협상까지, 현장 경험이 있는 팀과 함께합니다.", icon: Building2 },
      { title: "프랜차이즈 개발", desc: "미국형 FDD 문서와 파트너 매칭까지, 프랜차이즈 확장의 전 과정을 함께합니다.", icon: Store },
      { title: "매장 오픈 · 초기 운영", desc: "시공 · 스태핑 · 오픈 마케팅까지 오픈 이후 안정화 단계를 함께 챙깁니다.", icon: Rocket },
    ],
    servicesMore: "더 알아보기",
    ctaTitle1: "당신의 다음 매장은",
    ctaTitle2: "미국에서 시작됩니다.",
    ctaButton: "무료 상담 신청",
  },
  en: {
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
    aboutBadge: "Company Overview",
    aboutTitle: "What we've learned in the field — not from reports.",
    aboutBody: [
      "K Bridge Partners was founded on hands-on U.S. commercial real estate and franchise experience, combined with data-driven market analysis.",
      "Our team has spent 26 years in the Washington DC and Virginia commercial real estate market — watching, up close, the challenges Korean brands face entering the U.S. This partnership was built from that vantage point.",
    ],
    stats: [
      { value: "26", unit: "yrs", label: "of commercial real estate experience" },
      { value: "8", unit: "markets", label: "U.S. metros we cover" },
      { value: "28", unit: "partners", label: "in our vetted network" },
      { value: "6", unit: "services", label: "verticals we deliver" },
    ],
    challengeBadge: "Our Perspective",
    challengeTitle: "The most reliable local partner",
    challengeTitleItalic: "for Korean brands entering the U.S.",
    challengeBody: [
      "It's tempting to assume that what worked in Korea will work in the U.S. It won't. Lease terms, franchise regulation (FDD), licensing and taxation — different from state to state. And a consumer culture nothing like Korea's.",
      "Brands don't fail because of quality. They fail because of the wrong location, the missed contract clause, the unprepared opening. Because they didn't know the field.",
      "K Bridge Partners starts on that field. What the reports don't tell you, we verify and translate for you.",
    ],
    challengeCta: "Read our perspective",
    servicesBadge: "Services",
    servicesTitle1: "Every stage of U.S. entry —",
    servicesTitle2: "under one partner.",
    servicesLead: "From market research to store opening, one team with you throughout.",
    services: [
      { title: "Market Research & Strategy", desc: "Region-by-region trade area and consumer analysis. We define entry priorities and the right method for your brand.", icon: Compass },
      { title: "Local Network Connections", desc: "Lawyers, accountants, contractors — we connect you to a vetted network of local partners.", icon: Network },
      { title: "Entity Setup", desc: "State selection, entity form, tax structure, and licensing — designed for the expansion you'll want in five years.", icon: Landmark },
      { title: "Commercial Real Estate", desc: "Site analysis, market study, lease review, and negotiation — led by a team that has sat on both sides of the table.", icon: Building2 },
      { title: "Franchise Development", desc: "FDD documents, state registrations, master franchisee models, and local partner introductions.", icon: Store },
      { title: "Store Opening & Ops", desc: "Buildout, staffing, opening marketing — we stay with you until the store is stable and running.", icon: Rocket },
    ],
    servicesMore: "Learn more",
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

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 pt-32 lg:pt-40 pb-24 min-h-[100svh] flex flex-col justify-center">
          <div>
            <h1 className="font-serif-kr font-light tracking-tight leading-[1.14] text-[clamp(2.25rem,6vw,6rem)]">
              <div className="mb-2 md:mb-3"><MaskedLine delay={0.1}>{t.heroLine1}</MaskedLine></div>
              <div className="mb-2 md:mb-3"><MaskedLine delay={0.25}>{t.heroLine2}</MaskedLine></div>
              <div className="text-[color:var(--kb-champagne)] italic"><MaskedLine delay={0.4}>{t.heroLine3}</MaskedLine></div>
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

      {/* ABOUT K BRIDGE + STATS */}
      <section className="bg-[color:var(--kb-ink)] text-white py-20 md:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <ChapterBadge number={1} label={t.aboutBadge} variant="dark" className="mb-8" />
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
                    <div data-testid={`home-stat-${i}`} className="border border-[color:var(--kb-border)] p-8 h-full min-h-[180px] flex flex-col justify-between hover:border-[color:var(--kb-gold)] hover:-translate-y-1 transition-all duration-500">
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
            </div>
          </div>
        </div>
      </section>

      {/* CHALLENGE — Company perspective (with photo) */}
      <section className="bg-[color:var(--kb-bone)] py-20 md:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-10 lg:gap-14 items-start">
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
                <ChapterBadge number={2} label={t.challengeBadge} className="mb-6" />
              </FadeUp>
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
              <h2 className="font-serif-kr text-4xl md:text-6xl font-light tracking-tight leading-[1.1]">
                <MaskedLineInView delay={0}>{t.servicesTitle1}</MaskedLineInView><br />
                <MaskedLineInView delay={0.15} className="text-[color:var(--kb-gold)] italic">{t.servicesTitle2}</MaskedLineInView>
              </h2>
              <FadeUp delay={0.3} className="mt-6 max-w-2xl text-lg text-[color:var(--kb-muted)] leading-relaxed">
                {t.servicesLead}
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
            <h2 className="font-serif-kr text-4xl md:text-6xl font-light leading-[1.1] text-balance">
              <MaskedLineInView>{t.ctaTitle1}</MaskedLineInView>{" "}
              <MaskedLineInView delay={0.15} className="italic text-[color:var(--kb-gold)]">{t.ctaTitle2}</MaskedLineInView>
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
