import { useMemo, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { FadeUp } from "@/components/MaskedReveal";
import { Link } from "react-router-dom";
import { Plus, Minus } from "lucide-react";
import { useLang } from "@/lib/i18n";

// Categories map to service lines (single source across UI).
const CATEGORIES = ["all", "market-entry", "commercial-real-estate", "franchise", "opening"];

const CATEGORY_LABELS = {
  ko: {
    all: "전체",
    "market-entry": "시장 진입",
    "commercial-real-estate": "상업 부동산",
    franchise: "프랜차이즈",
    opening: "매장 오픈",
  },
  en: {
    all: "All",
    "market-entry": "Market Entry",
    "commercial-real-estate": "Commercial Real Estate",
    franchise: "Franchise",
    opening: "Store Opening",
  },
};

const CASES = [
  { key: "case-01", category: "market-entry",
    ko: { title: "F&B 프랜차이즈 · 서부 진출", region: "West Coast",
      headline: "국내 성공 방정식을 미국 서부에 맞게 재설계",
      challenge: "브랜드는 국내에서 검증된 프랜차이즈 모델을 갖고 있었지만, 미국 서부 특성상 임대료 · 인력 · 소비자 관습이 크게 달라 초기 매장 위치와 가격 전략을 재정의해야 했습니다.",
      approach: "K Bridge는 후보 상권 5개를 스크리닝하고, 3개 상권에서 실사와 소비자 조사를 진행해 최적 진입 위치를 확정했습니다. 이후 재무 시뮬레이션을 통해 초기 매장의 가격 · 메뉴 구성을 재설계했습니다.",
      outcome: "첫 매장 오픈 후 초기 90일 매출이 초기 목표 대비 상회 (구체 수치 공개 예정).",
      status: "Case in progress · full case study 공개 예정" },
    en: { title: "F&B Franchise · West Coast Entry", region: "West Coast",
      headline: "Reengineering a domestic playbook for the U.S. West Coast",
      challenge: "The brand had a proven domestic franchise model, but U.S. West Coast rent, labor, and consumer behavior forced a re-design of the initial store location and pricing strategy.",
      approach: "K Bridge screened five candidate trade areas, ran field surveys in three, and finalized the entry site. Financial simulation then reset pricing and menu construction for the first store.",
      outcome: "First-90-day sales exceeded initial target after opening (specific figures to be released).",
      status: "Case in progress · full case study coming soon" }},
  { key: "case-02", category: "commercial-real-estate",
    ko: { title: "리테일 브랜드 · 뉴욕 매장 임대차", region: "East Coast",
      headline: "임대차 조건 재협상으로 유리한 초기 조건 확보",
      challenge: "브랜드는 뉴욕에서 이미 임대차 조건 초안을 받은 상태였지만, NNN · CAM · Personal Guaranty 등 다수의 리스크가 발견되었습니다.",
      approach: "K Bridge는 조건을 항목별로 재분석하고, 임대인과의 재협상을 통해 TI 예산 확보, Good Guy Guaranty 구조 설계, 초기 무상 기간 확보를 진행했습니다.",
      outcome: "초기 년도 총 임차 비용을 원안 대비 상당 폭 절감 (수치 공개 예정).",
      status: "Case in progress" },
    en: { title: "Retail Brand · New York Lease", region: "East Coast",
      headline: "Renegotiating a lease into a favorable starting position",
      challenge: "The brand had a draft NYC lease in hand, but the terms surfaced multiple risks — NNN, CAM, personal guaranty exposure.",
      approach: "K Bridge re-analyzed each clause, then led renegotiation to secure a TI budget, restructure into a Good Guy Guaranty, and add rent-free ramp period.",
      outcome: "Materially reduced first-year occupancy cost vs. the original draft (figures to be released).",
      status: "Case in progress" }},
  { key: "case-03", category: "franchise",
    ko: { title: "K-Beauty · 마스터 프랜차이지 구조 설계", region: "Multi-city",
      headline: "미국형 프랜차이즈 구조로 자본과 통제권 균형",
      challenge: "브랜드는 미국 다수 도시로의 빠른 확장을 원했지만, 자본과 현지 오퍼레이션 능력이 부족했습니다. 국내형 가맹 구조 그대로는 리스크가 컸습니다.",
      approach: "K Bridge는 지역별 마스터 프랜차이지 모델을 설계하고, FDD 문서와 주 등록을 파트너 로펌과 준비했습니다. 이후 3개 지역에서 검증된 로컬 파트너를 소개했습니다.",
      outcome: "지역별 매장 오픈을 순차 진행 중 (상세 결과 공개 예정).",
      status: "Ongoing engagement" },
    en: { title: "K-Beauty · Master Franchisee Structure", region: "Multi-city",
      headline: "A U.S.-native franchise structure balancing capital and control",
      challenge: "The brand wanted rapid multi-city expansion but lacked both capital and local operating capacity. The Korean franchise structure carried unacceptable risk when transplanted.",
      approach: "K Bridge designed a regional master franchisee model, prepared FDD documents and state registrations with a partner law firm, then introduced vetted local partners across three regions.",
      outcome: "Regional openings underway (detailed results to be released).",
      status: "Ongoing engagement" }},
  { key: "case-04", category: "opening",
    ko: { title: "카페 컨셉 · 서부 첫 매장 오픈", region: "West Coast",
      headline: "시공 · 스태핑 · 오픈 마케팅의 병렬 실행",
      challenge: "브랜드는 첫 매장 오픈까지 6개월의 타이트한 일정과 제한된 예산으로 진행해야 했습니다.",
      approach: "K Bridge는 시공 파트너 3개를 병렬 견적, 스태핑 · 트레이닝 · 오픈 마케팅을 동시 진행하도록 조율했습니다. 예산 초과 리스크가 있는 항목을 사전에 식별했습니다.",
      outcome: "일정 내 오픈 완료. 오픈 초기 60일 매출은 브랜드 자체 목표를 상회.",
      status: "Case in progress" },
    en: { title: "Café Concept · West Coast First Store", region: "West Coast",
      headline: "Parallel execution of buildout, staffing, and opening marketing",
      challenge: "The brand had a tight six-month opening window and a constrained budget.",
      approach: "K Bridge sourced three parallel buildout quotes and coordinated staffing, training, and opening marketing concurrently — identifying budget-overrun risks in advance.",
      outcome: "Opened on schedule. First-60-day sales exceeded the brand's own target.",
      status: "Case in progress" }},
];

export default function Success() {
  const { lang } = useLang();
  const [filter, setFilter] = useState("all");
  const [openKey, setOpenKey] = useState(null);
  const catLabels = CATEGORY_LABELS[lang];

  const filtered = useMemo(() => {
    if (filter === "all") return CASES;
    return CASES.filter((c) => c.category === filter);
  }, [filter]);

  const copy = lang === "ko"
    ? {
        eyebrow: "Success Stories",
        title: "사례가 곧 증거입니다.",
        subtitle: "실제 브랜드의 미국 진출 여정. 상세 사례는 순차적으로 공개될 예정입니다.",
        filterLabel: "필터",
        challenge: "Challenge", approach: "Approach", outcome: "Outcome",
        readMore: "자세히 보기", collapse: "닫기",
        empty: "선택하신 카테고리의 사례가 아직 준비 중입니다.",
        footer: "실제 사례는 클라이언트의 프라이버시를 존중하며 순차적으로 업데이트됩니다.",
        cta: "사례 자료 요청",
      }
    : {
        eyebrow: "Success Stories",
        title: "Case studies as evidence.",
        subtitle: "Real brands' U.S. market entry journeys. Detailed case studies will be published incrementally.",
        filterLabel: "Filter",
        challenge: "Challenge", approach: "Approach", outcome: "Outcome",
        readMore: "Read more", collapse: "Collapse",
        empty: "Case studies in this category are still being prepared.",
        footer: "Case studies are published incrementally to respect client privacy.",
        cta: "Request case studies",
      };

  return (
    <div>
      <PageHeader eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />

      <section className="bg-[color:var(--kb-bone)] py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          {/* Filter bar */}
          <FadeUp>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-12 border-b border-[color:var(--kb-border)] pb-6">
              <div className="text-[10px] tracking-[0.35em] uppercase text-[color:var(--kb-gold)] shrink-0">
                {copy.filterLabel}
              </div>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => {
                  const active = filter === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => { setFilter(c); setOpenKey(null); }}
                      data-testid={`success-filter-${c}`}
                      className={`text-[11px] tracking-[0.25em] uppercase px-4 py-2 border transition-colors ${
                        active
                          ? "bg-[color:var(--kb-ink)] text-white border-[color:var(--kb-ink)]"
                          : "border-[color:var(--kb-border)] text-[color:var(--kb-muted)] hover:border-[color:var(--kb-gold)] hover:text-[color:var(--kb-ink)]"
                      }`}
                    >
                      {catLabels[c]}
                    </button>
                  );
                })}
              </div>
            </div>
          </FadeUp>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-[color:var(--kb-muted)]">{copy.empty}</div>
          )}

          <div className="space-y-4">
            {filtered.map((c, i) => {
              const item = c[lang];
              const isOpen = openKey === c.key;
              return (
                <FadeUp key={c.key} delay={i * 0.05}>
                  <article
                    data-testid={`success-case-${c.key}`}
                    className={`bg-white border transition-all duration-500 ${
                      isOpen ? "border-[color:var(--kb-gold)]" : "border-[color:var(--kb-border)] hover:border-[color:var(--kb-gold)]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenKey(isOpen ? null : c.key)}
                      className="w-full text-left p-8 md:p-10"
                      data-testid={`success-toggle-${c.key}`}
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-gold)]">
                            <span>{item.region}</span>
                            <span className="w-px h-3 bg-[color:var(--kb-border)]" />
                            <span className="text-[color:var(--kb-muted)]">{catLabels[c.category]}</span>
                          </div>
                          <h3 className="mt-3 font-serif-kr text-2xl md:text-3xl font-light leading-tight">{item.title}</h3>
                          <p className="mt-3 text-[15px] text-[color:var(--kb-text)]/80 leading-relaxed">
                            {item.headline}
                          </p>
                        </div>
                        <div className="pt-2 shrink-0">
                          {isOpen ? <Minus size={20} className="text-[color:var(--kb-gold)]" /> : <Plus size={20} className="text-[color:var(--kb-muted)]" />}
                        </div>
                      </div>
                    </button>

                    <div className={`overflow-hidden transition-[max-height] duration-700 ease-out ${
                      isOpen ? "max-h-[900px]" : "max-h-0"
                    }`}>
                      <div className="px-8 md:px-10 pb-10 pt-2 border-t border-[color:var(--kb-border)] grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                          <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-gold)] mb-3">{copy.challenge}</div>
                          <p className="text-[14px] text-[color:var(--kb-text)]/80 leading-[1.85]">{item.challenge}</p>
                        </div>
                        <div>
                          <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-gold)] mb-3">{copy.approach}</div>
                          <p className="text-[14px] text-[color:var(--kb-text)]/80 leading-[1.85]">{item.approach}</p>
                        </div>
                        <div>
                          <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-gold)] mb-3">{copy.outcome}</div>
                          <p className="text-[14px] text-[color:var(--kb-text)]/80 leading-[1.85]">{item.outcome}</p>
                          <div className="mt-4 text-[10px] tracking-[0.25em] uppercase text-[color:var(--kb-muted)] italic">{item.status}</div>
                        </div>
                      </div>
                    </div>
                  </article>
                </FadeUp>
              );
            })}
          </div>

          <div className="mt-20 text-center">
            <p className="text-[color:var(--kb-muted)] max-w-xl mx-auto">{copy.footer}</p>
            <div className="mt-8">
              <Link to="/contact" className="inline-flex items-center gap-2 text-[color:var(--kb-ink)] tick-arrow text-sm tracking-[0.25em] uppercase">{copy.cta}</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
