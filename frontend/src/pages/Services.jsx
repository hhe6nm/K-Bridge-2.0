import { Link } from "react-router-dom";
import { Compass, Landmark, Building2, Store, Rocket, ArrowUpRight, Network } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { FadeUp, MaskedLineInView } from "@/components/MaskedReveal";
import { useLang } from "@/lib/i18n";

const CONTENT = {
  ko: {
    eyebrow: "Services",
    title: "시장 조사부터 매장 오픈까지, 하나의 팀이 함께합니다.",
    subtitle: "한 팀이 전 과정을 책임집니다. 리서치, 계약, 시공, 오픈, 안정화까지 — 각 단계마다 다른 파트너를 찾을 필요가 없습니다.",
    why: "왜 중요한가",
    pillars: [
      {
        en: "Market Research & Strategy", title: "시장 조사 · 진입 전략", icon: Compass,
        body: "지역과 카테고리, 소비 성향을 결합해 진입 우선순위와 방식을 확정합니다. 데이터로 좁히고, 현장 실사로 검증합니다.",
        why: "미국은 도시 하나하나가 하나의 국가만큼 다릅니다. 첫 진입 지역과 진입 방식의 선택은 이후 3~5년의 자본 효율성을 결정합니다.",
        items: ["시장 · 경쟁 · 상권 분석", "카테고리 및 지역 진입 우선순위", "진입 방식(직진출 · JV · 프랜차이즈) 평가", "재무 시뮬레이션 및 초기 자본 계획"],
      },
      {
        en: "Local Network Connections", title: "현지 네트워크 연결", icon: Network,
        body: "변호사, 회계사, 시공업체까지 — 검증된 현지 파트너 네트워크를 연결합니다.",
        why: "좋은 전략도 실행할 사람이 없으면 멈춥니다. 미국에서 신뢰할 수 있는 변호사, 회계사, 시공업체를 찾는 데만 몇 달이 걸리기도 합니다. K Bridge는 이미 검증된 네트워크를 처음부터 열어드립니다.",
        items: ["변호사·회계사 네트워크 연결", "시공업체·공급업체 매칭", "전문가 검증 및 사전 스크리닝", "필요 시점에 맞춘 파트너 소개"],
      },
      {
        en: "Entity Setup", title: "법인 설립 · 셋업", icon: Landmark,
        body: "설립 주(State), 법인 형태, 세제 구조, 라이센싱을 향후 확장 시나리오에 맞춰 설계합니다.",
        why: "지금의 편의보다 5년 뒤의 유연성이 우선입니다. 법인 형태와 주 선택이 세금, 투자 유치, 오너의 개인 리스크까지 좌우합니다.",
        items: ["법인 · EIN · 사업자 등록", "전문가 네트워크 조정 (회계 · 법률)", "인·허가 및 라이센싱", "시공 · 공급업체 · 오픈 준비"],
      },
      {
        en: "Commercial Real Estate", title: "상업용 부동산", icon: Building2,
        body: "부지 분석부터 임대차 협상까지 — 계약서 이면의 관행을 아는 팀이 함께합니다.",
        why: "임대차 조건 하나가 손익 모델의 30~40%를 좌우합니다. 임대인의 언어와 협상의 문법을 아는 것이 결정적 차이입니다.",
        items: ["부지 분석 및 상권 리서치", "임대차 조건 검토 (NNN · CAM · TI · Exclusive Use)", "임대인 협상 및 조건 최적화", "최적 입지 확정"],
      },
      {
        en: "Franchise Development", title: "프랜차이즈 개발", icon: Store,
        body: "미국형 FDD 문서와 주 등록, 마스터 프랜차이지 모델과 로컬 파트너 연결까지 함께합니다.",
        why: "미국의 프랜차이즈는 연방·주 규제 위에서 움직입니다. 처음부터 미국형 구조를 갖춰야 자본과 운영을 분산하면서도 브랜드를 지킬 수 있습니다.",
        items: ["미국형 프랜차이즈 전략 수립", "FDD 문서 준비 및 주 등록", "마스터 프랜차이지 모델 평가", "로컬 파트너 발굴 및 매칭"],
      },
      {
        en: "Store Opening & Ops", title: "매장 오픈 · 초기 운영", icon: Rocket,
        body: "시공 · 스태핑 · 오픈 마케팅부터 오픈 이후의 운영 안정화까지 실행 중심으로 지원합니다.",
        why: "오픈은 끝이 아니라 시작입니다. 오픈 후 90일의 지표를 함께 검토해 이탈 리스크를 줄이는 것이 핵심입니다.",
        items: ["시공 · 공급업체 매칭", "초기 스태핑 · 트레이닝", "오픈 마케팅 · PR 조율", "오픈 이후 운영 지표 리뷰"],
      },
    ],
  },
  en: {
    eyebrow: "Services",
    title: "The Right Strategy. The Right Partners. The Right Start.",
    subtitle: "Entering the U.S. takes more than a market plan. It takes the right market, the right structure, the right partners, and the right decisions at every stage. K Bridge brings those pieces together under one team, from the first market assessment through site selection, setup, opening, and beyond.",
    why: "Why it matters",
    pillars: [
      {
        en: "Market Research & Strategy", title: "Market Research & Strategy", icon: Compass,
        tagline: "Start with the right market. Build the right plan.",
        body: "We evaluate market, category, competition, and customer fit to find where your brand has the strongest opportunity, then validate it in the field.",
        why: "The U.S. is not one market. Consumer behavior, competition, costs, regulations, and real estate can vary dramatically from one market to another. Choosing the right first market and entry model can shape your growth for years to come.",
        items: ["Market, competitor, and trade area analysis", "Category and regional opportunity assessment", "Entry model evaluation: Direct, JV, or Franchise", "Financial modeling and capital planning"],
      },
      {
        en: "Local Network & Partner Connections", title: "Local Network & Partner Connections", icon: Network,
        tagline: "The right local relationships can change the outcome.",
        body: "We connect you with vetted U.S. professionals and operating partners, from attorneys and accountants to contractors and suppliers, before you need them.",
        why: "Building a reliable local network from scratch can take months. More importantly, the wrong partner can create delays, unnecessary costs, and problems that are difficult to unwind. K Bridge helps you start with relationships that have already been vetted.",
        items: ["Legal and accounting introductions", "Contractor and supplier connections", "Local partner sourcing and screening", "Targeted introductions as needs arise"],
      },
      {
        en: "Business & Entity Setup", title: "Business & Entity Setup", icon: Landmark,
        tagline: "Build the foundation for where you want to go.",
        body: "We help coordinate your U.S. entity setup around your expansion plans, working alongside legal and accounting partners from formation through licensing.",
        why: "Decisions made at the beginning can affect taxes, ownership, investment, liability, and future expansion. We help you make those decisions with the next several years in mind.",
        items: ["Entity formation and registration", "EIN and business registration", "Coordination with legal and accounting partners", "Permits and licensing", "Vendor and opening readiness"],
      },
      {
        en: "Commercial Real Estate & Site Selection", title: "Commercial Real Estate & Site Selection", icon: Building2,
        tagline: "Find the location that makes business sense.",
        body: "We evaluate sites for market fit and business potential, then guide lease negotiations through to final site selection.",
        why: "Real estate is often one of the largest commitments a growing brand makes in the U.S. The right site and the right lease structure can have a meaningful impact on long-term profitability.",
        items: ["Site selection and market analysis", "Trade area and customer analysis", "Lease review and commercial terms", "NNN, CAM, TI, and exclusive-use considerations", "Landlord negotiation and term optimization", "Final site selection"],
      },
      {
        en: "Franchise Development", title: "Franchise Development", icon: Store,
        tagline: "Turn your brand into a franchise built for the U.S.",
        body: "We help you build a U.S.-appropriate franchise structure, coordinate FDD preparation and state registration, and identify local franchise partners.",
        why: "U.S. franchising operates within both federal and state regulatory frameworks. Building the structure correctly from the beginning creates a stronger foundation for growth while protecting the brand as the system expands.",
        items: ["U.S. franchise strategy and model development", "FDD preparation coordination", "State registration coordination", "Master franchise model evaluation", "Franchise partner sourcing", "Local franchisee introductions"],
      },
      {
        en: "Store Opening & Operations", title: "Store Opening & Operations", icon: Rocket,
        tagline: "Get open. Then make it work.",
        body: "We stay involved through buildout, staffing, training, and opening marketing, then review performance with you to help stabilize the business.",
        why: "The first 90 days can reveal what is working, what is not, and where adjustments are needed. Staying close to the business after opening helps identify issues early and build a stronger foundation for the next location.",
        items: ["Buildout and vendor coordination", "Staffing and training support", "Opening marketing and PR", "Operational coordination", "Post-opening performance review", "90-day stabilization support"],
      },
    ],
  },
};

