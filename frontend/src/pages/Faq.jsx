import PageHeader from "@/components/PageHeader";
import { FadeUp } from "@/components/MaskedReveal";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { TID } from "@/lib/testIds";
import { useLang } from "@/lib/i18n";

const CONTENT = {
  ko: {
    eyebrow: "FAQ",
    title: "자주 묻는 질문.",
    subtitle: "미국 진출을 준비하는 브랜드가 가장 자주 궁금해하시는 질문들입니다.",
    footer: "더 궁금한 점이 있으시면 직접 문의해 주세요.",
    cta: "문의하기",
    items: [
      { q: "법인 설립에 얼마나 걸리나요?",
        a: "표준적인 LLC 또는 C-Corp 설립은 서류 접수 후 통상 1~3주 이내에 완료됩니다. 다만 실질적으로 사업을 운영할 수 있는 상태(EIN 발급, 은행 계좌 개설, 필요한 라이센싱 확보)까지 도달하는 데는 2~4주가 추가로 소요됩니다. 어떤 주에서 어떤 형태로 설립하느냐, 그리고 오너의 미국 체류 형태에 따라 이 일정은 크게 달라질 수 있으므로, 상담 단계에서 브랜드에 맞는 현실적인 타임라인을 함께 확정합니다." },
      { q: "어떤 주(state)에서 진행 가능한가요?",
        a: "K Bridge Partners의 주 커버리지는 워싱턴 DC, 버지니아, 뉴욕, 뉴저지, 마이애미(FL), 댈러스(TX), 애틀랜타(GA), 라스베가스(NV)입니다. 이 외의 주에서도 진행이 가능하지만, 실제 매장 오픈과 임대차 협상까지 함께하는 프로젝트는 위의 주요 시장을 중심으로 진행하는 것이 일반적입니다. 목표 시장이 이 리스트에 없다면 상담 단계에서 별도로 논의드립니다." },
      { q: "프랜차이즈 규제(FDD)는 무엇인가요?",
        a: "FDD(Franchise Disclosure Document)는 미국 연방거래위원회(FTC)가 요구하는 프랜차이즈 정보공개 문서입니다. 가맹점 모집 이전에 반드시 준비해야 하며, 회사 개요, 재무제표, 로열티 및 초기 비용 구조, 지역 개발권 등 23개 항목에 대한 상세 공시가 요구됩니다. 또한 일부 주(예: 캘리포니아, 뉴욕, 버지니아 등)에서는 별도의 주 등록(State Registration)이 추가로 필요합니다. K Bridge는 FDD 문서 준비와 주 등록의 전 과정을 파트너 로펌과 함께 지원합니다." },
      { q: "비용 구조는 어떻게 되나요?",
        a: "프로젝트의 범위, 도시, 매장 수, 진출 방식(직진출/프랜차이즈)에 따라 비용은 크게 달라집니다. K Bridge Partners는 초기 상담 이후 브랜드에 맞춘 서면 제안서와 함께 투명한 견적을 제공합니다. 상황에 따라 고정 자문료 구조, 시간당 자문 구조, 성과 연동 하이브리드 구조 모두를 제안드릴 수 있으며, 초기 상담 자체에는 비용이 발생하지 않습니다." },
      { q: "영어를 못해도 진행 가능한가요?",
        a: "네, 전혀 문제없습니다. 모든 커뮤니케이션은 한국어로 진행되며, 미국 현지 파트너(변호사, 회계사, 임대인 등)와의 협상과 문서 검토도 K Bridge가 브랜드를 대신해 진행합니다. 필요한 경우 브랜드 측 담당자를 위한 요약 브리핑을 한국어로 별도 제공합니다. 영어는 브랜드의 미국 진출을 막는 이유가 되어서는 안 된다는 것이 저희의 원칙입니다." },
      { q: "K Bridge와 일반 컨설팅펌의 차이는 무엇인가요?",
        a: "일반적인 컨설팅펌은 리서치와 리포트를 산출물로 제공합니다. K Bridge Partners는 그 이후의 실행을 함께합니다. 시장 리서치와 진입 전략에서 끝나지 않고, 법인 설립의 실무 서류, 임대차 협상 테이블, 시공 파트너 조율, 오픈 이후 초기 운영 안정화까지 — 실제 매장이 안정적으로 운영되기까지의 전 여정을 하나의 팀이 책임집니다. 그래서 저희는 프로젝트를 많이 맡지 않습니다. 각 브랜드에 충분한 시간을 투입할 수 있는 규모로만 파트너십을 유지합니다." },
    ],
  },
  en: {
    eyebrow: "FAQ",
    title: "Frequently asked questions.",
    subtitle: "The questions we hear most often from brands preparing to enter the U.S.",
    footer: "Have another question? Reach out directly.",
    cta: "Contact us",
    items: [
      { q: "How long does entity formation take?",
        a: "A standard LLC or C-Corp is typically filed within 1–3 weeks. However, reaching an operational state (EIN, U.S. bank account, required licensing) usually takes another 2–4 weeks. State of formation, entity type, and the owner's U.S. residency status can shift this materially — we lock in a realistic timeline together at the consultation stage." },
      { q: "Which states can we operate in?",
        a: "Our primary coverage is Washington DC, Virginia, New York, New Jersey, Miami (FL), Dallas (TX), Atlanta (GA), and Las Vegas (NV). We can support other states as well, but hands-on lease negotiation and store opening projects usually run in these primary markets. If your target market isn't on the list, we'll discuss it during consultation." },
      { q: "What is FDD (Franchise Disclosure Document)?",
        a: "FDD is the franchise disclosure document required by the U.S. Federal Trade Commission before offering franchises. It requires detailed disclosure across 23 items — company overview, financials, royalty and initial-fee structure, development rights, and more. Certain states (California, New York, Virginia, etc.) also require separate state registration. K Bridge supports FDD preparation and state registration end-to-end with partner law firms." },
      { q: "How is your fee structured?",
        a: "Fees depend on project scope, city, number of stores, and entry method. After the initial consultation, we provide a written proposal with a transparent quote. Depending on the situation, we can offer fixed-fee, hourly, or performance-hybrid structures. The initial consultation itself is free." },
      { q: "Can we proceed without English fluency?",
        a: "Yes — absolutely. All communication with K Bridge is in Korean, and we handle negotiations and document review with U.S. partners (lawyers, accountants, landlords) on your behalf. When needed, we provide summarized briefings in Korean for your team. English should never be the reason a good Korean brand can't enter the U.S." },
      { q: "How is K Bridge different from a typical consulting firm?",
        a: "A typical consulting firm delivers research and reports. K Bridge Partners executes alongside you. We don't stop at strategy — we handle entity paperwork, sit at the lease negotiation table, coordinate builders, and stay with you through post-opening stabilization. Because of that, we keep our engagement count small: only as many partnerships as we can give real time to." },
    ],
  },
};

