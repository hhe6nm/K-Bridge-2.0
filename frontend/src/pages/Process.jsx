import PageHeader from "@/components/PageHeader";
import { FadeUp } from "@/components/MaskedReveal";
import { Link } from "react-router-dom";

const STEPS = [
  { num: "01", title: "상담 및 브랜드 분석",
    body: "브랜드의 현재 위치, 미국 진출의 동기, 사용 가능한 자본과 인적 자원을 진단합니다. 이 단계에서 진짜 목표와 감정적 기대치를 분리하는 것이 이후 모든 판단의 기준이 됩니다.",
    side: "left" },
  { num: "02", title: "미국 시장 리서치 및 전략",
    body: "카테고리별 경쟁 지도, 지역별 소비 성향, 진입 방식별 재무 시뮬레이션을 결합해 진입 전략을 확정합니다. 이 단계의 밀도가 이후 자본 효율을 좌우합니다.",
    side: "right" },
  { num: "03", title: "법인 설립 및 셋업",
    body: "설립 주(State), 법인 형태(LLC · C-Corp), 라이센싱, 세제 구조를 향후 확장 시나리오에 맞춰 설계합니다. 지금의 편의보다 5년 뒤의 유연성이 우선입니다.",
    side: "left" },
  { num: "04", title: "상권 분석 및 입지 선정",
    body: "K Bridge의 핵심 역량. 데이터로 후보를 좁히고, 서로 다른 요일과 시간대에 반복 실사를 진행합니다. 이후 임대차 조건과 매출 시뮬레이션을 교차 검증해 부지를 확정합니다.",
    side: "right", feature: true },
  { num: "05", title: "시공 및 오퍼레이션 준비",
    body: "예산과 일정을 지키는 시공 파트너 매칭, 공급망 셋업, 인력 채용, 오픈 마케팅까지 — 오픈 전 모든 실무 라인을 병렬로 조율합니다.",
    side: "left" },
  { num: "06", title: "오픈 및 성장 지원",
    body: "오픈은 끝이 아니라 시작입니다. 첫 90일의 운영 지표를 함께 검토하고, 확장 단계로 넘어갈 준비를 지속 파트너로서 함께합니다.",
    side: "right" },
];

export default function Process() {
  return (
    <div>
      <PageHeader
        chapter="04"
        eyebrow="Our Process"
        title="여섯 단계, 하나의 여정."
        subtitle="상담부터 오픈 이후 성장까지, 미국 진출의 전 과정을 여섯 단계로 구조화했습니다."
      />

      <section className="bg-[color:var(--kb-bone)] py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="relative">
            {/* central line - desktop only */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-[color:var(--kb-border)] -translate-x-1/2" />

            {STEPS.map((s, i) => (
              <FadeUp key={s.num} delay={i * 0.05}>
                <div className={`relative py-12 lg:py-20 grid grid-cols-12 gap-8 items-center`}>
                  {/* node */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
                    <div className={`${s.feature ? "w-6 h-6 bg-[color:var(--kb-gold)]" : "w-3 h-3 bg-[color:var(--kb-ink)]"} rounded-full ring-8 ring-[color:var(--kb-bone)]`} />
                  </div>

                  {s.side === "left" ? (
                    <>
                      <div className="col-span-12 lg:col-span-5 lg:pr-10 lg:text-right">
                        <ProcessCard step={s} />
                      </div>
                      <div className="col-span-12 lg:col-span-5 lg:col-start-8" />
                    </>
                  ) : (
                    <>
                      <div className="col-span-12 lg:col-span-5" />
                      <div className="col-span-12 lg:col-span-5 lg:col-start-8 lg:pl-10">
                        <ProcessCard step={s} />
                      </div>
                    </>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>

          <div className="mt-24 text-center">
            <Link to="/contact" className="inline-flex items-center gap-3 bg-[color:var(--kb-ink)] text-white px-10 py-4 text-sm tracking-[0.25em] uppercase hover:bg-[color:var(--kb-gold)] hover:text-[color:var(--kb-ink)] transition-colors">
              여정 시작하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const ProcessCard = ({ step }) => (
  <div
    className={`inline-block max-w-md ${
      step.feature
        ? "bg-[color:var(--kb-ink)] text-white p-10 border border-[color:var(--kb-gold)]"
        : "bg-white p-8 border border-[color:var(--kb-border)]"
    }`}
  >
    <div className="flex items-center gap-4 mb-4">
      <span className={`editorial-num text-4xl ${step.feature ? "text-[color:var(--kb-gold)]" : "text-[color:var(--kb-gold)]"}`}>
        {step.num}
      </span>
      {step.feature && (
        <span className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-champagne)]">Core Strength</span>
      )}
    </div>
    <h3 className={`font-serif-kr text-2xl md:text-3xl font-light leading-tight ${step.feature ? "text-white" : "text-[color:var(--kb-ink)]"}`}>
      {step.title}
    </h3>
    <p className={`mt-4 text-[15px] leading-[1.85] ${step.feature ? "text-white/75" : "text-[color:var(--kb-muted)]"}`}>
      {step.body}
    </p>
  </div>
);
