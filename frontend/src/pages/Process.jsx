import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { FadeUp } from "@/components/MaskedReveal";
import { Link } from "react-router-dom";
import { Clock, Plus, Minus } from "lucide-react";
import { useLang } from "@/lib/i18n";

const CONTENT = {
  ko: {
    eyebrow: "Our Process",
    title: "다섯 단계, 하나의 여정.",
    subtitle: "초기 상담부터 매장 오픈 이후 안정화까지, 미국 진출의 전 과정을 다섯 단계로 구조화했습니다. 각 단계의 진행 기간은 브랜드 상황에 따라 조정됩니다.",
    timelineLabel: "예상 기간",
    placeholderNote: "* 기간은 브랜드 상황에 따라 조정됩니다. 실제 프로젝트 킥오프 시 상세 일정을 함께 확정합니다.",
    cta: "여정 시작하기",
    stepLabel: "STEP",
    steps: [
      { title: "초기 상담 & 시장 진단", timeline: "약 1–2주",
        body: "브랜드의 사업 모델과 목표 시장을 파악하고, 미국 진출 가능성과 방향성을 함께 진단합니다. 타겟 지역, 예상 비용, 진출 방식(직진출/프랜차이즈 등)에 대한 초기 그림을 그립니다." },
      { title: "법인 설립 & 인허가", timeline: "약 2–4주",
        body: "주(state)별로 다른 법인 형태와 세제를 검토해 최적의 구조를 설계하고, 설립 및 필요한 인허가 절차를 지원합니다." },
      { title: "상업용 부동산", timeline: "약 4–8주",
        body: "타겟 상권을 분석하고 후보 입지를 조사한 뒤, 임대차 조건 협상까지 함께 진행합니다. 계약서 이면의 관행과 임대인 심리를 반영해 불리한 조건을 사전에 걸러냅니다." },
      { title: "프랜차이즈 개발 & FDD 준비", timeline: "약 4–6주",
        body: "프랜차이즈로 확장할 경우, 미국 프랜차이즈 규제(FDD)에 맞춘 문서 준비와 등록 절차를 지원합니다." },
      { title: "매장 오픈 & 초기 운영 지원", timeline: "오픈 전후 지속",
        body: "오픈 전후 운영 셋업, 초기 스태핑, 현지 규정 준수 등 실제 매장이 안정적으로 자리잡을 때까지 함께합니다." },
    ],
  },
  en: {
    eyebrow: "Our Process",
    title: "Five stages, one journey.",
    subtitle: "From first consultation to post-opening stabilization, the U.S. entry journey structured into five clear stages. Timelines flex to your brand's situation.",
    timelineLabel: "Estimated timeline",
    placeholderNote: "* Timelines flex with your brand's situation. Detailed schedules are locked in at project kickoff.",
    cta: "Start your journey",
    stepLabel: "STEP",
    steps: [
      { title: "Initial Consultation & Market Diagnosis", timeline: "~ 1–2 weeks",
        body: "We understand your business model and target market, and diagnose the shape of your U.S. entry. Early views on target region, ballpark cost, and entry method (direct vs. franchise) are formed here." },
      { title: "Entity Formation & Permits", timeline: "~ 2–4 weeks",
        body: "State-by-state entity structures and tax regimes are compared to design the optimal setup. We support formation and any required permitting." },
      { title: "Commercial Real Estate", timeline: "~ 4–8 weeks",
        body: "We analyze target trade areas, screen candidate sites, and lead lease negotiations — filtering out disadvantageous terms based on landlord behavior we've seen firsthand." },
      { title: "Franchise Development & FDD", timeline: "~ 4–6 weeks",
        body: "If franchising is on the roadmap, we support U.S. FDD documentation and state registration end-to-end." },
      { title: "Store Opening & Early Ops", timeline: "Through opening and beyond",
        body: "Pre- and post-opening operational setup, initial staffing, and compliance — we stay with you until the store is stable." },
    ],
  },
};

