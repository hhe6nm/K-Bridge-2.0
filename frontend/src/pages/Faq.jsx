import PageHeader from "@/components/PageHeader";
import { FadeUp } from "@/components/MaskedReveal";
import ChapterBadge from "@/components/ChapterBadge";
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
    categories: [
      {
        label: "법인 · 비용",
        items: [
          { q: "법인 설립에 얼마나 걸리나요?",
            a: "표준적인 LLC 또는 C-Corp 설립은 서류 접수 후 통상 1~3주 이내에 완료됩니다. 다만 실질적으로 사업을 운영할 수 있는 상태(EIN 발급, 은행 계좌 개설, 필요한 라이센싱 확보)까지 도달하는 데는 2~4주가 추가로 소요됩니다. 어떤 주에서 어떤 형태로 설립하느냐, 그리고 오너의 미국 체류 형태에 따라 이 일정은 크게 달라질 수 있으므로, 상담 단계에서 브랜드에 맞는 현실적인 타임라인을 함께 확정합니다." },
          { q: "최소 투자 금액은 얼마인가요?",
            a: "브랜드의 카테고리, 매장 규모, 진출 도시에 따라 크게 달라지지만, 리테일 · F&B의 경우 매장 하나 기준 초기 자본으로 통상 $500K~$1.5M 수준을 준비하시는 것이 안전합니다. 여기에는 임대 보증금(2~6개월치 임대료), 인테리어 · 시공비, 초기 재고, 개설비, 6개월분 운영 자금이 포함됩니다. 상담 단계에서 브랜드의 목표 도시와 매장 컨셉을 기준으로 상세한 재무 시뮬레이션을 함께 만들어 드립니다." },
          { q: "비용 구조는 어떻게 되나요?",
            a: "프로젝트의 범위, 도시, 매장 수, 진출 방식(직진출/프랜차이즈)에 따라 비용은 크게 달라집니다. K Bridge Partners는 초기 상담 이후 브랜드에 맞춘 서면 제안서와 함께 투명한 견적을 제공합니다. 상황에 따라 고정 자문료 구조, 시간당 자문 구조, 성과 연동 하이브리드 구조 모두를 제안드릴 수 있으며, 초기 상담 자체에는 비용이 발생하지 않습니다." },
        ],
      },
      {
        label: "진행 과정",
        items: [
          { q: "진행 기간은 보통 얼마나 걸리나요?",
            a: "초기 상담부터 매장 오픈까지의 전체 여정은 통상 6~10개월이 소요됩니다. 법인 설립 및 인허가(4~6주), 상업용 부동산 탐색과 임대차 계약(2~4개월, 상권 상황에 따라 변동), 시공 및 오픈 준비(4~8주)가 주요 구간입니다. 여기에 프랜차이즈 규제(FDD) 등록이 필요한 경우 6~10주가 추가됩니다. 상세 일정은 킥오프 시점에 브랜드 상황에 맞춰 함께 확정합니다." },
          { q: "계약 후 첫 단계는 무엇인가요?",
            a: "계약 후 2주 이내에 킥오프 워크숍을 진행합니다. 브랜드의 사업 모델, 목표 시장, 예산, 타임라인을 상세히 정리하고, 담당 파트너 팀을 배정합니다. 이후 진출 대상 주(State)와 법인 형태 결정, 초기 시장 리서치 브리핑, 잠정 로드맵 확정 순으로 첫 4~6주가 구성됩니다." },
          { q: "프랜차이즈 규제(FDD)는 무엇인가요?",
            a: "FDD(Franchise Disclosure Document)는 미국 연방거래위원회(FTC)가 요구하는 프랜차이즈 정보공개 문서입니다. 가맹점 모집 이전에 반드시 준비해야 하며, 회사 개요, 재무제표, 로열티 및 초기 비용 구조, 지역 개발권 등 23개 항목에 대한 상세 공시가 요구됩니다. 또한 일부 주(예: 캘리포니아, 뉴욕, 버지니아 등)에서는 별도의 주 등록(State Registration)이 추가로 필요합니다. K Bridge는 FDD 문서 준비와 주 등록의 전 과정을 파트너 로펌과 함께 지원합니다." },
        ],
      },
      {
        label: "언어 · 소통",
        items: [
          { q: "영어를 못해도 진행 가능한가요?",
            a: "네, 전혀 문제없습니다. 모든 커뮤니케이션은 한국어로 진행되며, 미국 현지 파트너(변호사, 회계사, 임대인 등)와의 협상과 문서 검토도 K Bridge가 브랜드를 대신해 진행합니다. 필요한 경우 브랜드 측 담당자를 위한 요약 브리핑을 한국어로 별도 제공합니다. 영어는 브랜드의 미국 진출을 막는 이유가 되어서는 안 된다는 것이 저희의 원칙입니다." },
          { q: "미국에 아직 실체가 없는데도 상담 가능한가요?",
            a: "네, 오히려 실체를 만들기 전 단계에서 상담을 시작하시는 것이 이상적입니다. 법인 설립, 주(State) 선택, 초기 자본 구조 같은 결정은 이후 5년의 유연성을 좌우하기 때문입니다. 한국에 계신 상태에서도 화상 상담과 서면 자료 검토를 통해 충분히 초기 단계를 함께 진행할 수 있습니다." },
        ],
      },
      {
        label: "회사 소개",
        items: [
          { q: "K Bridge와 일반 컨설팅펌의 차이는 무엇인가요?",
            a: "일반적인 컨설팅펌은 리서치와 리포트를 산출물로 제공합니다. K Bridge Partners는 그 이후의 실행을 함께합니다. 시장 리서치와 진입 전략에서 끝나지 않고, 법인 설립의 실무 서류, 임대차 협상 테이블, 시공 파트너 조율, 오픈 이후 초기 운영 안정화까지 — 실제 매장이 안정적으로 운영되기까지의 전 여정을 하나의 팀이 책임집니다. 그래서 저희는 프로젝트를 많이 맡지 않습니다. 각 브랜드에 충분한 시간을 투입할 수 있는 규모로만 파트너십을 유지합니다." },
          { q: "특정 산업/업종에 특화되어 있나요?",
            a: "F&B, 리테일, 뷰티, 라이프스타일 등 소비자 대상 브랜드의 오프라인 미국 진출에 특화되어 있습니다. 특히 상업용 부동산 실무 경험이 결정적인 카테고리 — 매장 운영 기반의 프랜차이즈, 리테일, 레스토랑, K-Beauty — 에서 가장 강점이 있습니다. B2B SaaS나 순수 이커머스는 저희의 핵심 영역이 아니며, 그런 경우 더 적합한 파트너를 소개해 드리기도 합니다." },
          { q: "E-2 비자 지원도 가능한가요?",
            a: "한국은 미국과의 E-2 조약 체결국이며, E-2 투자자 비자를 통해 창업자가 미국에 체류하며 사업을 직접 운영하는 것이 가능합니다. K Bridge는 이민법 전문 로펌 네트워크와 함께 E-2 비자에 부합하는 사업 구조 설계, 최소 투자금 요건(현실적으로 $100K~$200K 이상), '비주변적 사업(non-marginal business)' 요건 충족을 위한 재무 계획 수립을 지원합니다. 비자 신청 서류 자체는 파트너 로펌이 담당합니다." },
        ],
      },
    ],
  },
  en: {
    eyebrow: "FAQ",
    title: "Frequently asked questions.",
    subtitle: "The questions we hear most often from brands preparing to enter the U.S.",
    footer: "Have another question? Reach out directly.",
    cta: "Contact us",
    categories: [
      {
        label: "Entity & Cost",
        items: [
          { q: "How long does entity formation take?",
            a: "A standard LLC or C-Corp is typically filed within 1–3 weeks. However, reaching an operational state (EIN, U.S. bank account, required licensing) usually takes another 2–4 weeks. State of formation, entity type, and the owner's U.S. residency status can shift this materially — we lock in a realistic timeline together at the consultation stage." },
          { q: "What's the minimum investment needed?",
            a: "It depends heavily on category, store size, and target city, but for retail / F&B, a per-store initial capital of roughly $500K–$1.5M is a safe planning range. That covers security deposit (2–6 months of rent), buildout, initial inventory, opening costs, and 6 months of operating runway. We build a detailed financial simulation with you during consultation based on your target city and store concept." },
          { q: "How is your fee structured?",
            a: "Fees depend on project scope, city, number of stores, and entry method. After the initial consultation, we provide a written proposal with a transparent quote. Depending on the situation, we can offer fixed-fee, hourly, or performance-hybrid structures. The initial consultation itself is free." },
        ],
      },
      {
        label: "Process",
        items: [
          { q: "How long does the whole process typically take?",
            a: "From first consultation to store opening usually takes 6–10 months. Key phases: entity formation and permits (4–6 weeks), commercial real estate search and lease (2–4 months, varies by market), buildout and opening prep (4–8 weeks). Add 6–10 weeks for FDD state registration if franchising. We finalize the detailed schedule with you at kickoff." },
          { q: "What's the first step after we sign?",
            a: "Within two weeks of signing we run a kickoff workshop — mapping business model, target market, budget, and timeline, and assigning your partner team. The first 4–6 weeks then cover state selection, entity structure decisions, initial market research briefing, and roadmap lock." },
          { q: "What is FDD (Franchise Disclosure Document)?",
            a: "FDD is the franchise disclosure document required by the U.S. Federal Trade Commission before offering franchises. It requires detailed disclosure across 23 items — company overview, financials, royalty and initial-fee structure, development rights, and more. Certain states (California, New York, Virginia, etc.) also require separate state registration. K Bridge supports FDD preparation and state registration end-to-end with partner law firms." },
        ],
      },
      {
        label: "Language & Communication",
        items: [
          { q: "Can we proceed without English fluency?",
            a: "Yes — absolutely. All communication with K Bridge is in Korean, and we handle negotiations and document review with U.S. partners (lawyers, accountants, landlords) on your behalf. When needed, we provide summarized briefings in Korean for your team. English should never be the reason a good Korean brand can't enter the U.S." },
          { q: "Can we start before we have a U.S. entity?",
            a: "Yes — in fact, it's ideal to start before you have any U.S. entity. Decisions about which state to form in, entity type, and initial capital structure determine your flexibility for the next five years. We can run the early phases entirely via video consultation and document review while you're still based in Korea." },
        ],
      },
      {
        label: "About Us",
        items: [
          { q: "How is K Bridge different from a typical consulting firm?",
            a: "A typical consulting firm delivers research and reports. K Bridge Partners executes alongside you. We don't stop at strategy — we handle entity paperwork, sit at the lease negotiation table, coordinate builders, and stay with you through post-opening stabilization. Because of that, we keep our engagement count small: only as many partnerships as we can give real time to." },
          { q: "Do you focus on specific industries?",
            a: "We specialize in offline U.S. market entry for consumer brands — F&B, retail, beauty, and lifestyle. Our edge is strongest in categories where commercial real estate experience is decisive: franchise, retail, restaurants, and K-Beauty. B2B SaaS or pure e-commerce isn't our core; when it comes to us, we often refer to more fitting partners." },
          { q: "Do you support E-2 investor visas?",
            a: "South Korea is an E-2 treaty country with the U.S., which allows Korean founders to reside in the U.S. and operate their business directly under the E-2 visa. K Bridge, working with a network of immigration attorneys, supports the structural work — designing a business that meets the minimum investment threshold (realistically $100K–$200K+), and building financial plans that satisfy the 'non-marginal business' requirement. The visa filing itself is handled by our partner law firm." },
        ],
      },
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
          {t.categories.map((cat, ci) => (
            <FadeUp key={ci} delay={ci * 0.05} className="mb-16">
              <ChapterBadge number={ci + 1} label={cat.label} className="mb-6" />
              <Accordion type="single" collapsible className="w-full">
                {cat.items.map((f, i) => (
                  <AccordionItem
                    key={`${ci}-${i}`}
                    value={`item-${ci}-${i}`}
                    className="border-b border-[color:var(--kb-border)] group/item scroll-mt-28 data-[state=open]:bg-[color:var(--kb-gold)]/[0.04] data-[state=open]:border-l-2 data-[state=open]:border-l-[color:var(--kb-gold)] data-[state=open]:pl-6 -ml-6 pl-6 transition-all duration-300"
                    data-testid={`${TID.faqItem}-${ci}-${i}`}
                  >
                    <AccordionTrigger className="py-7 text-left hover:no-underline group [&>svg]:hidden">
                      <div className="flex items-start gap-6 w-full">
                        <span className="mt-3 w-8 h-px bg-[color:var(--kb-gold)] flex-shrink-0 transition-all group-data-[state=open]:w-12" />
                        <span className="flex-1 font-serif-kr text-xl md:text-2xl font-light text-[color:var(--kb-ink)] leading-tight text-left group-hover:text-[color:var(--kb-gold)] group-data-[state=open]:text-[color:var(--kb-gold)] transition-colors">
                          {f.q}
                        </span>
                        <span className="mt-2 flex-shrink-0 w-8 h-8 rounded-full border border-[color:var(--kb-gold)]/40 flex items-center justify-center transition-transform duration-500 group-data-[state=open]:rotate-180">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[color:var(--kb-gold)]">
                            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-9 pl-14 md:pl-16 pr-14 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2">
                      <p className="text-[15px] md:text-base text-[color:var(--kb-text)]/75 leading-[1.95] max-w-3xl">{f.a}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </FadeUp>
          ))}

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
