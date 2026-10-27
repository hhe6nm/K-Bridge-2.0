import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FadeUp } from "@/components/MaskedReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import ChapterBadge from "@/components/ChapterBadge";
import { useLang } from "@/lib/i18n";

/**
 * Homepage section 04: IFS Seoul 2026 franchise expo.
 * Photos live in /public/images/ifs/. Each of the three collage slots
 * slowly crossfades between two photos, so all six are shown.
 * `pos` sets which part of the photo stays visible when it is cropped.
 */

const PHOTOS = {
  main: [
    { src: "/images/ifs/ifs-lounge.webp", pos: "center", alt: "lounge" },
    { src: "/images/ifs/ifs-matching-lounge.webp", pos: "center 60%", alt: "matching" },
  ],
  booth: [
    { src: "/images/ifs/ifs-booth.webp", pos: "center 35%", alt: "booth" },
    { src: "/images/ifs/ifs-directory.webp", pos: "70% 45%", alt: "directory" },
  ],
  side: [
    { src: "/images/ifs/ifs-consult.webp", pos: "center 60%", alt: "consult" },
    { src: "/images/ifs/ifs-entrance.webp", pos: "center 45%", alt: "entrance" },
  ],
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
      lounge: "IFS 서울 박람회에서 진행된 K Bridge Partners 상담",
      matching: "IFS 서울 박람회 비즈매칭 라운지",
      booth: "IFS 서울 박람회 K Bridge Partners 부스",
      directory: "박람회 참가업체 안내판의 K 브리지 파트너스 (R14)",
      consult: "K Bridge Partners와 방문 기업의 1:1 상담",
      entrance: "코엑스 C홀 IFS 박람회 입구",
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
      lounge: "K Bridge Partners consultation at IFS Seoul",
      matching: "The business matching lounge at IFS Seoul",
      booth: "K Bridge Partners booth at IFS Seoul",
      directory: "K Bridge Partners (R14) on the exhibitor directory",
      consult: "K Bridge Partners one-on-one consultation with a visiting company",
      entrance: "IFS Seoul entrance at COEX Hall C",
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

// One collage slot: wipes in on scroll, then crossfades between its photos.
// `offset` staggers the slots so they never all change at once.
function RotatingPhoto({ photos, alts, className = "", delay = 0, offset = 0, interval = 6000 }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (photos.length < 2) return;
    let timer;
    const start = setTimeout(() => {
      timer = setInterval(() => setActive((i) => (i + 1) % photos.length), interval);
    }, offset);
    return () => {
      clearTimeout(start);
      clearInterval(timer);
    };
  }, [photos.length, interval, offset]);

  return (
    <motion.div
      className={`group relative overflow-hidden bg-[color:var(--kb-ink)] ${className}`}
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.3, ease: EASE, delay }}
    >
      {photos.map((p, i) => (
        <img
          key={p.src}
          src={p.src}
          alt={alts[p.alt]}
          loading="lazy"
          style={{ objectPosition: p.pos }}
          className={`absolute inset-0 w-full h-full object-cover transition-[opacity,transform] duration-[1600ms] ease-out group-hover:scale-[1.05] ${
            i === active ? "opacity-100 scale-[1.02]" : "opacity-0 scale-100"
          }`}
        />
      ))}
      <div className="absolute inset-0 ring-1 ring-inset ring-[color:var(--kb-gold)]/15 pointer-events-none" />
      {photos.length > 1 && (
        <div className="absolute bottom-4 right-4 flex gap-1.5" aria-hidden>
          {photos.map((_, i) => (
            <span
              key={i}
              className={`h-[2px] transition-all duration-700 ${
                i === active ? "w-6 bg-[color:var(--kb-gold)]" : "w-3 bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
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
        <div className="mb-12 md:mb-14 max-w-4xl">
          <ChapterBadge number={chapterNumber} label={t.badge} className="mb-8" />
          <div>
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
          <RotatingPhoto
            photos={PHOTOS.main}
            alts={t.alts}
            offset={0}
            className="col-span-12 lg:col-span-8 aspect-[4/3] lg:aspect-auto lg:h-[560px] clip-corner"
          />
          <div className="col-span-12 lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
            <RotatingPhoto
              photos={PHOTOS.booth}
              alts={t.alts}
              delay={0.25}
              offset={2000}
              className="aspect-square lg:aspect-auto lg:h-[272px]"
            />
            <RotatingPhoto
              photos={PHOTOS.side}
              alts={t.alts}
              delay={0.5}
              offset={4000}
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
