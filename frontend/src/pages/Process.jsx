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
      { title: "법인 설립 & 인허가", timeline: "약 4–6주",
        body: "설립 주(State) 선택부터 법인 등록, EIN 발급까지 진행합니다. 해외 소유 법인의 경우 EIN 발급에 서류 제출 절차가 추가되어 국내 설립보다 시간이 더 소요됩니다. 이후 필요한 업종별 인허가까지 함께 확인합니다." },
      { title: "상업용 부동산", timeline: "약 2–4개월 (상권에 따라 변동)",
        body: "상권 리서치와 후보지 실사를 거쳐 LOI(입점 의향서) 협상, 최종 임대차 계약까지 진행합니다. 5개 프로세스 중 가장 변수가 많은 단계로, 상권 경쟁도와 임대인 협상에 따라 기간이 크게 달라집니다." },
      { title: "프랜차이즈 개발 & FDD 준비", timeline: "약 6–10주 (등록 주 수에 따라 변동)",
        body: "미국형 FDD 문서를 준비하고, 진출 대상 주(State)에 등록합니다. 등록 주에 따라 검토 기간이 다르며, 여러 주에 동시 등록할 경우 기간이 늘어날 수 있습니다." },
      { title: "매장 오픈 & 초기 운영 지원", timeline: "오픈 준비 약 4–8주 + 오픈 후 90일 안정화",
        body: "시공 및 스태핑 준비를 마치고 오픈합니다. 오픈 이후에도 초기 90일간 운영 지표를 함께 검토하며 안정화를 지원합니다." },
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
      { title: "Entity Formation & Permits", timeline: "~ 4–6 weeks",
        body: "State selection, entity registration, and EIN issuance. For foreign-owned entities, EIN issuance requires additional filings (no online SSN/ITIN path), which extends the timeline vs. domestic formation. Industry-specific permits are handled next." },
      { title: "Commercial Real Estate", timeline: "~ 2–4 months (market-dependent)",
        body: "Trade area research, site visits, LOI negotiation, and final lease execution. This is the most variable stage — timelines shift meaningfully based on market competition and landlord negotiation dynamics." },
      { title: "Franchise Development & FDD", timeline: "~ 6–10 weeks (state-count dependent)",
        body: "We prepare the U.S. FDD documentation and register in your target states. Review timelines vary by state; multi-state registration extends the overall timeline." },
      { title: "Store Opening & Early Ops", timeline: "~ 4–8 weeks opening prep + 90-day stabilization",
        body: "Buildout, staffing, and opening execution. We then stay through the first 90 days post-opening, reviewing operational metrics to support stabilization." },
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
          <div className="hidden md:block">
            <FadeUp>
              <div className="relative">
                <div className="absolute left-0 right-0 top-6 h-px bg-[color:var(--kb-border)]" />
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
