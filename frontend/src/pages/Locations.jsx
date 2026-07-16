import PageHeader from "@/components/PageHeader";
import { FadeUp } from "@/components/MaskedReveal";
import { Link } from "react-router-dom";

const LOCATIONS = [
  { city: "Los Angeles", region: "CA · West Coast", note: "미국 서부 최대의 한인 커뮤니티. F&B와 리테일 브랜드의 첫 진출지로 최적화된 시장.", tags: ["Retail", "F&B", "K-Beauty"] },
  { city: "New York", region: "NY · East Coast", note: "글로벌 브랜드의 무대. 프리미엄 포지셔닝과 미디어 노출이 결정적인 시장.", tags: ["Retail", "Fashion"] },
  { city: "Dallas", region: "TX · South", note: "빠르게 성장하는 아시안 커뮤니티와 상대적으로 낮은 진입 비용의 균형 시장.", tags: ["F&B", "Franchise"] },
  { city: "Additional Cities", region: "Coming soon", note: "샌프란시스코, 시카고, 애틀랜타 등 추가 지역 확장 예정.", tags: ["Placeholder"] },
];

export default function Locations() {
  return (
    <div>
      <PageHeader
        chapter="08"
        eyebrow="Locations"
        title="우리가 서있는 도시들."
        subtitle="K Bridge Partners는 미국 내 한인 브랜드가 활발히 진출하는 주요 도시에서 활동합니다."
      />

      <section className="bg-[color:var(--kb-bone)] py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-6">
            {LOCATIONS.map((l, i) => (
              <FadeUp key={i} delay={i * 0.05} className="col-span-12 md:col-span-6">
                <div className="group bg-white border border-[color:var(--kb-border)] p-10 h-full hover:border-[color:var(--kb-gold)] transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-gold)]">{l.region}</div>
                      <h3 className="font-serif-kr text-4xl md:text-5xl font-light mt-3">{l.city}</h3>
                    </div>
                    <span className="editorial-num text-[color:var(--kb-gold)]/50 text-5xl">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="mt-8 text-base text-[color:var(--kb-text)]/70 leading-relaxed max-w-md">{l.note}</p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {l.tags.map((t) => (
                      <span key={t} className="text-[10px] tracking-[0.25em] uppercase border border-[color:var(--kb-border)] px-3 py-1.5 text-[color:var(--kb-muted)]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <div className="mt-24 border-t border-[color:var(--kb-border)] pt-16 grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-6">
              <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-gold)] mb-4">
                Coverage
              </div>
              <h3 className="font-serif-kr text-3xl md:text-4xl font-light leading-tight">
                주요 도시가 아니라도 <span className="italic text-[color:var(--kb-gold)]">문의는 언제나 환영입니다.</span>
              </h3>
            </div>
            <div className="col-span-12 lg:col-span-6 lg:pl-10 flex items-center">
              <p className="text-[color:var(--kb-muted)] text-lg leading-relaxed">
                브랜드의 특성에 따라 상기 도시 외 다른 지역이 적합할 수 있습니다.
                시장 특성과 브랜드 포지셔닝을 종합해 최적의 진입 지역을 함께 판단해 드립니다.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link to="/contact" className="inline-flex items-center gap-3 bg-[color:var(--kb-ink)] text-white px-10 py-4 text-sm tracking-[0.25em] uppercase hover:bg-[color:var(--kb-gold)] hover:text-[color:var(--kb-ink)] transition-colors">
              지역별 상담 요청
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
