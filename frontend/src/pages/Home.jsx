import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Marquee from "react-fast-marquee";
import { ArrowUpRight, Building2, Compass, Store, Landmark } from "lucide-react";
import { MaskedLine, MaskedLineInView, FadeUp } from "@/components/MaskedReveal";
import { TID } from "@/lib/testIds";

const HERO_IMG = "https://images.unsplash.com/photo-1664353655151-9d94a9170eb0?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000";
const IMG_TRUST = "https://images.unsplash.com/photo-1779700210487-a01758a3c55a?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600";

const SERVICES = [
  { key: "01", title: "시장 진입 전략", en: "Market Entry Strategy", desc: "미국 시장 조사, 경쟁 분석, 상권 분석, 진입 방식 평가", icon: Compass },
  { key: "02", title: "프랜차이즈 확장", en: "Franchise Development", desc: "미국형 프랜차이즈 전략, 마스터 프랜차이지 모델, 로컬 파트너 매칭", icon: Store },
  { key: "03", title: "법인 설립 · 오픈 지원", en: "Business Setup", desc: "법인 · EIN · 라이센스, 전문가 네트워크 조정, 시공 및 오픈 준비", icon: Landmark },
  { key: "04", title: "상업 부동산 · 입지 선정", en: "Site Selection", desc: "부지 분석, 상권 리서치, 임대차 검토 및 협상, 최적 입지 확정", icon: Building2, feature: true },
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.3]);

  return (
    <div>
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[100svh] bg-[color:var(--kb-ink)] text-white overflow-hidden">
        <motion.div style={{ y, scale, opacity }} className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050914]/60 via-[#050914]/40 to-[#050914]" />
        </motion.div>

        {/* editorial grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]" aria-hidden>
          <div className="h-full w-full" style={{
            backgroundImage: "linear-gradient(to right, rgba(198,168,124,0.4) 1px, transparent 1px)",
            backgroundSize: "16.6666% 100%",
          }} />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 pt-40 pb-24 min-h-[100svh] flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
            className="flex items-center gap-6"
          >
            <span className="editorial-num text-[color:var(--kb-gold)] text-4xl">00</span>
            <span className="text-[11px] tracking-[0.4em] uppercase text-[color:var(--kb-gold)]">
              From Korea to America
            </span>
          </motion.div>

          <div className="mt-16">
            <h1 className="font-serif-kr font-light tracking-tight leading-[0.98] text-[clamp(3rem,9vw,10rem)]">
              <div><MaskedLine delay={0.1}>한국의 브랜드,</MaskedLine></div>
              <div className="text-[color:var(--kb-champagne)] italic"><MaskedLine delay={0.25}>미국의 무대에.</MaskedLine></div>
              <div className="text-white/60 text-[clamp(1.5rem,3vw,3rem)] mt-6 font-light not-italic tracking-normal">
                <MaskedLine delay={0.5}>실전 경험을 갖춘, 신뢰할 수 있는 미국 진출 파트너.</MaskedLine>
              </div>
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10"
          >
            <p className="max-w-md text-base text-white/70 leading-relaxed">
              K Bridge Partners는 수십 년에 걸친 미국 상업 부동산과 프랜차이즈
              실무 경험을 바탕으로, 한국 브랜드의 미국 진출을 단순한 자문이 아닌
              실질적인 실행으로 이끕니다.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                data-testid={TID.heroCta}
                className="group inline-flex items-center gap-3 bg-[color:var(--kb-gold)] text-[color:var(--kb-ink)] px-8 py-4 text-sm tracking-[0.2em] uppercase font-medium hover:bg-[color:var(--kb-champagne)] transition-colors"
              >
                무료 상담 신청 <ArrowUpRight size={16} />
              </Link>
              <Link
                to="/services"
                data-testid={TID.heroSecondaryCta}
                className="inline-flex items-center gap-3 text-white/80 border border-[color:var(--kb-border)] px-8 py-4 text-sm tracking-[0.2em] uppercase hover:text-[color:var(--kb-gold)] hover:border-[color:var(--kb-gold)] transition-colors"
              >
                서비스 살펴보기
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 right-6 lg:right-10 text-[10px] tracking-[0.35em] uppercase text-white/40 flex items-center gap-3">
          <motion.span
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 1.2, duration: 0.8 }}
            className="inline-block w-px h-10 bg-[color:var(--kb-gold)] origin-top"
          />
          Scroll — 01 / 06
        </div>
      </section>

      {/* MARQUEE */}
      <section className="bg-[color:var(--kb-paper)] py-16 overflow-hidden border-y border-[color:var(--kb-border)]">
        <Marquee gradient={false} speed={30} pauseOnHover>
          {["신뢰", "Trust", "실전 경험", "Hands-on", "상업 부동산", "Real Estate", "프랜차이즈", "Franchise", "미국 진출", "Market Entry"].map((w, i) => (
            <span
              key={i}
              className="font-serif-kr italic text-6xl md:text-8xl text-[color:var(--kb-text)]/25 mx-10"
            >
              {w} <span className="text-[color:var(--kb-gold)] not-italic">·</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* MANIFESTO / SERVICES */}
      <section className="bg-[color:var(--kb-bone)] py-24 md:py-40">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-10 mb-20">
            <div className="col-span-12 md:col-span-4">
              <div className="text-[11px] tracking-[0.35em] uppercase text-[color:var(--kb-gold)]">
                Chapter — 서비스
              </div>
            </div>
            <div className="col-span-12 md:col-span-8">
              <h2 className="font-serif-kr text-4xl md:text-6xl font-light tracking-tight leading-[1.1]">
                <MaskedLineInView delay={0}>미국 진출의 모든 단계를,</MaskedLineInView><br />
                <MaskedLineInView delay={0.15} className="text-[color:var(--kb-gold)] italic">단 하나의 파트너와.</MaskedLineInView>
              </h2>
              <FadeUp delay={0.3} className="mt-8 max-w-2xl text-lg text-[color:var(--kb-muted)] leading-relaxed">
                진입 전략부터 법인 설립, 그리고 저희의 핵심 역량인 상업 부동산 · 입지 선정까지 —
                모든 과정을 실전 경험이 있는 한 팀이 함께합니다.
              </FadeUp>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              const isFeatured = s.feature;
              return (
                <FadeUp
                  key={s.key}
                  delay={i * 0.08}
                  className={`col-span-12 md:col-span-6 ${isFeatured ? "lg:col-span-8 lg:row-span-2" : "lg:col-span-4"}`}
                >
                  <Link
                    to="/services"
                    data-testid={`${TID.homeServiceCard}-${s.key}`}
                    className={`group relative block overflow-hidden border border-[color:var(--kb-border)] ${
                      isFeatured
                        ? "bg-[color:var(--kb-ink)] text-white p-10 lg:p-14 min-h-[520px]"
                        : "bg-white p-8 min-h-[280px]"
                    } transition-all duration-500 hover:border-[color:var(--kb-gold)]`}
                  >
                    <div className="flex items-start justify-between">
                      <span className={`editorial-num ${isFeatured ? "text-[color:var(--kb-gold)] text-7xl" : "text-[color:var(--kb-gold)] text-4xl"}`}>
                        {s.key}
                      </span>
                      <Icon size={isFeatured ? 34 : 22} className={isFeatured ? "text-[color:var(--kb-champagne)]" : "text-[color:var(--kb-ink)]/60"} strokeWidth={1.2} />
                    </div>

                    <div className={`${isFeatured ? "mt-24 lg:mt-40" : "mt-10"}`}>
                      <div className={`text-[10px] tracking-[0.3em] uppercase ${isFeatured ? "text-[color:var(--kb-champagne)]/70" : "text-[color:var(--kb-gold)]"} mb-3`}>
                        {s.en} {isFeatured && "— 핵심 역량"}
                      </div>
                      <h3 className={`font-serif-kr ${isFeatured ? "text-3xl md:text-5xl" : "text-2xl"} font-light leading-tight`}>
                        {s.title}
                      </h3>
                      <p className={`mt-5 text-sm leading-relaxed ${isFeatured ? "text-white/70 max-w-md" : "text-[color:var(--kb-muted)]"}`}>
                        {s.desc}
                      </p>
                      <div className={`mt-8 inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase tick-arrow ${
                        isFeatured ? "text-[color:var(--kb-gold)]" : "text-[color:var(--kb-ink)]"
                      }`}>
                        더 알아보기
                      </div>
                    </div>
                  </Link>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="bg-[color:var(--kb-ink)] text-white py-24 md:py-40 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-12 gap-10 items-center">
          <FadeUp className="col-span-12 lg:col-span-6">
            <div className="relative overflow-hidden clip-corner">
              <img src={IMG_TRUST} alt="" className="w-full h-[560px] object-cover" />
              <div className="absolute inset-0 ring-1 ring-inset ring-[color:var(--kb-gold)]/30" />
            </div>
          </FadeUp>

          <div className="col-span-12 lg:col-span-6 lg:pl-10">
            <div className="text-[11px] tracking-[0.35em] uppercase text-[color:var(--kb-gold)] mb-6">
              Chapter — 신뢰의 근거
            </div>
            <h2 className="font-serif-kr text-4xl md:text-5xl font-light leading-[1.1]">
              <MaskedLineInView>이론이 아닌,</MaskedLineInView><br />
              <MaskedLineInView delay={0.15} className="italic text-[color:var(--kb-champagne)]">직접 걸어온 길.</MaskedLineInView>
            </h2>
            <FadeUp delay={0.3} className="mt-8 text-lg text-white/70 leading-relaxed max-w-lg">
              수십 년간 미국 상업 부동산 현장에서 축적한 경험은 리서치로 대체될 수 없습니다.
              계약서 이면의 관행, 임대인의 심리, 상권의 미세한 결 — 이 모든 것이 K Bridge의 자산입니다.
            </FadeUp>

            <div className="mt-12 grid grid-cols-2 gap-8 max-w-md">
              <div>
                <div className="editorial-num text-[color:var(--kb-gold)] text-5xl">01</div>
                <div className="mt-3 text-sm text-white/80">현장 기반 자문</div>
              </div>
              <div>
                <div className="editorial-num text-[color:var(--kb-gold)] text-5xl">02</div>
                <div className="mt-3 text-sm text-white/80">수십 년의 경험</div>
              </div>
            </div>

            <div className="mt-14">
              <Link
                to="/about"
                className="inline-flex items-center gap-3 text-[color:var(--kb-gold)] text-sm tracking-[0.25em] uppercase tick-arrow"
              >
                우리의 이야기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[color:var(--kb-paper)] py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 text-center">
          <FadeUp>
            <div className="text-[11px] tracking-[0.4em] uppercase text-[color:var(--kb-gold)] mb-8">
              From Korea to America
            </div>
            <h2 className="font-serif-kr text-4xl md:text-6xl font-light leading-[1.1] text-balance">
              <MaskedLineInView>당신의 다음 매장은</MaskedLineInView>{" "}
              <MaskedLineInView delay={0.15} className="italic text-[color:var(--kb-gold)]">미국에서 시작됩니다.</MaskedLineInView>
            </h2>
            <div className="mt-12">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-[color:var(--kb-ink)] text-white px-10 py-5 text-sm tracking-[0.25em] uppercase hover:bg-[color:var(--kb-gold)] hover:text-[color:var(--kb-ink)] transition-colors"
              >
                무료 상담 신청 <ArrowUpRight size={16} />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