export default function Faq() {
  const { lang } = useLang();
  const t = CONTENT[lang];
  return (
    <div>
      <PageHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
      <section className="bg-[color:var(--kb-bone)] py-24 md:py-32">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <Accordion type="single" collapsible className="w-full">
              {t.items.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-[color:var(--kb-border)]" data-testid={`${TID.faqItem}-${i}`}>
                  <AccordionTrigger className="py-8 text-left hover:no-underline group">
                    <div className="flex items-start gap-6 w-full">
                      <span className="mt-3 w-8 h-px bg-[color:var(--kb-gold)] flex-shrink-0" />
                      <span className="font-serif-kr text-xl md:text-2xl font-light text-[color:var(--kb-ink)] leading-tight text-left group-hover:text-[color:var(--kb-gold)] transition-colors">
                        {f.q}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-10 pl-14 md:pl-16">
                    <p className="text-[15px] md:text-base text-[color:var(--kb-text)]/75 leading-[1.95] max-w-3xl">{f.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeUp>

          <div className="mt-20 text-center">
            <p className="text-[color:var(--kb-muted)]">{t.footer}</p>
            <div className="mt-8">
              <Link to="/contact" className="inline-flex items-center gap-3 bg-[color:var(--kb-ink)] text-white px-8 py-4 text-sm tracking-[0.25em] uppercase hover:bg-[color:var(--kb-gold)] hover:text-[color:var(--kb-ink)] transition-colors">
                {t.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
