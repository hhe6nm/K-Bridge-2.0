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
        role: "부동산 · 금융 · 글로벌 브랜드 리더십",
        stat: "25+ 년 경력 · 부동산 · 글로벌 브랜드 운영",
        bio: "25년 이상 금융과 부동산, 글로벌 브랜드를 넘나들며 비즈니스를 이끌어왔습니다. 금융기관에서 근무하며 숫자와 리스크를 정확히 읽어내는 감각을 다졌고, 이 감각은 이후 비즈니스 전반의 의사결정에도 그대로 이어졌습니다. 글로벌 브랜드 현장에서 브랜드가 새로운 시장에서 자리 잡기 위해 필요한 기준을 직접 체득했으며, 20년간 부동산 회사를 직접 운영하며 상업용과 주거용 부동산을 모두 아우르는 실무 경험을 쌓았습니다. K Bridge Partners에서는 이 모든 경험을 바탕으로, 한국 브랜드가 미국 시장에서 흔들림 없이 자리 잡을 수 있도록 전체 방향을 이끌고 있습니다.",
        tags: ["Executive Leadership", "Real Estate Leadership", "Global Brand Strategy", "Global Market Entry"],
      },
      {
        name: "Joy Chong",
        title: "이사 (Director)",
        role: "부동산 개발 · 다각적 사업 운영 경험",
        stat: "20+ 년 경력 · 부동산 개발 · 다산업 사업 운영",
        bio: "20년 이상 부동산 개발과 다양한 산업에서 사업을 이끌어왔으며, 현재도 활발히 부동산 사업을 이어가고 있습니다. 괌에서 호텔 개발 프로젝트를 처음부터 직접 기획하고 추진했으며, 압구정 로데오거리에서 패션·라이프스타일 브랜드 사업을 운영했습니다. Fendi, BMW 등 글로벌 브랜드에서도 실무 경험을 쌓았고, 호텔·리테일·이커머스에 이르기까지 여러 산업에서 직접 사업을 일으키고 이끌어온 경험을 갖추고 있습니다.",
        tags: ["Real Estate Development", "Fashion & Lifestyle", "E-Commerce"],
      },
      {
        name: "Samantha Cho",
        title: "수석 컨설턴트 (Principal Consultant)",
        role: "Principal Consultant · Cross-Border Strategy",
        stat: "15개 한국 스타트업 자문 · 8개 산업 · UVA McIntire",
        bio: "15개 한국 스타트업의 미국 진출 전략을 설계해온 컨설턴트입니다. University of Virginia McIntire School of Commerce에서 경영학을 전공하고, IT를 집중전공(트랙)으로, 데이터사이언스를 부전공으로 이수했습니다. Solidcore를 비롯해 부동산·IT·핀테크·소비재·에너지·F&B·헬스&웰니스·헬스케어 등 다양한 산업의 기업에 자문을 제공해왔습니다. 데이터 분석과 현장 실무 경험을 바탕으로 한미 양쪽에서 프로젝트를 이끌고 있습니다.",
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
        bio: "For over 20 years, Jessica has worked alongside brands built with real care and conviction. Watching so many of them shrink in front of an unfamiliar U.S. market always stayed with her — not for lack of skill, but for lack of someone who had walked that road before. That feeling is why she started K Bridge Partners, and why she now leads the work of walking that road together, until a Korean brand is truly standing on its own ground in the U.S.",
        tags: ["Executive Leadership", "Luxury Brand Strategy", "Global Market Entry"],
      },
      {
        name: "Joy Chong",
        title: "Director",
        role: "Real Estate Development · Multi-Industry Operator",
        stat: "20+ years · Real estate development · Multi-industry operator",
        bio: "Joy has led real estate development and businesses across a range of industries for over 20 years, and remains active in real estate today. She personally planned and drove a hotel development project in Guam from the ground up, and ran a fashion and lifestyle brand business on Apgujeong's Rodeo Street. She also gained hands-on experience at global brands including Fendi and BMW, and has built and run businesses spanning hospitality, retail, and e-commerce — not just observed them.",
        tags: ["Real Estate Development", "Hospitality", "Fashion & Lifestyle", "E-Commerce"],
      },
      {
        name: "Samantha Cho",
        title: "Principal Consultant",
        role: "Principal Consultant · Cross-Border Strategy",
        stat: "15 Korean startups advised · 8 industries · UVA McIntire",
        bio: "Samantha is a cross-border strategist who has designed U.S. market-entry strategies for 15 Korean startups. She studied Commerce at the University of Virginia's McIntire School of Commerce, with a concentration in IT and a minor in Data Science. She has advised companies including Solidcore across real estate, IT, fintech, consumer goods, energy, F&B, health and wellness, and healthcare. She leads projects on both sides of the Pacific, grounded in data analysis and real on-the-ground experience, in both English and Korean.",
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

      <section className="bg-[color:var(--kb-bone)] pt-14 md:pt-20 pb-20 md:pb-24">
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
