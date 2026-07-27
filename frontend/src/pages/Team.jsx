import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { FadeUp } from "@/components/MaskedReveal";
import { Link } from "react-router-dom";
import { useLang } from "@/lib/i18n";

const CONTENT = {
  ko: {
    eyebrow: "The Team",
    title: "현장에서 검증된 사람들.",
    subtitle: "K Bridge Partners의 팀은 리서치가 아닌 실전에서 능력을 검증받은 사람들로 구성됩니다.",
    yearsUnit: "년 경력",
    portraitCaption: "Portrait — Coming soon",
    cta: "팀과 대화하기",
    team: [
      {
        name: "Jessica Chong",
        title: "대표이사 (CEO)",
        role: "럭셔리 브랜드 · 글로벌 비즈니스 리더십",
        stat: "20+ 년 경력 · 럭셔리 리테일 · 글로벌 브랜드 운영",
        bio: "20년 이상 다양한 산업에서 비즈니스를 이끌어왔으며, 이탈리아 럭셔리 브랜드 Maxmara에서의 경험을 통해 글로벌 브랜드가 새로운 시장에서 자리 잡기 위해 필요한 기준을 직접 체득했습니다. K Bridge Partners에서는 이러한 경험을 바탕으로, 한국 브랜드가 미국 시장에서 흔들림 없이 자리 잡을 수 있도록 전체 방향을 이끌고 있습니다.",
        tags: ["Executive Leadership", "Luxury Brand Strategy", "Global Market Entry"],
      },
      {
        name: "Joy Chong",
        title: "이사 (Director)",
        role: "상업 부동산 · 다각적 사업 운영 경험",
        stat: "20+ 년 경력 · 상업 부동산 · 다산업 사업 운영",
        bio: "26년간 상업 부동산 분야에서 활동하며, 동시에 호텔 개발, 리테일, 이커머스 등 다양한 산업에서 직접 사업을 운영해왔습니다. 한 분야에 머무르지 않고, 여러 산업에서 실제로 사업을 일으키고 이끌어본 경험을 갖추고 있습니다.",
        tags: ["Commercial Real Estate", "Hospitality", "Retail", "E-Commerce"],
      },
      {
        name: "Samantha Cho",
        title: "Principal Consultant",
        role: "Cross-Border Strategy",
        stat: "15개 기업 자문 · 5개 산업 · UVA McIntire",
        bio: "University of Virginia McIntire 상경대학 졸업 후, 부동산·IT·핀테크·소비재·에너지 산업의 한국 스타트업 15곳에 자문을 제공했습니다. 데이터 분석 역량과 한영 이중언어를 바탕으로, 한국 기업이 미국 시장에서 실질적으로 필요로 하는 전략을 설계합니다.",
        bioCompanies: "Solidcore · Stridefow · HALO · Trinova · Beevly · Purenova · XMSoftlabs · FullDay · DIYONJU · Carpe Diem · Ren AI · Faraday Energy",
        tags: ["Market Analytics", "Cross-Border Strategy", "Startup Advisory", "Bilingual"],
      },
    ],
  },
  en: {
    eyebrow: "The Team",
    title: "People proven in the field.",
    subtitle: "K Bridge Partners is built by operators whose credentials come from real work, not resumes.",
    yearsUnit: "years",
    portraitCaption: "Portrait — Coming soon",
    cta: "Talk to the team",
    team: [
      {
        name: "Jessica Chong",
        title: "CEO",
        role: "Luxury Brand · Global Business Leadership",
        stat: "20+ years · Luxury retail · Global brand operations",
        bio: "Jessica has led businesses across a range of industries for over 20 years. Through her tenure at Maxmara, the Italian luxury house, she developed a firsthand understanding of what a global brand needs to establish itself in a new market. At K Bridge Partners, she brings that experience to leading the overall direction — helping Korean brands land in the U.S. market on solid footing.",
        tags: ["Executive Leadership", "Luxury Brand Strategy", "Global Market Entry"],
      },
      {
        name: "Joy Chong",
        title: "Director",
        role: "Commercial Real Estate · Multi-Industry Operator",
        stat: "20+ years · CRE · Multi-industry operator",
        bio: "Joy has worked in commercial real estate for 26 years, and simultaneously operated businesses across hospitality, retail, and e-commerce. Her experience isn't confined to one lane — she has built and run businesses across multiple industries, not just observed them.",
        tags: ["Commercial Real Estate", "Hospitality", "Retail", "E-Commerce"],
      },
      {
        name: "Samantha Cho",
        title: "Principal Consultant",
        role: "Cross-Border Strategy",
        stat: "15 companies advised · 5 industries · UVA McIntire",
        bio: "A University of Virginia McIntire School of Commerce graduate, Samantha has advised 15 Korean startups across real estate, IT, fintech, consumer goods, and energy. Combining data analytics with fluent Korean-English bilingualism, she designs strategies that reflect what Korean companies actually need in the U.S. market.",
        bioCompanies: "Solidcore · Stridefow · HALO · Trinova · Beevly · Purenova · XMSoftlabs · FullDay · DIYONJU · Carpe Diem · Ren AI · Faraday Energy",
        tags: ["Market Analytics", "Cross-Border Strategy", "Startup Advisory", "Bilingual"],
      },
    ],
  },
};

