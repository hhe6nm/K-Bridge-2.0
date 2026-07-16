import PageHeader from "@/components/PageHeader";
import { FadeUp, MaskedLineInView } from "@/components/MaskedReveal";
import { Link } from "react-router-dom";

const IMG_SITE = "https://images.unsplash.com/photo-1576831371356-d6e9411ae501?crop=entropy&cs=srgb&fm=jpg&q=85&w=1800";

const PILLARS = [
  {
    num: "01",
    en: "Market Entry Strategy",
    title: "미국 시장 진입 전략",
    body: "시장은 데이터가 아니라 결로 이해되어야 합니다. 지역별 소비 성향, 카테고리 경쟁 강도, 진입 방식의 재무적 타당성까지, 각 브랜드의 현실에 맞춘 진입 전략을 설계합니다.",
    why: "한국에서의 성공 방정식이 미국에서 그대로 작동하는 경우는 드뭅니다. 도시 하나가 하나의 국가만큼 다른 소비 성향을 가진 시장에서, 첫 진입 지역과 진입 방식의 선택은 이후 3~5년의 자본 효율성을 결정합니다. 잘못된 시장에서의 '작은 실패'는 미국 시장 전체에 대한 브랜드 인식을 조기에 훼손시킬 수도 있습니다.",
    items: ["시장 · 경쟁 · 상권 분석", "카테고리 및 지역 진입 우선순위", "진입 방식(직진출 · JV · 프랜차이즈) 평가", "재무 시뮬레이션 및 초기 자본 계획"],
  },
  {
    num: "02",
    en: "Franchise Development",
    title: "프랜차이즈 확장",
    body: "한국형 프랜차이즈 모델은 미국 시장에서 그대로 작동하지 않습니다. FDD, 로열티 구조, 지역 개발권, 마스터 프랜차이지 모델까지 — 미국형 프랜차이즈 실무를 함께 설계합니다.",
    why: "미국의 프랜차이즈는 연방과 주 단위의 규제(FDD, State Registration)를 갖춘 정교한 법적 구조 위에서 움직입니다. 한국의 가맹 계약 관행을 그대로 옮겨오면 초기부터 리스크가 누적되고, 좋은 로컬 파트너를 만날 확률도 낮아집니다. 반대로 미국형 구조를 처음부터 갖추면, 자본과 운영을 분산하면서도 브랜드 통제권을 유지하는 확장이 가능해집니다.",
    items: ["미국형 프랜차이즈 전략 수립", "마스터 프랜차이지 모델 평가", "로컬 파트너 발굴 및 매칭", "브랜드 로컬라이제이션 자문"],
  },
  {
    num: "03",
    en: "Business Setup & Launch",
    title: "법인 설립 · 오픈 지원",
    body: "법인 설립부터 EIN, 각종 라이센싱, 시공 파트너 매칭, 오퍼레이션 준비까지. 오픈 전 모든 실무를 통합적으로 조율합니다.",
    why: "미국의 법인 설립은 단순한 서류 절차가 아닙니다. 어떤 주에 어떤 형태(LLC · C-Corp · S-Corp)로 세우느냐가 향후 세금, 투자 유치, 프랜차이즈 확장, 심지어 오너의 개인 리스크 노출까지 좌우합니다. 여기에 도시별로 다른 인·허가 절차, 리테일과 F&B에 각기 다른 라이센싱 실무가 얽히면, 이 단계에서만 3~6개월의 지연이 흔히 발생합니다. 통합 조율이 필요한 이유입니다.",
    items: ["법인 · EIN · 사업자 등록", "전문가 네트워크 조정 (회계 · 법률)", "인·허가 및 라이센싱", "시공 · 공급업체 · 오픈 준비"],
  },
];

export default function Services() {
  return (
    <div>
      <PageHeader
        chapter="03"
        eyebrow="Services"
        title="네 개의 축, 하나의 파트너."
        subtitle="K Bridge Partners는 미국 진출의 네 가지 핵심 축을 하나의 파트너십으로 통합해 제공합니다."
      />

      {/* Pillars */}
      <section className="bg-[color:var(--kb-bone)] py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          {PILLARS.map((p, i) => (
            <FadeUp key={p.num} delay={i * 0.05}>
              <div className="grid grid-cols-12 gap-8 py-16 border-b border-[color:var(--kb-border)]">
                <div className="col-span-12 lg:col-span-4">
                  <div className="editorial-num text-[color:var(--kb-gold)] text-7xl">{p.num}</div>
                  <div className="mt-6 text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-muted)]">{p.en}</div>
                </div>
                <div className="col-span-12 lg:col-span-8">
                  <h3 className="font-serif-kr text-4xl md:text-5xl font-light leading-tight">
                    <MaskedLineInView>{p.title}</MaskedLineInView>
                  </h3>
                  <p className="mt-6 text-lg text-[color:var(--kb-text)]/75 leading-[1.9] max-w-2xl">{p.body}</p>
                  <div className="mt-6 pl-5 border-l-2 border-[color:var(--kb-gold)]/40 max-w-2xl">
                    <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-gold)] mb-2">
                      왜 중요한가
                    </div>
                    <p className="text-[15px] text-[color:var(--kb-text)]/70 leading-[1.85]">{p.why}</p>
                  </div>
                  <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 max-w-2xl">
                    {p.items.map((it, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-[color:var(--kb-text)]/85">
                        <span className="text-[color:var(--kb-gold)] mt-1">—</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Featured pillar 04 — Site Selection */}
      <section className="relative bg-[color:var(--kb-ink)] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src={IMG_SITE} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050914] via-[#050914]/70 to-transparent" />
        </div>
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-32 md:py-48 grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-6 mb-8">
              <span className="editorial-num text-[color:var(--kb-gold)] text-8xl">04</span>
              <span className="text-[11px] tracking-[0.35em] uppercase text-[color:var(--kb-gold)]">
                Core Strength — 핵심 역량
              </span>
            </div>
            <h2 className="font-serif-kr text-5xl md:text-7xl font-light leading-[1.02]">
              <MaskedLineInView>상업 부동산 ·</MaskedLineInView><br />
              <MaskedLineInView delay={0.15} className="italic text-[color:var(--kb-champagne)]">입지 선정.</MaskedLineInView>
            </h2>
            <p className="mt-10 text-lg text-white/75 max-w-xl leading-relaxed">
              K Bridge Partners의 시작이자 가장 깊은 뿌리. 수십 년간의 미국 상업 부동산 실전 경험은
              어떤 리서치로도 대체할 수 없는 결정적 우위입니다. 임대차 협상 테이블의 실제 언어를 아는 팀과 함께하십시오.
            </p>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl">
              {["부지 분석", "상권 리서치", "임대차 검토", "협상 · 최적화"].map((t, i) => (
                <div key={i} className="border-t border-[color:var(--kb-gold)]/40 pt-4">
                  <div className="editorial-num text-[color:var(--kb-gold)] text-2xl">0{i + 1}</div>
                  <div className="mt-2 text-sm text-white/90">{t}</div>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <Link to="/contact" className="inline-flex items-center gap-3 bg-[color:var(--kb-gold)] text-[color:var(--kb-ink)] px-8 py-4 text-sm tracking-[0.2em] uppercase hover:bg-[color:var(--kb-champagne)] transition-colors">
                입지 자문 상담
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
