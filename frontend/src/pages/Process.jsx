import PageHeader from "@/components/PageHeader";
import { FadeUp } from "@/components/MaskedReveal";
import { Link } from "react-router-dom";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Clock } from "lucide-react";
import { useLang } from "@/lib/i18n";

const CONTENT = {
  ko: {
    eyebrow: "Our Process",
    title: "다섯 단계, 하나의 여정.",
    subtitle: "초기 상담부터 매장 오픈 이후 안정화까지, 미국 진출의 전 과정을 다섯 단계로 구조화했습니다. 각 단계의 진행 기간은 브랜드 상황에 따라 조정됩니다.",
    timelineLabel: "예상 기간",
    placeholderNote: "* 기간은 브랜드 상황에 따라 조정됩니다. 실제 프로젝트 킥오프 시 상세 일정을 함께 확정합니다.",
    cta: "여정 시작하기",
    steps: [
      {
        title: "초기 상담 & 시장 진단",
        timeline: "약 1–2주",
        body: "브랜드의 사업 모델과 목표 시장을 파악하고, 미국 진출 가능성과 방향성을 함께 진단합니다. 타겟 지역, 예상 비용, 진출 방식(직진출/프랜차이즈 등)에 대한 초기 그림을 그립니다.",
      },
      {
        title: "법인 설립 & 인허가",
        timeline: "약 2–4주",
        body: "주(state)별로 다른 법인 형태와 세제를 검토해 최적의 구조를 설계하고, 설립 및 필요한 인허가 절차를 지원합니다.",
      },
      {
        title: "상업용 부동산",
        timeline: "약 4–8주",
        body: "타겟 상권을 분석하고 후보 입지를 조사한 뒤, 임대차 조건 협상까지 함께 진행합니다. 계약서 이면의 관행과 임대인 심리를 반영해 불리한 조건을 사전에 걸러냅니다.",
      },
      {
        title: "프랜차이즈 개발 & FDD 준비",
        timeline: "약 4–6주",
        body: "프랜차이즈로 확장할 경우, 미국 프랜차이즈 규제(FDD)에 맞춘 문서 준비와 등록 절차를 지원합니다.",
      },
      {
        title: "매장 오픈 & 초기 운영 지원",
        timeline: "오픈 전후 지속",
        body: "오픈 전후 운영 셋업, 초기 스태핑, 현지 규정 준수 등 실제 매장이 안정적으로 자리잡을 때까지 함께합니다.",
      },
    ],
  },
  en: {
    eyebrow: "Our Process",
    title: "Five stages, one journey.",
    subtitle: "From first consultation to post-opening stabilization, the U.S. entry journey structured into five clear stages. Timelines flex to your brand's situation.",
    timelineLabel: "Estimated timeline",
    placeholderNote: "* Timelines flex with your brand's situation. Detailed schedules are locked in at project kickoff.",
    cta: "Start your journey",
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
  return (
    <div>
      <PageHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

      <section className="bg-[color:var(--kb-bone)] py-24 md:py-32">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <Accordion type="single" collapsible defaultValue="step-0" className="w-full">
              {t.steps.map((s, i) => (
                <AccordionItem key={i} value={`step-${i}`} className="border-b border-[color:var(--kb-border)]" data-testid={`process-step-${i}`}>
                  <AccordionTrigger className="py-8 hover:no-underline group">
                    <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-left">
                      <div className="flex items-start gap-6">
                        <span className="mt-2 w-8 h-px bg-[color:var(--kb-gold)]" />
                        <span className="font-serif-kr text-2xl md:text-3xl font-light text-[color:var(--kb-ink)] leading-tight group-hover:text-[color:var(--kb-gold)] transition-colors">
                          {s.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--kb-muted)]">
                        <Clock size={14} strokeWidth={1.5} className="text-[color:var(--kb-gold)]" />
                        <span>{t.timelineLabel} · {s.timeline}</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-10 pl-14 md:pl-16">
                    <p className="text-[15px] md:text-base text-[color:var(--kb-text)]/80 leading-[1.9] max-w-3xl">
                      {s.body}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
