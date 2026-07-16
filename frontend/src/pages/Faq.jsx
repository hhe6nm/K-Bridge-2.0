import PageHeader from "@/components/PageHeader";
import { FadeUp } from "@/components/MaskedReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { TID } from "@/lib/testIds";

const FAQS = [
  { q: "미국 시장 진출에는 보통 얼마나 시간이 걸리나요?",
    a: "브랜드의 준비 상태에 따라 다르지만, 상담부터 첫 매장 오픈까지 통상 8개월에서 18개월 사이입니다. 시장 리서치와 입지 선정 단계에서 얼마나 신중하게 접근하느냐가 전체 일정을 결정합니다." },
  { q: "상담 프로세스는 어떻게 진행되나요?",
    a: "무료 상담 신청 후 1차 온라인 미팅에서 브랜드 현황과 목표를 청취하고, 이후 진단 자료와 함께 제안서를 발송합니다. 이 단계까지 비용은 발생하지 않습니다." },
  { q: "비자·이민 관련 자문도 받을 수 있나요?",
    a: "이민 관련은 K Bridge Partners의 직접 자문 범위는 아니지만, 신뢰할 수 있는 파트너 이민 로펌 네트워크를 통해 연결해 드립니다." },
  { q: "어떤 종류의 브랜드와 주로 일하시나요?",
    a: "F&B, 리테일, K-Beauty, 라이프스타일 브랜드 및 프랜차이즈 등 다양한 카테고리와 협업합니다. 브랜드의 규모보다는 미국 진출에 대한 진지한 준비 정도가 더 중요합니다." },
  { q: "일반적인 비용은 어느 정도인가요?",
    a: "프로젝트의 범위와 단계에 따라 크게 달라집니다. 초기 상담 이후 명확한 제안서와 함께 투명한 견적을 제공합니다." },
  { q: "이미 미국에 진출한 브랜드도 자문받을 수 있나요?",
    a: "네. 기존 매장의 임대차 재검토, 신규 상권 확장, 프랜차이즈 구조 최적화 등 진출 이후 단계의 자문도 다수 진행하고 있습니다." },
];

export default function Faq() {
  return (
    <div>
      <PageHeader
        chapter="07"
        eyebrow="FAQ"
        title="자주 묻는 질문."
        subtitle="미국 진출을 준비하는 브랜드가 가장 자주 궁금해하시는 질문들입니다."
      />
      <section className="bg-[color:var(--kb-bone)] py-24 md:py-32">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-b border-[color:var(--kb-border)]"
                  data-testid={`${TID.faqItem}-${i}`}
                >
                  <AccordionTrigger className="py-8 text-left hover:no-underline group">
                    <div className="flex items-start gap-6 w-full">
                      <span className="editorial-num text-[color:var(--kb-gold)] text-3xl md:text-4xl flex-shrink-0 mt-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-serif-kr text-xl md:text-2xl font-light text-[color:var(--kb-ink)] leading-tight text-left group-hover:text-[color:var(--kb-gold)] transition-colors">
                        {f.q}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-10 pl-16 md:pl-20">
                    <p className="text-lg text-[color:var(--kb-text)]/75 leading-relaxed max-w-2xl">{f.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeUp>

          <div className="mt-20 text-center">
            <p className="text-[color:var(--kb-muted)]">더 궁금한 점이 있으시면 직접 문의해 주세요.</p>
            <div className="mt-8">
              <Link to="/contact" className="inline-flex items-center gap-3 bg-[color:var(--kb-ink)] text-white px-8 py-4 text-sm tracking-[0.25em] uppercase hover:bg-[color:var(--kb-gold)] hover:text-[color:var(--kb-ink)] transition-colors">
                문의하기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