export default function Services() {
  const { lang } = useLang();
  const t = CONTENT[lang];
  return (
    <div>
      <PageHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

      <section className="bg-[color:var(--kb-bone)] pt-10 md:pt-14 pb-20 md:pb-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <FadeUp key={i} delay={i * 0.05} className="h-full">
                  <div data-testid={`service-pillar-${i}`} className="bg-white border border-[color:var(--kb-border)] p-8 md:p-10 h-full flex flex-col hover:-translate-y-1 hover:border-[color:var(--kb-gold)] hover:shadow-[0_28px_60px_-20px_rgba(5,9,20,0.2)] transition-all duration-500">
                    <div className="flex items-start justify-between">
                      <Icon size={26} strokeWidth={1.2} className="text-[color:var(--kb-gold)]" />
                      <span className="text-[9px] tracking-[0.3em] uppercase text-[color:var(--kb-muted)]/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-serif-kr text-2xl md:text-3xl font-light mt-10 leading-tight">
                      <MaskedLineInView>{p.title}</MaskedLineInView>
                    </h3>
                    {p.tagline && (
                      <p className="mt-2 text-[15px] md:text-base font-medium text-[color:var(--kb-text)]/90 leading-snug">
                        {p.tagline}
                      </p>
                    )}
                    <p className="mt-4 text-[14px] text-[color:var(--kb-text)]/75 leading-[1.8]">{p.body}</p>
                    <div className="mt-6 pl-5 border-l-2 border-[color:var(--kb-gold)]/40">
                      <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-gold)] mb-2">{t.why}</div>
                      <p className="text-[14px] text-[color:var(--kb-text)]/70 leading-[1.8]">{p.why}</p>
                    </div>
                    <ul className="space-y-2 pt-6 border-t border-[color:var(--kb-border)] mt-6">
                      {p.items.map((it, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-[color:var(--kb-text)]/85">
                          <span className="text-[color:var(--kb-gold)] mt-1">—</span>
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--kb-ink)] text-white py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 text-center">
          <FadeUp>
            <div className="inline-flex items-center gap-4 mb-8">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[color:var(--kb-gold)] text-[color:var(--kb-gold)] text-[11px]">
                07
              </span>
              <span className="text-[12px] tracking-[0.35em] uppercase text-[color:var(--kb-gold)]">
                {lang === "ko" ? "다음 단계" : "Next step"}
              </span>
            </div>
            <h2 className="font-serif-kr text-4xl md:text-6xl font-light leading-[1.1] text-balance">
              <MaskedLineInView>
                {lang === "ko" ? "브랜드에 맞는" : "The right service mix"}
              </MaskedLineInView>{" "}
              <MaskedLineInView delay={0.15} className="italic text-[color:var(--kb-gold)]">
                {lang === "ko" ? "서비스 조합을 함께 설계합니다." : "for your brand — designed together."}
              </MaskedLineInView>
            </h2>
            <p className="mt-8 max-w-2xl mx-auto text-lg text-white/70 leading-relaxed">
              {lang === "ko"
                ? "무료 상담에서 브랜드의 현재 위치와 목표를 듣고, 다음 단계를 함께 그려봅니다."
                : "In a free consultation, we listen for where your brand stands today and where it's going — then sketch the next step together."}
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                data-testid="services-cta-consult"
                className="inline-flex items-center gap-3 bg-[color:var(--kb-gold)] text-[color:var(--kb-ink)] px-10 py-5 text-sm tracking-[0.25em] uppercase hover:bg-[color:var(--kb-champagne)] transition-colors"
              >
                {lang === "ko" ? "무료 상담 예약" : "Book a consultation"} <ArrowUpRight size={16} />
              </Link>
              <a
                href="mailto:contact@k-bridge-partners.com"
                data-testid="services-cta-email"
                className="inline-flex items-center gap-3 text-white/80 border border-[color:var(--kb-border)] px-8 py-5 text-sm tracking-[0.25em] uppercase hover:text-[color:var(--kb-gold)] hover:border-[color:var(--kb-gold)] transition-colors"
              >
                {lang === "ko" ? "이메일로 문의" : "Email us"}
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
