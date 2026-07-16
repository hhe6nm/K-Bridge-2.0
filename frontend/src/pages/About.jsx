import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { FadeUp, MaskedLineInView } from "@/components/MaskedReveal";

const CHAPTERS = [
  {
    num: "01",
    title: "미션",
    body: [
      "K Bridge Partners의 미션은 단순합니다. 한국 브랜드가 미국 시장에서 지속 가능한 성공을 이루도록, 실질적으로 함께 실행하는 것.",
      "미국은 세계에서 가장 큰 소비 시장이지만, 동시에 가장 복잡한 상업 인프라를 가진 시장이기도 합니다. 그래서 이곳에서의 성공은 좋은 브랜드만으로 결정되지 않습니다. 임대차의 미세한 조항, 상권의 감각적 이해, 로컬 파트너와의 신뢰 관계 — 이 모든 것이 성패를 가르는 변수입니다.",
      "우리는 그 변수들을 이론이 아닌 실무의 언어로 다루는 파트너입니다.",
    ],
  },
  {
    num: "02",
    title: "왜 이 회사를 시작했는가",
    body: [
      "창업 가족은 수십 년간 미국 서부와 동부의 상업 부동산 시장에서 실전을 쌓아왔습니다. 그 시간 동안 반복적으로 목격한 장면이 있었습니다 — 좋은 브랜드가, 좋은 아이템을 가지고, 잘못된 자리에서 시작하는 순간.",
      "임대인의 언어를 몰라서 불리한 조건에 서명하는 브랜드, 상권의 결을 읽지 못해 열정만으로 위치를 결정한 브랜드, 좋은 파트너를 만나기까지의 우회 비용을 감당하지 못한 브랜드들.",
      "K Bridge Partners는 그 반복을 끝내기 위해 시작되었습니다. 이론이 아니라 현장에서 확인한 함정과 지름길을, 한국 브랜드에게 처음부터 열어드리는 것 — 그것이 이 회사의 존재 이유입니다.",
    ],
  },
  {
    num: "03",
    title: "우리의 접근 방식",
    body: [
      "일반적인 컨설팅 펌은 리포트를 만듭니다. 우리는 실행을 함께합니다.",
      "K Bridge Partners는 시장 리서치와 진입 전략에서 끝나지 않습니다. 법인 설립의 실무 서류, 임대차 협상 테이블의 조건 조율, 시공 파트너와의 조율, 오픈 이후의 오퍼레이션 튜닝까지 — 실제로 매장이 문을 열고 안정적으로 운영되기까지의 전 여정을 하나의 팀이 책임집니다.",
      "그래서 우리는 프로젝트를 많이 맡지 않습니다. 각 브랜드에 충분한 밀도의 시간을 투입할 수 있는 규모로만 파트너십을 구성합니다.",
    ],
  },
  {
    num: "04",
    title: "창업자의 이야기",
    body: [
      "K Bridge는 수십 년간 미국 상업 부동산의 현장에서 활동해온 창업 가족의 실전 경험에서 출발했습니다. 대형 프랜차이즈의 앵커 딜부터, 독립 부티크의 첫 매장 오픈까지 — 규모와 카테고리를 가로지르는 다양한 프로젝트를 임대인과 임차인 양측의 시각에서 모두 경험한 이력이 회사의 뿌리입니다.",
      "그 시간이 만들어낸 것은 계약서에는 적히지 않은 관행에 대한 감각입니다. 임대인이 어떤 조건에서 유연해지는지, 어떤 상권이 데이터와 달리 실제로 걷기 어려운지, 어떤 시공 업체가 예산을 지키는지 — 이 모든 것이 리서치로는 얻어지지 않는 K Bridge의 자산입니다.",
    ],
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
                  <p className="mt-6 text-lg text-[color:var(--kb-text)]/75 leading-[1.9] max-w-2xl whitespace-pre-line">
                    {c.body.join("\n\n")}
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