function TeamCard({ member, t, index }) {
  const [revealed, setRevealed] = useState(false);
  const initials = member.name.split(" ").map((s) => s[0]).slice(0, 2).join("");
  return (
    <div
      className="group relative aspect-[3/4] overflow-hidden border border-[color:var(--kb-border)] hover:border-[color:var(--kb-gold)] transition-colors cursor-pointer bg-[color:var(--kb-ink)]"
      onMouseEnter={() => setRevealed(true)}
      onMouseLeave={() => setRevealed(false)}
      onClick={() => setRevealed((r) => !r)}
      data-testid={`team-card-${index}`}
    >
      {/* Portrait placeholder — subtle initials */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0A1128] via-[#050914] to-[#12161F]">
        <span className="font-serif-kr text-[color:var(--kb-gold)]/20 text-[140px] leading-none select-none">
          {initials}
        </span>
      </div>

      {/* Base labels */}
      <div className={`absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#050914] via-[#050914]/85 to-transparent transition-opacity duration-500 ${revealed ? "opacity-0" : "opacity-100"}`}>
        <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-gold)]">{member.role}</div>
        <h3 className="mt-2 font-serif-kr text-2xl md:text-3xl font-light text-[color:var(--kb-champagne)] leading-tight">
          {member.name}
        </h3>
        <div className="mt-1 text-sm text-[color:var(--kb-champagne)]/70 font-serif-kr">{member.title}</div>
        <div className="mt-3 text-xs text-white/60 leading-relaxed">{member.stat}</div>
      </div>

      {/* Reveal overlay */}
      <div
        className={`absolute inset-0 bg-[#050914]/97 backdrop-blur-sm p-7 flex flex-col justify-between transition-all duration-500 ${
          revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        data-testid={`team-reveal-${index}`}
      >
        <div className="overflow-y-auto pr-1">
          <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-gold)]">{member.role}</div>
          <h3 className="mt-2 font-serif-kr text-2xl font-light text-[color:var(--kb-champagne)] leading-tight">
            {member.name}
          </h3>
          <div className="mt-1 text-sm text-[color:var(--kb-champagne)]/70 font-serif-kr">{member.title}</div>
          <div className="mt-4 h-px bg-[color:var(--kb-gold)]/40 w-12" />
          <p className="mt-4 text-[13px] text-white/85 leading-[1.75]">{member.bio}</p>
          {member.bioCompanies && (
            <p className="mt-3 text-[11px] text-[color:var(--kb-champagne)]/60 leading-[1.7] tracking-wide">
              {member.bioCompanies}
            </p>
          )}
        </div>
        <div className="mt-4">
          <div className="flex flex-wrap gap-1.5">
            {member.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] tracking-[0.2em] uppercase border border-[color:var(--kb-gold)]/60 px-2.5 py-1 text-[color:var(--kb-champagne)] bg-[color:var(--kb-gold)]/5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Team() {
  const { lang } = useLang();
  const t = CONTENT[lang];
  return (
    <div>
      <PageHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

      <section className="bg-[color:var(--kb-bone)] py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {t.team.map((m, i) => (
              <FadeUp key={i} delay={i * 0.08} className="h-full">
                <TeamCard member={m} t={t} index={i} />
              </FadeUp>
            ))}
          </div>
          <div className="mt-20 text-center">
            <Link to="/contact" className="inline-flex items-center gap-3 bg-[color:var(--kb-ink)] text-white px-10 py-4 text-sm tracking-[0.25em] uppercase hover:bg-[color:var(--kb-gold)] hover:text-[color:var(--kb-ink)] transition-colors">
              {t.cta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
