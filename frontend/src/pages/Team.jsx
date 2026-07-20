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
    portraitCaption: "Portrait — Coming soon",
    featuredLabel: "Featured",
    yearsUnit: "년 경력",
    revealCta: "프로필 보기",
    closeCta: "닫기",
    awardsNote: "수상 · 인증 · 자격 — 추후 업데이트",
    cta: "팀과 대화하기",
    team: [
      { name: "성함 예정", role: "Founder · 미국 상업 부동산 베테랑", years: "30+", specialty: "리테일 임대차 협상 · 상권 분석 · 입지 선정",
        bio: "수십 년간 미국 서부와 동부 주요 도시에서 상업 부동산 실무를 담당해온 베테랑 에이전트. 대형 프랜차이즈 브랜드부터 독립 부티크까지, 다양한 규모의 리테일 프로젝트에서 임대인과 임차인 양측의 관점을 모두 경험한 실전 전문가.",
        tags: ["Lease Negotiation", "Site Selection", "Retail Strategy"], featured: true },
      { name: "성함 예정", role: "미국 진출 전략 리드", years: "15+", specialty: "F&B · 리테일 브랜드 미국 진출 실행",
        bio: "국내 브랜드의 미국 진출 프로젝트를 다수 리드해온 전략가. 시장 진입 방식 설계, 파트너 매칭, 초기 오퍼레이션 셋업까지 실행 중심의 접근을 지향.",
        tags: ["Entry Strategy", "Franchise", "Operations"] },
      { name: "성함 예정", role: "법인 · 오퍼레이션 파트너", years: "12+", specialty: "법인 설립 · 라이센싱 · 오픈 매니지먼트",
        bio: "미국 내 법인 설립, EIN, 각종 라이센싱 및 인·허가 프로세스에 정통. 전문가 네트워크를 통해 회계·법률·시공 파트너를 유기적으로 연결.",
        tags: ["Entity Formation", "Licensing", "Buildout"] },
    ],
  },
  en: {
    eyebrow: "The Team",
    title: "People proven in the field.",
    subtitle: "K Bridge Partners is built by operators whose credentials come from real work, not resumes.",
    portraitCaption: "Portrait — Coming soon",
    featuredLabel: "Featured",
    yearsUnit: "years",
    revealCta: "View profile",
    closeCta: "Close",
    awardsNote: "Awards & certifications — updates coming soon",
    cta: "Talk to the team",
    team: [
      { name: "TBA", role: "Founder · Veteran U.S. Commercial Real Estate Agent", years: "30+", specialty: "Retail lease negotiation · trade area analysis · site selection",
        bio: "A veteran U.S. West and East coast retail real estate agent with decades of on-the-ground experience — from franchise anchor deals to independent boutique first stores, working on both landlord and tenant sides.",
        tags: ["Lease Negotiation", "Site Selection", "Retail Strategy"], featured: true },
      { name: "TBA", role: "U.S. Market Entry Strategy Lead", years: "15+", specialty: "Execution of F&B and retail brand entries",
        bio: "A strategist who has led multiple Korean brand U.S. market entries. Focused on entry method design, partner matching, and early operational setup — execution-first, not deck-first.",
        tags: ["Entry Strategy", "Franchise", "Operations"] },
      { name: "TBA", role: "Entity & Operations Partner", years: "12+", specialty: "Entity formation · licensing · opening management",
        bio: "Deep expertise in U.S. entity formation, EIN, licensing and permit processes — with a curated network of accounting, legal, and construction partners.",
        tags: ["Entity Formation", "Licensing", "Buildout"] },
    ],
  },
};

function TeamCard({ member, t, index }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div
      className="group relative aspect-[3/4] overflow-hidden border border-[color:var(--kb-border)] hover:border-[color:var(--kb-gold)] transition-colors cursor-pointer bg-[color:var(--kb-ink)]"
      onMouseEnter={() => setRevealed(true)}
      onMouseLeave={() => setRevealed(false)}
      onClick={() => setRevealed((r) => !r)}
      data-testid={`team-card-${index}`}
    >
      {/* Portrait placeholder — SVG monogram */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0A1128] via-[#050914] to-[#12161F]">
        <span className="font-serif-kr text-[color:var(--kb-gold)]/25 text-[160px] leading-none select-none">
          K B
        </span>
      </div>
      {/* Base labels */}
      <div className={`absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#050914] via-[#050914]/85 to-transparent transition-opacity duration-500 ${revealed ? "opacity-0" : "opacity-100"}`}>
        <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-gold)]">{member.role}</div>
        <h3 className="mt-2 font-serif-kr text-2xl md:text-3xl font-light text-[color:var(--kb-champagne)]">{member.name}</h3>
        <div className="mt-3 text-xs text-white/60">
          <span className="text-white">{member.years}</span> {t.yearsUnit} · {member.specialty}
        </div>
      </div>
      {member.featured && !revealed && (
        <div className="absolute top-4 right-4 text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-gold)] border border-[color:var(--kb-gold)]/40 px-3 py-1.5 bg-[#050914]/60 backdrop-blur-sm">
          {t.featuredLabel}
        </div>
      )}

      {/* Reveal overlay */}
      <div
        className={`absolute inset-0 bg-[#050914]/95 backdrop-blur-sm p-8 flex flex-col justify-between transition-all duration-500 ${
          revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        data-testid={`team-reveal-${index}`}
      >
        <div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-gold)]">{member.role}</div>
          <h3 className="mt-2 font-serif-kr text-2xl font-light text-[color:var(--kb-champagne)] leading-tight">{member.name}</h3>
          <div className="mt-4 h-px bg-[color:var(--kb-gold)]/40 w-12" />
          <p className="mt-4 text-[13px] text-white/80 leading-[1.75]">{member.bio}</p>
        </div>
        <div>
          <div className="flex flex-wrap gap-1.5">
            {member.tags.map((tag) => (
              <span key={tag} className="text-[9px] tracking-[0.2em] uppercase border border-[color:var(--kb-gold)]/30 px-2 py-1 text-[color:var(--kb-champagne)]/85">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-4 text-[10px] tracking-[0.3em] uppercase text-white/40">{t.awardsNote}</div>
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

      <section className="bg-[color:var(--kb-bone)] py-24 md:py-32">
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
