import PageHeader from "@/components/PageHeader";
import { FadeUp } from "@/components/MaskedReveal";
import { Link } from "react-router-dom";

const CASES = [
  { category: "F&B 프랜차이즈", region: "West Coast", status: "Coming soon" },
  { category: "리테일 브랜드", region: "East Coast", status: "Coming soon" },
  { category: "K-Beauty", region: "Multi-city", status: "Coming soon" },
  { category: "카페 컨셉", region: "West Coast", status: "Coming soon" },
];

export default function Success() {
  return (
    <div>
      <PageHeader
        chapter="05"
        eyebrow="Success Stories"
        title="사례가 곧 증거입니다."
        subtitle="실제 브랜드의 미국 진출 여정. 상세 사례는 순차적으로 공개될 예정입니다."
      />

      <section className="bg-[color:var(--kb-bone)] py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CASES.map((c, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="group relative border border-[color:var(--kb-border)] bg-white overflow-hidden aspect-[4/3] p-10 flex flex-col justify-between hover:border-[color:var(--kb-gold)] transition-colors">
                  <div className="flex items-start justify-between">
                    <span className="editorial-num text-[color:var(--kb-gold)] text-6xl">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-muted)] border border-[color:var(--kb-border)] px-3 py-1.5">
                      {c.status}
                    </span>
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-gold)] mb-3">{c.region}</div>
                    <h3 className="font-serif-kr text-3xl md:text-4xl font-light">{c.category}</h3>
                    <div className="mt-6 grid grid-cols-3 gap-6 text-xs text-[color:var(--kb-muted)]">
                      <div>
                        <div className="tracking-[0.2em] uppercase mb-1">Challenge</div>
                        <div className="h-px bg-[color:var(--kb-border)] w-full" />
                      </div>
                      <div>
                        <div className="tracking-[0.2em] uppercase mb-1">Approach</div>
                        <div className="h-px bg-[color:var(--kb-border)] w-full" />
                      </div>
                      <div>
                        <div className="tracking-[0.2em] uppercase mb-1">Outcome</div>
                        <div className="h-px bg-[color:var(--kb-border)] w-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <div className="mt-24 text-center">
            <p className="text-[color:var(--kb-muted)] max-w-xl mx-auto">
              실제 사례는 클라이언트의 프라이버시를 존중하며 순차적으로 업데이트됩니다.
              직접 사례 자료를 요청하실 수도 있습니다.
            </p>
            <div className="mt-10">
              <Link to="/contact" className="inline-flex items-center gap-2 text-[color:var(--kb-ink)] tick-arrow text-sm tracking-[0.25em] uppercase">사례 자료 요청</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
