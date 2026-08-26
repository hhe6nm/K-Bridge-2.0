import PageHeader from "@/components/PageHeader";
import { FadeUp } from "@/components/MaskedReveal";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
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
    title: "Eight Stages, One Standard.",
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

  return (
    <div>
      <PageHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

      <section className="bg-[color:var(--kb-bone)] py-24 md:py-32">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <ol className="relative">
              {/* connecting line */}
              <div className="hidden md:block absolute left-6 top-6 bottom-6 w-px bg-[color:var(--kb-border)]" />

              {t.steps.map((s, i) => (
                <li
                  key={i}
                  data-testid={`process-step-${i}`}
                  className="relative pb-14 md:pb-16 last:pb-0 md:pl-20"
                >
                  {/* number marker */}
                  <div className="hidden md:flex absolute left-0 top-0 w-12 h-12 rounded-full bg-white border border-[color:var(--kb-border)] items-center justify-center z-10">
                    <span className="text-[13px] tracking-[0.1em] text-[color:var(--kb-gold)] font-medium">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="text-[10px] tracking-[0.35em] uppercase text-[color:var(--kb-gold)] mb-3 md:hidden">
                    {t.stepLabel} {String(i + 1).padStart(2, "0")}
                  </div>

                  <div className="bg-white border border-[color:var(--kb-border)] p-8 md:p-10">
                    <div className="hidden md:block text-[10px] tracking-[0.35em] uppercase text-[color:var(--kb-gold)] mb-3">
                      {t.stepLabel} {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-10">
                      <h3 className="font-serif-kr text-2xl md:text-3xl font-light leading-tight md:max-w-[280px]">
                        {s.title.split(" & ").map((part, idx, arr) => (
                          <span key={idx}>
                            {idx === 0 ? `${part} &` : part}
                            {idx < arr.length - 1 && <br />}
                          </span>
                        ))}
                      </h3>
                      <p className="text-base md:text-lg text-[color:var(--kb-text)]/80 leading-[1.85] md:flex-1">
                        {s.body}
                      </p>
                    </div>
                    <div className="mt-6 inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[color:var(--kb-muted)] border border-[color:var(--kb-border)] px-4 py-2">
                      <Clock size={14} strokeWidth={1.5} className="text-[color:var(--kb-gold)]" />
                      {t.timelineLabel} · {s.timeline}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </FadeUp>

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
