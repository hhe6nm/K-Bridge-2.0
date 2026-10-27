import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FadeUp } from "@/components/MaskedReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import ChapterBadge from "@/components/ChapterBadge";
import { useLang } from "@/lib/i18n";

/**
 * Homepage section 04: IFS Seoul 2026 franchise expo.
 * Photos go in /public/images/ifs/. Set a photo's src to null to show a placeholder.
 */

const PHOTOS = {
  main: "/images/ifs/ifs-meeting-lounge.webp",
  booth: "/images/ifs/ifs-booth-r14.webp",
  oneOnOne: "/images/ifs/ifs-meeting-1on1.webp",
};

const CONTENT = {
  ko: {
    badge: "현장 소식",
    title: "미국 진출을 준비하는 한국 프랜차이즈들을",
    titleItalic: "현장에서 직접 만났습니다.",
    intro:
      "K Bridge Partners는 2026년 10월 22일부터 24일까지 코엑스에서 열린 IFS 프랜차이즈 창업·산업 박람회에 참가했습니다. 사흘간 프랜차이즈 본사와 수출 기업을 만나, 한국 브랜드의 미국 진출 전략과 법인 설립, 매장 입지에 대해 깊이 있게 논의했습니다.",
    caption: "IFS 서울 · 코엑스 · 2026.10",
    alts: {
      main: "IFS 서울 박람회 비즈매칭 라운지에서 진행된 K Bridge Partners 상담",
      booth: "IFS 서울 박람회 K Bridge Partners 부스 (R14)",
      oneOnOne: "K Bridge Partners와 방문 기업의 1:1 상담",
    },
    stats: [
      { value: "249", unit: "개 기업", label: "프랜차이즈 본사, 수출 기업 등과 진행한 현장 미팅" },
      { value: "3", unit: "일", label: "코엑스 C홀 현장 상담" },
    ],
    topicsLabel: "현장에서 나눈 이야기",
    topics: [
      "미국 법인 설립과 E-2 비자 요건",
      "첫 매장 입지 선정과 임대 조건",
      "미국식 FDD 등 프랜차이즈 서류 준비",
    ],
    partnerLine:
      "박람회 기간 동안 업계 관계자 및 협력 기업들과도 관계를 쌓으며, 클라이언트에게 연결할 수 있는 네트워크를 넓혔습니다.",
    cta: "박람회에서 만나지 못하셨나요? 무료 상담 신청",
  },
  en: {
    badge: "On the Ground",
    title: "Meeting Korean franchises preparing for the U.S.,",
    titleItalic: "in person.",
    intro:
      "From October 22 to 24, 2026, K Bridge Partners exhibited at the IFS Franchise Show at COEX Seoul. Over three days, we met franchise headquarters and export companies to discuss U.S. entry strategy, entity setup, and site selection for Korean brands.",
    caption: "IFS Seoul · COEX · Oct 2026",
    alts: {
      main: "K Bridge Partners consultation in the IFS Seoul business matching lounge",
      booth: "K Bridge Partners booth R14 at IFS Seoul",
      oneOnOne: "K Bridge Partners one-on-one consultation with a visiting company",
    },
    stats: [
      { value: "249", unit: "companies", label: "met on site, including franchise headquarters and exporters" },
      { value: "3", unit: "days", label: "of consultations at COEX Hall C" },
    ],
    topicsLabel: "What we discussed",
    topics: [
      "U.S. entity setup and E-2 visa requirements",
      "Choosing a first location and negotiating the lease",
      "Preparing U.S. franchise documents like the FDD",
    ],
    partnerLine:
      "We also built relationships with industry contacts and partner companies, expanding the network we bring to every client.",
    cta: "Missed us at IFS? Book a free consultation",
  },
};

const EASE = [0.7, 0, 0.2, 1];

function Photo({ src, alt, className = "", position = "center", delay = 0 }) {
  return (
    <motion.div
      className={`group relative overflow-hidden bg-[color:var(--kb-ink)] ${className}`}
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.3, ease: EASE, delay }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{ objectPosition: position }}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center text-[11px] tracking-[0.25em] uppercase text-white/40"
          style={{ background: "repeating-linear-gradient(135deg, #142033 0 14px, #17253a 14px 28px)" }}
        >
          Photo
        </div>
      )}
      <div className="absolute inset-0 ring-1 ring-inset ring-[color:var(--kb-gold)]/15 pointer-events-none" />
    </motion.div>
  );
}

