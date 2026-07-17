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

export default function Team() {
  const { lang } = useLang();
  const t = CONTENT[lang];
  return (
    <div>
      <PageHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

      <section className="bg-[color:var(--kb-bone)] py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          {t.team.map((m, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <div className="grid grid-cols-12 gap-10 py-16 border-b border-[color:var(--kb-border)]">
                <div className="col-span-12 lg:col-span-5">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--kb-ink)] border border-[color:var(--kb-border)]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-serif-kr text-[color:var(--kb-gold)]/30 text-9xl">K B</span>
                    </div>
                    <div className="absolute bottom-4 left-4 text-[10px] tracking-[0.3em] uppercase text-white/50">
                      {t.portraitCaption}
                    </div>
                    {m.featured && (
                      <div className="absolute top-4 right-4 text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-gold)] border border-[color:var(--kb-gold)]/40 px-3 py-1.5">
                        {t.featuredLabel}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-span-12 lg:col-span-7 flex flex-col justify-center">
                  <div className="text-[11px] tracking-[0.3em] uppercase text-[color:var(--kb-gold)]">{m.role}</div>
                  <h3 className={`font-serif-kr font-light mt-4 leading-tight ${m.featured ? "text-5xl md:text-6xl" : "text-4xl"}`}>
                    {m.name}
                  </h3>
                  <div className="mt-6 flex items-center gap-6 text-sm text-[color:var(--kb-muted)] flex-wrap">
                    <span><span className="text-[color:var(--kb-ink)] font-medium">{m.years}</span> {t.yearsUnit}</span>
                    <span className="w-px h-4 bg-[color:var(--kb-border)]" />
                    <span>{m.specialty}</span>
                  </div>
                  <p className="mt-6 text-lg text-[color:var(--kb-text)]/75 leading-relaxed max-w-2xl">{m.bio}</p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {m.tags.map((tag) => (
                      <span key={tag} className="text-[11px] tracking-[0.2em] uppercase border border-[color:var(--kb-border)] px-3 py-1.5 text-[color:var(--kb-ink)]/70">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 text-xs text-[color:var(--kb-muted)]">{t.awardsNote}</div>
                </div>
              </div>
            </FadeUp>
          ))}
          <div className="mt-16 text-center">
            <Link to="/contact" className="inline-flex items-center gap-2 text-[color:var(--kb-ink)] tick-arrow text-sm tracking-[0.25em] uppercase">{t.cta}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
