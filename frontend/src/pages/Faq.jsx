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
    a: "브랜드의 준비 상태에 따라 크게 달라지지만, 첫 상담부터 첫 매장 오픈까지 통상 8개월에서 18개월 사이입니다. 이 시간의 대부분은 서류 처리가 아니라 '올바른 판단을 내리기 위한 시간'입니다. 특히 시장 리서치와 입지 선정 단계에서 얼마나 신중하게 접근하느냐가 이후 매장 오픈 후 3~5년의 성패를 결정하므로, 조급하게 일정을 압축하는 것보다 각 단계의 밀도를 지키는 것을 권장드립니다. 이미 진출을 확정하신 브랜드의 경우, 병렬로 진행 가능한 실무를 최대한 겹쳐 전체 일정을 단축해 드립니다." },
  { q: "상담 프로세스는 어떻게 진행되나요?",
    a: "먼저 홈페이지의 무료 상담 신청서를 작성해 주시면, 48시간 이내 담당 파트너가 회신드립니다. 1차 온라인 미팅(약 45~60분)에서 브랜드 현황, 진출 동기, 목표 시장, 사용 가능한 자본과 인적 자원을 청취합니다. 이후 K Bridge Partners가 내부적으로 초기 진단을 진행하고, 브랜드에 맞는 진입 방식과 예상 프로세스, 그리고 투명한 견적을 담은 제안서를 발송합니다. 이 단계까지는 어떤 비용도 발생하지 않으며, 이후 정식 프로젝트로 진행할지의 여부는 온전히 브랜드의 결정입니다." },
  { q: "비자·이민 관련 자문도 받을 수 있나요?",
    a: "이민법 자체는 K Bridge Partners의 직접 자문 범위는 아닙니다. 다만 미국에서 사업을 실질적으로 운영하기 위해서는 E-2(투자 비자), L-1(주재원 이전), EB-5 등 브랜드의 상황에 맞는 비자 전략이 필수적이므로, 저희는 오랫동안 함께 일해온 신뢰할 수 있는 파트너 이민 로펌 네트워크를 통해 브랜드에 적합한 변호사를 소개해 드립니다. 필요 시 미팅에 함께 참석해 사업 구조와 비자 전략이 일관되게 설계되도록 조율합니다." },
  { q: "어떤 종류의 브랜드와 주로 일하시나요?",
    a: "F&B(카페 · 레스토랑 · 디저트), 리테일, K-Beauty, 라이프스타일 브랜드, 프랜차이즈 본사 등 다양한 카테고리와 협업합니다. 브랜드의 규모보다 훨씬 중요한 것은 미국 진출에 대한 진지한 준비 자세입니다. '미국이니까 잘 될 것'이라는 기대만 있는 브랜드보다는, 국내에서 이미 자신의 강점을 명확히 알고 있고, 미국에서 그 강점을 어떻게 재해석해야 할지에 열려 있는 브랜드와의 협업에서 가장 좋은 결과가 나옵니다." },
  { q: "일반적인 비용은 어느 정도인가요?",
    a: "프로젝트의 범위(전략만인지, 오픈까지의 실행 전 과정인지)와 도시, 매장 수에 따라 크게 달라집니다. K Bridge Partners는 초기 상담 이후 반드시 서면 제안서와 함께 투명한 견적을 제공하며, 성공 여부와 무관한 고정 자문료 구조와, 성과에 연동된 하이브리드 구조 모두를 상황에 따라 제안드릴 수 있습니다. 초기 상담 자체에는 어떤 비용도 발생하지 않습니다." },
  { q: "이미 미국에 진출한 브랜드도 자문받을 수 있나요?",
    a: "네, 오히려 진출 이후 단계의 자문 프로젝트도 상당 부분을 차지합니다. 기존 매장의 임대차 재검토 및 재협상, 신규 상권으로의 확장, 프랜차이즈 구조의 재설계, 미국 법인의 세제·운영 구조 최적화 등, 이미 진출한 브랜드가 겪는 실질적 이슈에 대한 자문을 진행하고 있습니다. 초기 진출 단계보다 실행 강도가 높은 경우도 많습니다." },
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
                    <p className="text-[15px] md:text-base text-[color:var(--kb-text)]/75 leading-[1.95] max-w-3xl">{f.a}</p>
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