export default function Process() {
  const { lang } = useLang();
  const t = CONTENT[lang];
  const [active, setActive] = useState(0);

  return (
    <div>
      <PageHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

      <section className="bg-[color:var(--kb-bone)] py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          {/* Desktop / tablet: horizontal timeline rail */}
          <div className="hidden md:block">
            <FadeUp>
              <div className="relative">
                {/* rail */}
                <div className="absolute left-0 right-0 top-6 h-px bg-[color:var(--kb-border)]" />
                {/* progress */}
                <div
                  className="absolute left-0 top-6 h-px bg-[color:var(--kb-gold)] transition-[width] duration-700 ease-out"
                  style={{ width: `${((active + 1) / t.steps.length) * 100}%` }}
                />

                <div
                  className="relative grid gap-2"
                  style={{ gridTemplateColumns: `repeat(${t.steps.length}, minmax(0, 1fr))` }}
                >
                  {t.steps.map((s, i) => {
                    const isActive = i === active;
                    const isPast = i < active;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActive(i)}
                        data-testid={`process-step-${i}`}
                        aria-pressed={isActive}
                        className="text-left group focus:outline-none"
                      >
                        <div className="relative h-12 flex items-center">
                          <span
                            className={`block w-3 h-3 rounded-full transition-all duration-500 ${
                              isActive
                                ? "bg-[color:var(--kb-gold)] ring-8 ring-[color:var(--kb-gold)]/15 scale-125"
                                : isPast
                                ? "bg-[color:var(--kb-gold)]"
                                : "bg-[color:var(--kb-border)] group-hover:bg-[color:var(--kb-gold)]/60"
                            }`}
                          />
                        </div>
                        <div className={`mt-4 text-[10px] tracking-[0.35em] uppercase transition-colors ${
                          isActive ? "text-[color:var(--kb-gold)]" : "text-[color:var(--kb-muted)]"
                        }`}>
                          {t.stepLabel} {String(i + 1).padStart(2, "0")}
                        </div>
                        <div className={`mt-2 font-serif-kr text-lg leading-tight max-w-[220px] transition-colors ${
                          isActive ? "text-[color:var(--kb-ink)]" : "text-[color:var(--kb-ink)]/60 group-hover:text-[color:var(--kb-ink)]/90"
                        }`}>
                          {s.title}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </FadeUp>

            {/* Active step detail panel */}
            <div className="mt-16 min-h-[240px]">
              {t.steps.map((s, i) => (
                <div
                  key={i}
                  aria-hidden={i !== active}
                  data-testid={`process-detail-${i}`}
                  className={`transition-all duration-500 ${
                    i === active
                      ? "opacity-100 translate-y-0 pointer-events-auto relative"
                      : "opacity-0 pointer-events-none absolute translate-y-4"
                  }`}
                >
                  {i === active && (
                    <div className="grid grid-cols-12 gap-10 bg-white border border-[color:var(--kb-border)] p-10 md:p-14">
                      <div className="col-span-12 md:col-span-4">
                        <div className="text-[10px] tracking-[0.35em] uppercase text-[color:var(--kb-gold)] mb-4">
                          {t.stepLabel} {String(i + 1).padStart(2, "0")}
                        </div>
                        <h3 className="font-serif-kr text-3xl md:text-4xl font-light leading-tight">{s.title}</h3>
                        <div className="mt-6 inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--kb-muted)] border border-[color:var(--kb-border)] px-4 py-2">
                          <Clock size={14} strokeWidth={1.5} className="text-[color:var(--kb-gold)]" />
                          {t.timelineLabel} · {s.timeline}
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-8">
                        <p className="text-lg text-[color:var(--kb-text)]/80 leading-[1.9]">{s.body}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: vertical timeline with expandable items */}
          <div className="md:hidden">
            <ol className="relative border-l border-[color:var(--kb-border)] ml-3">
              {t.steps.map((s, i) => {
                const isActive = i === active;
                return (
                  <li key={i} className="pl-8 pb-8 relative">
                    <span
                      className={`absolute -left-[7px] top-1 w-3 h-3 rounded-full ${
                        isActive ? "bg-[color:var(--kb-gold)] ring-4 ring-[color:var(--kb-gold)]/20" : "bg-[color:var(--kb-border)]"
                      }`}
                    />
                    <button
                      onClick={() => setActive(isActive ? -1 : i)}
                      className="w-full text-left"
                      data-testid={`process-step-mobile-${i}`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-gold)]">
                            {t.stepLabel} {String(i + 1).padStart(2, "0")} · {s.timeline}
                          </div>
                          <h3 className="mt-2 font-serif-kr text-xl font-light leading-tight text-[color:var(--kb-ink)]">
                            {s.title}
                          </h3>
                        </div>
                        {isActive ? <Minus size={18} className="text-[color:var(--kb-gold)]" /> : <Plus size={18} className="text-[color:var(--kb-muted)]" />}
                      </div>
                    </button>
                    <div className={`overflow-hidden transition-[max-height,margin] duration-500 ease-out ${
                      isActive ? "max-h-96 mt-4" : "max-h-0"
                    }`}>
                      <p className="text-[15px] text-[color:var(--kb-text)]/80 leading-[1.85]">{s.body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="mt-10 text-xs text-[color:var(--kb-muted)] italic">{t.placeholderNote}</div>

          <div className="mt-16 text-center">
            <Link to="/contact" className="inline-flex items-center gap-3 bg-[color:var(--kb-ink)] text-white px-10 py-4 text-sm tracking-[0.25em] uppercase hover:bg-[color:var(--kb-gold)] hover:text-[color:var(--kb-ink)] transition-colors">
              {t.cta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