export default function ExpoHighlight({ chapterNumber = 4 }) {
  const { lang } = useLang();
  const t = CONTENT[lang] || CONTENT.ko;

  return (
    <section className="bg-[color:var(--kb-bone)] py-20 md:py-24" data-testid="home-expo">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="grid grid-cols-12 gap-10 mb-12 md:mb-14">
          <div className="col-span-12 md:col-span-4">
            <ChapterBadge number={chapterNumber} label={t.badge} />
          </div>
          <div className="col-span-12 md:col-span-8">
            <FadeUp delay={0.15}>
              <h2 className="font-serif-kr text-4xl md:text-5xl font-light leading-[1.45] text-balance break-keep text-[color:var(--kb-ink)]">
                {t.title}
                <br />
                <span className="italic text-[color:var(--kb-gold)]">{t.titleItalic}</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="mt-6 text-lg text-[color:var(--kb-text)]/80 leading-[1.9] max-w-2xl break-keep">
                {t.intro}
              </p>
            </FadeUp>
          </div>
        </div>

        {/* Photo collage: wipes in on scroll, zooms on hover */}
        <div className="grid grid-cols-12 gap-4">
          <Photo
            src={PHOTOS.main}
            alt={t.alts.main}
            className="col-span-12 lg:col-span-8 aspect-[4/3] lg:aspect-auto lg:h-[560px] clip-corner"
          />
          <div className="col-span-12 lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
            <Photo
              src={PHOTOS.booth}
              alt={t.alts.booth}
              position="center top"
              delay={0.25}
              className="aspect-square lg:aspect-auto lg:h-[272px]"
            />
            <Photo
              src={PHOTOS.oneOnOne}
              alt={t.alts.oneOnOne}
              delay={0.5}
              className="aspect-square lg:aspect-auto lg:h-[272px]"
            />
          </div>
        </div>
        <FadeUp delay={0.3}>
          <div className="mt-4 text-[11px] tracking-[0.3em] uppercase text-[color:var(--kb-muted)]">
            {t.caption}
          </div>
        </FadeUp>

        {/* Stats + topics */}
        <div className="mt-14 pt-12 border-t border-[color:var(--kb-border)] grid grid-cols-12 gap-8 lg:gap-10">
          {t.stats.map((s, i) => (
            <FadeUp key={i} delay={0.1 + i * 0.08} className="col-span-6 lg:col-span-3">
              <div data-testid={`home-expo-stat-${i}`}>
                <div className="flex items-baseline gap-2">
                  <AnimatedCounter
                    value={s.value}
                    className="font-serif-kr text-5xl md:text-6xl font-light text-[color:var(--kb-gold)]"
                  />
                  <span className="text-sm text-[color:var(--kb-muted)] tracking-widest">{s.unit}</span>
                </div>
                <p className="mt-4 text-[13px] text-[color:var(--kb-text)]/75 leading-relaxed break-keep max-w-[240px]">
                  {s.label}
                </p>
              </div>
            </FadeUp>
          ))}

          <FadeUp delay={0.3} className="col-span-12 lg:col-span-6">
            <div className="text-[11px] tracking-[0.35em] uppercase text-[color:var(--kb-gold)] mb-5">
              {t.topicsLabel}
            </div>
            <ul className="border-t border-[color:var(--kb-border)]">
              {t.topics.map((topic, i) => (
                <li
                  key={i}
                  className="group relative flex items-baseline gap-5 py-4 border-b border-[color:var(--kb-border)] transition-[padding] duration-500 hover:pl-7"
                >
                  <span className="absolute left-0 top-1/2 h-px w-0 bg-[color:var(--kb-gold)] transition-all duration-500 group-hover:w-4" />
                  <span className="text-[10px] tracking-[0.25em] text-[color:var(--kb-muted)]/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif-kr text-lg md:text-xl font-light text-[color:var(--kb-ink)] break-keep">
                    {topic}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[15px] text-[color:var(--kb-text)]/75 leading-[1.85] break-keep">
              {t.partnerLine}
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-3 text-[color:var(--kb-ink)] text-sm tracking-[0.2em] uppercase border-b border-[color:var(--kb-ink)] pb-1 transition-all hover:gap-5 hover:text-[color:var(--kb-gold)] hover:border-[color:var(--kb-gold)]"
            >
              {t.cta} <ArrowUpRight size={16} />
            </Link>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
