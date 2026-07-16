import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { FadeUp, MaskedLineInView } from "@/components/MaskedReveal";

const CHAPTERS = [
  {
    num: "01",
    title: "미션",
    body: "K Bridge Partners는 한국 브랜드의 미국 시장 진출을 단순한 자문이 아닌, 지속 가능한 성공으로 이어지도록 돕습니다. 시장은 다르고, 규칙은 낯설며, 관계는 하루아침에 만들어지지 않습니다. 그 간극을 우리가 이어드립니다.",
  },
  {
    num: "02",
    title: "왜 미국인가",
    body: "미국은 세계 최대의 소비 시장이자, 동시에 가장 정교한 상업 인프라를 갖춘 시장입니다. 기회의 크기와 실패의 비용이 모두 큰 이곳에서 살아남기 위해서는 현지의 실전 지식이 필수적입니다.",
  },
  {
    num: "03",
    title: "우리의 관점",
    body: "미국 시장 진출은 단순히 매장을 여는 일이 아닙니다. 시장 이해, 입지 선정, 법적·운영적 셋업, 현지 관계 구축 — 이 네 축이 모두 완성되어야 지속 가능한 사업이 됩니다.",
  },
  {
    num: "04",
    title: "창업자의 이야기",
    body: "K Bridge는 수십 년간 미국 상업 부동산 현장에서 활동해온 창업 가족의 실전 경험에서 출발했습니다. 임대차 협상 테이블에서, 상권 분석 현장에서, 그리고 실제 브랜드의 오픈 현장에서 축적한 지식은 리서치나 이론으로 대체될 수 없습니다.",
  },
];

export default function About() {
  return (
    <div>
      <PageHeader
        chapter="01"
        eyebrow="About K Bridge"
        title="우리는 다리를 놓습니다."
        subtitle="한국과 미국, 브랜드와 시장, 계획과 실행 사이에. K Bridge Partners는 이론이 아닌 경험 위에 세워진 자문 파트너입니다."
      />

      {/* Chapters */}
      <section className="bg-[color:var(--kb-bone)] py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          {CHAPTERS.map((c, i) => (
            <FadeUp key={c.num} delay={i * 0.05}>
              <div className="grid grid-cols-12 gap-8 py-16 border-b border-[color:var(--kb-border)]">
                <div className="col-span-12 md:col-span-3">
                  <div className="editorial-num text-[color:var(--kb-gold)] text-7xl md:text-8xl">{c.num}</div>
                </div>
                <div className="col-span-12 md:col-span-9">
                  <h3 className="font-serif-kr text-3xl md:text-4xl font-light leading-tight">
                    <MaskedLineInView>{c.title}</MaskedLineInView>
                  </h3>
                  <p className="mt-6 text-lg text-[color:var(--kb-text)]/75 leading-relaxed max-w-2xl">
                    {c.body}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* CEO Quote */}
      <section className="bg-[color:var(--kb-ink)] text-white py-32">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-10 text-center">
          <div className="text-[11px] tracking-[0.35em] uppercase text-[color:var(--kb-gold)] mb-10">A message</div>
          <FadeUp>
            <blockquote className="font-serif-kr text-3xl md:text-5xl font-light leading-[1.25] italic text-balance">
              “한국 브랜드가 미국에서 실패하는 이유는 대부분 실력이 부족해서가 아닙니다.
              시장의 문법을 몰라서입니다. 우리는 그 문법을 함께 읽어드립니다.”
            </blockquote>
            <div className="mt-10 text-[color:var(--kb-champagne)] text-sm tracking-[0.25em] uppercase">
              — K Bridge Partners, 창업자
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Awards placeholder */}
      <section className="bg-[color:var(--kb-paper)] py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="text-[11px] tracking-[0.35em] uppercase text-[color:var(--kb-gold)] mb-6">Recognition</div>
          <h3 className="font-serif-kr text-3xl md:text-4xl font-light">수상 · 인증</h3>
          <p className="mt-4 text-[color:var(--kb-muted)] max-w-xl">추후 업데이트 예정입니다.</p>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="aspect-[3/2] border border-[color:var(--kb-border)] bg-white/60 flex items-center justify-center text-[color:var(--kb-muted)] text-xs tracking-[0.3em] uppercase">
                Placeholder
              </div>
            ))}
          </div>
          <div className="mt-16">
            <Link to="/contact" className="inline-flex items-center gap-2 text-[color:var(--kb-ink)] tick-arrow text-sm tracking-[0.25em] uppercase">상담 신청</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
