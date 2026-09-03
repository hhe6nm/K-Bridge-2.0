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
        tags: ["Real Estate Leadership", "Global Brand Strategy", "Global Market Entry"],
      },
      {
        name: "Joy Jeong",
        title: "이사 (Director)",
        role: "부동산 개발 · 다각적 사업 운영 경험",
        stat: "20+ 년 경력 · 부동산 개발 · 다산업 사업 운영",
        bio: "20년 이상 부동산 개발과 다양한 산업에서 사업을 이끌어왔으며, 현재도 활발히 부동산 사업을 이어가고 있습니다. 괌에서 호텔 개발 프로젝트를 처음부터 직접 기획하고 추진했으며, 압구정 로데오거리에서 패션·라이프스타일 브랜드 사업을 운영했습니다. Fendi, BMW 등 글로벌 브랜드에서도 실무 경험을 쌓았고, 호텔·리테일·이커머스에 이르기까지 여러 산업에서 직접 사업을 일으키고 이끌어온 경험을 갖추고 있습니다.",
        tags: ["Real Estate Development", "Fashion & Lifestyle", "E-Commerce"],
      },
      {
        name: "Samantha Cho",
        title: "글로벌 성장 총괄 (Head of Int. Development)",
        role: "시장진출 전략 · 데이터 분석",
        stat: "15개 한국 스타트업 자문 · 8개 산업 · UVA McIntire",
        bio: "15개 한국 스타트업의 미국 진출 전략을 설계해온 컨설턴트입니다. University of Virginia McIntire School of Commerce에서 경영학을 전공하고, IT를 집중전공(트랙)으로, 데이터사이언스를 부전공으로 이수했습니다. 시장 규모 분석, 입지 선정, 재무 모델링, 투자자 피칭, GTM 전략까지 미국 진출에 필요한 실무 전 과정을 직접 설계하고 실행합니다. Solidcore를 비롯해 부동산·IT·핀테크·소비재·에너지·F&B·헬스&웰니스·헬스케어 등 다양한 산업의 기업에 자문을 제공해왔습니다. 데이터 분석과 현장 실무 경험을 바탕으로 한미 양쪽에서 프로젝트를 이끌고 있습니다.",
        tags: ["Market Analytics", "Cross-Border Strategy", "Startup Advisory", "Bilingual"],
      },
      {
        name: "Daniel Oh",
        title: "사모투자·개발·투자자관계 총괄",
        role: "사모투자 · 부동산 개발 · 투자자 관계",
        stat: "마이애미 대학교 졸업 · 개발 전 과정 실행 · 투자자 관계",
        bio: "마이애미 대학교(University of Miami)를 졸업했으며, 이후 부동산 개발과 이커머스, 사모투자 기반의 투자자 관계 분야를 아우르며 커리어를 쌓아왔습니다. 이커머스 분야에서는 데이터를 기반으로 재고, 소싱, 성장 전략을 이끄는 운영·분석 업무를 직접 수행해왔으며, 단순한 부업이 아닌 실제 사업 운영으로 접근해왔습니다. 부동산 부문에서는 매물 발굴부터 시공업체 조율, 협상, 실행까지 딜의 전 과정을 직접 관리합니다. 민간 투자자 그룹과 긴밀히 협력하며 자본 운용과 확장 전략을 자문하고, 외부 자본이 실제 완공된 프로젝트로 이어지도록 관계를 구축하며, 현장 프로젝트 매니지먼트를 통해 모든 개발이 기획부터 완료까지 흔들림 없이 진행되도록 이끕니다.",
        tags: ["PE", "Real Estate Development", "Investor Relations", "Franchise Expansion"],
      },
      {
        name: "Seokyu Kim",
        title: "최고재무책임자 (CFO)",
        role: "공인회계사 · 프랜차이즈 회계 · 재무 전략",
        stat: "공인회계사(CPA) · 프랜차이즈 회계 시스템 · 국경간 세무",
        bio: "공인회계사(CPA)로, 기업 회계와 재무 전반에 걸쳐 폭넓은 실무 경험을 쌓아왔습니다. 한국 브랜드가 미국에서 가맹본부로 자리 잡을 때, 그 밑바탕이 되는 회계 구조를 직접 세팅합니다. 법인 설립, 로열티 및 광고분담금 회계 처리, 그리고 FDD(Franchise Disclosure Document)에 들어가는 재무제표를 Item 21 기준에 맞춰 준비하고 감사·검토합니다. 로열티를 책정하고 신규 가맹점의 초기 투자비와 운영비를 예측하며, 오픈 전에 손익분기점을 계산하는 재무 모델을 구축합니다. 세무 측면에서는 브랜드가 확장하는 여러 주에 걸쳐 법인세, Sales Tax, Payroll Tax 신고를 담당하고, 가맹점주가 실제로 운영할 수 있는 회계·Bookkeeping 시스템을 세팅하며, 브랜드가 자금을 조달할 때 은행이나 투자자에게 제출할 재무자료를 준비합니다. 미국 내 40개 이상의 IHOP 매장을 소유, 운영하는 중국계 투자자 그룹과 직접 협력하며, 지속적인 프랜차이즈 확장의 재무적인 부분을 관리하고 있습니다.",
        tags: ["CPA", "Franchise Accounting", "Financial Forecasting", "Entity Structuring"],
      },
    ],
  },
  en: {
    eyebrow: "The Team",
    title: "Expertise, Put to Work.",
    subtitle: "Behind K Bridge are people who know the U.S. market, know the challenges, and know what it takes to move things forward, so you don’t have to figure it out alone.",
    yearsUnit: "years",
    portraitCaption: "Portrait — Coming soon",
    cta: "Talk to the team",
    team: [
      {
        name: "Jessica Chong",
        title: "CEO",
        role: "Luxury Brand · Global Business Leadership",
        stat: "20+ years · Luxury retail · Global brand operations",
        bio: "Jessica Chong is the founder and CEO of K Bridge Partners, where she leads the firm's work helping Korean brands establish and grow their presence in the U.S. market. With more than 20 years of experience working across luxury brands, commercial real estate, and international business, Jessica brings a practical understanding of what it takes to navigate the U.S. market, from identifying the right opportunities and building local relationships to turning strategy into execution. Her work is grounded in a simple belief: entering a new market should not mean navigating it alone. At K Bridge, she works closely with clients to bridge the gap between their ambitions in Korea and the realities of doing business in the United States.",
        tags: ["Executive Leadership", "Luxury Brand Strategy", "Global Market Entry"],
      },
      {
        name: "Joy Chong",
        title: "Director",
        role: "Real Estate Development · Multi-Industry Operator",
        stat: "20+ years · Real estate development · Multi-industry operator",
        bio: "Joy Chong brings more than 20 years of experience across real estate development, hospitality, retail, and consumer businesses. She has been involved in projects and businesses at every stage, from development and launch to day-to-day operations and growth. Her experience includes leading the development of a hotel project in Guam from the ground up, as well as operating a fashion and lifestyle business in Seoul's Apgujeong Rodeo area. She has also worked with global brands including Fendi and BMW, gaining experience across luxury, automotive, retail, and consumer markets. Today, Joy remains active in real estate and brings a hands-on, entrepreneurial perspective to K Bridge Partners. Her experience across multiple industries gives her a practical understanding of the operational and commercial decisions involved in building a successful business.",
        tags: ["Real Estate Development", "Hospitality", "Fashion & Lifestyle", "E-Commerce"],
      },
      {
        name: "Samantha Cho",
        title: "Head of International Development",
        role: "Principal Consultant · Cross-Border Strategy",
        stat: "15 Korean startups advised · 8 industries · UVA McIntire",
        bio: "Samantha Cho leads K Bridge Partners' international development work, helping Korean companies evaluate, enter, and grow in the U.S. market. She has developed market-entry strategies for 15 Korean startups across industries including technology, healthcare, fintech, consumer goods, energy, F&B, real estate, and health and wellness. Samantha studied Commerce at the University of Virginia's McIntire School of Commerce, with a concentration in Information Technology and a minor in Data Science. Her work combines market research and data analysis with practical, on-the-ground knowledge of the U.S. market. Working across Korea and the United States, Samantha helps clients turn market opportunities into clear, actionable strategies. She works fluently in both English and Korean.",
        tags: ["Market Analytics", "Cross-Border Strategy", "Startup Advisory", "Bilingual"],
      },
      {
        name: "Daniel Oh",
        title: "Head of Private Equity, Development & Investor Relations",
        role: "Private Equity · Development · Investor Relations",
        stat: "University of Miami · Full-cycle development · Investor relations",
        bio: "Daniel Oh works across private equity, real estate development, and investor relations, with experience spanning both investment and operations. He manages real estate projects from acquisition and deal structuring through contractor coordination, negotiations, and completion. His experience also includes e-commerce operations and analytics, where he has worked with data to inform inventory, sourcing, and growth decisions. Alongside his operating experience, Daniel works closely with private investor groups on capital deployment and expansion strategy, helping structure investments and partnerships around new development opportunities. Daniel studied at the University of Miami and brings an analytical, execution-focused approach to K Bridge Partners' investment and development work.",
        tags: ["PE", "Real Estate Development", "Investor Relations", "Franchise Expansion"],
      },
      {
        name: "Seokyu Kim",
        title: "Chief Financial Officer (CFO)",
        role: "CPA · Franchise Accounting · Financial Forecasting",
        stat: "Licensed CPA · Franchise Accounting Systems · Cross-Border Tax",
        bio: "Seokyu Kim serves as Chief Financial Officer of K Bridge Partners, where he leads the firm's accounting and financial work for Korean brands entering the U.S. market. He is a licensed CPA with broad experience across corporate accounting and finance. Seokyu builds the accounting foundation a Korean brand needs to operate as a U.S. franchisor, from entity setup to royalty and ad-fund accounting to the audited financial statements required for Item 21 of the Franchise Disclosure Document. He also builds the financial models franchisors rely on to price royalties, project a new franchisee's investment and operating costs, and calculate breakeven before a location opens. His work spans tax and operations as well, including corporate, sales, and payroll tax filings across every state a brand expands into, bookkeeping systems franchisees can run day to day, and financial packages for banks and investors during capital raises. He currently manages the financial side of an investor group from China that owns and operates more than 40 IHOP locations across the U.S.",
        tags: ["CPA", "Franchise Accounting", "Financial Forecasting", "Entity Structuring"],
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
        <div className="mt-1 text-sm text-white font-serif-kr">{member.title}</div>
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
          <div className="mt-1 text-sm text-white font-serif-kr">{member.title}</div>
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
