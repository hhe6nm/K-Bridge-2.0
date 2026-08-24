import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { FadeUp } from "@/components/MaskedReveal";
import { Link } from "react-router-dom";
import { Clock, Plus, Minus } from "lucide-react";
import { useLang } from "@/lib/i18n";

const CONTENT = {
  ko: {
    eyebrow: "Our Process",
    title: "여덟 단계, 하나의 여정.",
    subtitle: "초기 상담부터 사업 확장까지, 미국 진출의 전 과정을 여덟 단계로 구조화했습니다. 각 단계의 진행 기간은 브랜드 상황에 따라 조정됩니다.",
    timelineLabel: "예상 기간",
    placeholderNote: "* 기간은 브랜드 상황에 따라 조정됩니다. 실제 프로젝트 킥오프 시 상세 일정을 함께 확정합니다.",
    cta: "여정 시작하기",
    stepLabel: "STEP",
    steps: [
      { title: "초기 상담 & 시장성 검토", timeline: "약 1–2주",
        body: "브랜드 및 사업 모델을 분석하고, 미국 시장 진출 목표를 확인합니다. 진출 가능성과 경쟁력을 함께 평가하고 예상 투자 규모와 일정을 초기 검토합니다." },
      { title: "시장 조사 & 진출 전략 수립", timeline: "약 3–4주",
        body: "미국 시장 및 소비자, 경쟁 브랜드를 분석하고 지역별 상권을 조사합니다. 직영점, 마스터 프랜차이즈, 합작 투자(JV), 법인 설립 등 최적의 진출 방식을 함께 결정합니다." },
      { title: "법인 설립 & 사업 준비", timeline: "약 4–6주",
        body: "미국 법인을 설립하고 EIN을 발급받으며, 은행 계좌 개설을 지원합니다. 해외 소유 법인의 경우 서류 제출 절차가 추가되어 시간이 더 소요될 수 있습니다. 상표 및 브랜드 보호 검토, 사업자 등록과 인허가 준비도 함께 진행합니다." },
      { title: "입지 선정 & 부동산 확보", timeline: "약 8–16주 (상권에 따라 변동)",
        body: "목표 지역을 선정하고 상권 및 유동인구를 분석하여 임대 물건을 발굴합니다. 임대 조건 협상부터 계약 체결까지, 5개 프로세스 중 가장 변수가 많은 단계로 상권 경쟁도와 임대인 협상에 따라 기간이 크게 달라집니다." },
      { title: "인허가 & 매장 구축", timeline: "약 12–24주 (지역별 인허가 일정에 따라 변동)",
        body: "건축 및 설계를 검토하고 시공업체를 선정합니다. 각종 허가 및 승인 절차와 장비·공급업체 연결, 운영 시스템 구축까지 진행합니다. 건축 허가와 검사 일정이 지역마다 크게 달라 전체 프로세스 중 가장 오래 걸리는 단계입니다." },
      { title: "인력 채용 & 운영 준비", timeline: "약 4–6주 (매장 구축 단계와 병행 진행)",
        body: "현지 인력 채용을 지원하고 운영 매뉴얼을 현지화합니다. 직원 교육과 POS 및 운영 시스템 구축까지, 오픈 전 필요한 준비를 마무리합니다." },
      { title: "마케팅 & 오픈 지원", timeline: "약 3–4주",
        body: "현지 마케팅 전략을 수립하고 SNS 및 디지털 마케팅, 오프닝 이벤트를 기획합니다. 지역 커뮤니티 홍보를 통해 성공적인 매장 오픈을 지원합니다." },
      { title: "사업 확장 & 프랜차이즈 개발", timeline: "오픈 이후 지속 지원",
        body: "운영 성과를 분석하고 추가 매장 개발과 가맹사업 확장 전략을 수립합니다. 투자자 및 사업 파트너 연결을 통해 지속적인 성장을 지원합니다." },
    ],
  },
  en: {
    eyebrow: "Our Process",
    title: "Eight stages, one journey.",
    subtitle: "From first consultation to business expansion, the U.S. entry journey structured into eight clear stages. Timelines flex to your brand's situation.",
    timelineLabel: "Estimated timeline",
    placeholderNote: "* Timelines flex with your brand's situation. Detailed schedules are locked in at project kickoff.",
    cta: "Start your journey",
    stepLabel: "STEP",
    steps: [
      { title: "Initial Consultation & Feasibility Review", timeline: "~ 1–2 weeks",
        body: "We analyze your brand and business model and confirm your U.S. market entry goals. Entry feasibility and competitiveness are assessed together, alongside an initial review of investment scale and timeline." },
      { title: "Market Research & Entry Strategy", timeline: "~ 3–4 weeks",
        body: "We analyze the U.S. market, target consumers, and competing brands, and research trade areas by region. Together we decide the optimal entry method — direct operation, master franchise, joint venture, or entity formation." },
      { title: "Entity Formation & Business Setup", timeline: "~ 4–6 weeks",
        body: "We form your U.S. entity, obtain your EIN, and support bank account opening. Foreign-owned entities require additional filings, which can extend this timeline. Trademark and brand protection review, business registration, and permit prep are handled in parallel." },
      { title: "Site Selection & Real Estate", timeline: "~ 8–16 weeks (market-dependent)",
        body: "We select target regions, analyze trade areas and foot traffic, and source available properties. From lease negotiation through contract execution, this is the most variable stage — timelines shift meaningfully based on market competition and landlord negotiation." },
      { title: "Permitting & Buildout", timeline: "~ 12–24 weeks (varies by local permitting timelines)",
        body: "We review architecture and design, and select a contractor. Permits and approvals, equipment and supplier connections, and operating systems are built out. Permit and inspection timelines vary widely by jurisdiction, making this the longest stage overall." },
      { title: "Staffing & Operational Readiness", timeline: "~ 4–6 weeks (runs in parallel with buildout)",
        body: "We support local hiring and localize your operations manual. Staff training and POS/operating systems setup round out pre-opening preparation." },
      { title: "Marketing & Opening Support", timeline: "~ 3–4 weeks",
        body: "We build a local marketing strategy and plan social/digital marketing and an opening event. Community outreach supports a strong store opening." },
      { title: "Expansion & Franchise Development", timeline: "Ongoing, post-launch",
        body: "We analyze operating performance and build out plans for additional locations and franchise expansion. Investor and business partner connections support continued growth." },
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

