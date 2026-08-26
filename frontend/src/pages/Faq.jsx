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
        label: "시장 진출 준비",
        items: [
          { q: "한국 브랜드가 미국 시장에 진출하려면 가장 먼저 무엇을 준비해야 하나요?",
            a: "미국 진출의 첫 단계는 법인 설립이나 매장 임대가 아니라, 시장과 브랜드의 적합성을 파악하는 것입니다. 타깃 고객, 시장 규모, 경쟁 브랜드, 가격대, 소비자 특성, 지역별 시장환경을 분석한 뒤 브랜드에 맞는 진출 전략을 수립하는 것이 중요합니다. K Bridge Partners는 이 초기 시장조사와 경쟁분석을 진출 준비의 출발점으로 삼습니다." },
          { q: "한국에서 성공한 브랜드라면 미국에서도 성공할 수 있나요?",
            a: "한국에서의 성공이 미국에서의 성공을 보장하지는 않습니다. 소비자 취향, 가격 구조, 경쟁환경, 운영 방식과 문화가 다르기 때문에 미국 시장에 맞는 현지화 전략이 필요합니다. K Bridge Partners는 브랜드의 강점은 유지하면서, 미국 소비자와 시장환경에 맞게 사업모델을 조정할 수 있도록 지원합니다." },
          { q: "미국에 법인을 반드시 설립해야 하나요?",
            a: "모든 브랜드에 동일한 방식이 적용되지는 않습니다. 사업 형태와 운영 방식, 진출 지역, 세무 및 법적 구조에 따라 적합한 형태가 달라질 수 있습니다. K Bridge Partners는 미국 현지 변호사, CPA 등 전문 파트너와 협력하여 브랜드에 맞는 사업 구조를 검토할 수 있도록 지원합니다." },
          { q: "미국 어느 지역에 진출하는 것이 가장 좋은가요?",
            a: "정해진 정답은 없습니다. 브랜드의 타깃 고객, 인구통계, 소득수준, 경쟁환경, 소비패턴, 임대료, 접근성, 교통량, 향후 확장 가능성을 종합적으로 분석해야 합니다. K Bridge Partners는 브랜드와 사업모델에 적합한 지역을 분석하고, 후보 지역 및 상권을 비교할 수 있도록 지원합니다." },
        ],
      },
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
        label: "프랜차이즈",
        items: [
          { q: "한국 프랜차이즈가 미국에서 프랜차이즈 사업을 시작하려면 무엇이 필요한가요?",
            a: "미국에서 프랜차이즈 사업을 시작하려면 사업모델, 계약 구조, 공시 의무 등 관련 법규를 종합적으로 검토해야 합니다. 특히 연방 차원의 FTC Franchise Rule과 함께, 진출하려는 주(State)의 개별 규정을 함께 확인하는 것이 중요합니다. K Bridge Partners는 프랜차이즈 전문 변호사 및 관련 전문가와 연결하여 필요한 준비 과정을 지원합니다." },
          { q: "FDD(프랜차이즈 정보공개서)란 무엇인가요?",
            a: "FDD(Franchise Disclosure Document)는 미국 연방거래위원회(FTC)가 요구하는 프랜차이즈 정보공개 문서로, 가맹 희망자가 사업의 주요 정보를 검토하고 의사결정을 할 수 있도록 제공됩니다. FTC Franchise Rule에 따라 회사 개요, 재무제표, 로열티 및 초기 비용 구조, 지역 개발권 등 23개 항목에 대한 상세 공시가 요구되며, 일반적으로 계약 체결이나 금전 지급을 요구하기 최소 14일 전에 제공해야 합니다. 캘리포니아, 뉴욕, 버지니아 등 일부 주에서는 별도의 주 등록(State Registration)도 추가로 필요합니다. K Bridge Partners는 FDD 자체를 법률적으로 작성하지는 않지만, 프랜차이즈 전문 변호사와 협력하여 준비 과정 전반을 지원합니다." },
          { q: "FDD를 준비하는 데 얼마나 걸리나요?",
            a: "일반적으로 6~10주 정도가 소요되지만, 브랜드의 기존 사업모델, 재무자료, 운영시스템, 계약구조, 그리고 진출하려는 주에 따라 달라집니다. 단순히 일정만 정하기보다 먼저 현재 준비 상태를 점검하고 필요한 자료와 전문 서비스를 파악하는 것이 중요합니다." },
          { q: "미국 Franchise Fee와 Royalty는 어떻게 결정하나요?",
            a: "Franchise Fee와 Royalty는 브랜드 가치, 초기 지원 범위, 운영비용, 업종, 경쟁 프랜차이즈, 시장환경을 종합적으로 고려해 결정해야 합니다. 단순히 경쟁 브랜드의 수치를 따라가기보다, 본사의 수익성과 가맹점의 사업성이 함께 유지될 수 있는 구조를 설계하는 것이 중요합니다." },
          { q: "Master Franchise와 Area Development 방식은 무엇이 다른가요?",
            a: "Master Franchise는 특정 지역에서 프랜차이즈 사업을 개발하고 운영할 권리를 파트너에게 부여하는 방식입니다. Area Development는 일정 지역 내 여러 매장을 개발할 권리와 의무를 특정 개발자에게 부여하는 방식입니다. 어떤 구조가 적합한지는 브랜드의 성장 목표와 미국 내 확장 전략에 따라 달라집니다." },
          { q: "미국에서 Franchisee는 어떻게 찾을 수 있나요?",
            a: "브랜드의 사업모델과 목표 지역에 맞는 잠재 Franchisee를 발굴하고, 브랜드와 투자자의 조건이 서로 맞는지 검토하는 과정이 중요합니다. K Bridge Partners는 네트워크, 시장 활동, 비즈니스 개발 활동을 통해 적합한 파트너 발굴을 지원합니다." },
          { q: "한국의 프랜차이즈 시스템을 미국에서도 그대로 사용할 수 있나요?",
            a: "일부 시스템은 그대로 활용할 수 있지만, 모든 부분을 동일하게 적용하는 것은 권장하지 않습니다. 메뉴, 가격, 공급망, 교육, 인력관리, 고객서비스, 마케팅, 매장 운영방식은 미국 시장에 맞게 조정이 필요할 수 있습니다." },
        ],
      },
      {
        label: "부동산 · 입지 선정",
        items: [
          { q: "미국에서 첫 매장 위치는 어떻게 선정하나요?",
            a: "첫 매장의 위치는 브랜드 이미지와 향후 확장 가능성에도 영향을 미치기 때문에 신중하게 결정해야 합니다. 인구통계, 소비자 특성, 유동인구(Traffic), 가시성(Visibility), 주차, 접근성, 경쟁환경, 임대조건, 향후 개발계획을 종합적으로 검토합니다." },
          { q: "좋은 상권을 판단할 때 가장 중요한 요소는 무엇인가요?",
            a: "유동인구 하나만으로 좋은 상권을 판단하기는 어렵습니다. 브랜드의 타깃 고객이 실제로 그 지역에 얼마나 존재하는지, 경쟁업체는 얼마나 있는지, 고객이 쉽게 접근할 수 있는지, 임대료가 예상 매출과 비교해 적절한지를 함께 분석해야 합니다." },
          { q: "매장 임대료가 저렴한 곳이 좋은 매장인가요?",
            a: "반드시 그렇지는 않습니다. 저렴한 임대료보다 매출 가능성과 임대료의 균형이 더 중요할 수 있습니다. K Bridge Partners는 예상 고객층, 매출 가능성, 유동인구, 경쟁환경, 임대조건을 종합적으로 검토해 매장 후보지를 비교합니다." },
          { q: "K Bridge Partners가 매장 후보지를 찾아줄 수 있나요?",
            a: "네. 브랜드의 업종과 타깃 시장을 바탕으로 적합한 지역과 상권을 검토하고, 필요한 경우 현지 상업용 부동산 전문가 및 브로커 네트워크와 연결하여 후보지 발굴을 지원합니다." },
          { q: "Commercial Lease 계약도 검토해 주나요?",
            a: "K Bridge Partners는 임대조건과 사업적 관점에서 리스 구조를 검토하고, 관련 전문가와의 협업을 지원합니다. 다만 법률적인 계약 검토와 자문은 해당 주의 자격을 갖춘 변호사를 통해 진행하는 것이 원칙입니다." },
        ],
      },
      {
        label: "브랜드 현지화",
        items: [
          { q: "한국 브랜드를 미국 소비자에게 맞게 현지화해야 하나요?",
            a: "대부분의 경우 어느 정도의 현지화가 필요합니다. 브랜드의 핵심 정체성은 유지하면서 메뉴, 가격, 마케팅 메시지, 고객서비스, 매장 경험, 운영방식을 미국 소비자의 기대에 맞게 조정할 수 있습니다." },
          { q: "미국에서는 한국 브랜드라는 점을 강조하는 것이 좋을까요?",
            a: "브랜드와 업종에 따라 다릅니다. Korean heritage 자체가 강력한 브랜드 자산이 될 수 있는 경우도 있지만, 미국 소비자가 실제로 원하는 가치와 연결하는 것이 더 중요합니다. K Bridge Partners는 브랜드의 한국적 정체성을 유지하면서도 미국 소비자에게 효과적으로 전달할 수 있는 포지셔닝을 함께 검토합니다." },
          { q: "한국에서 인기 있는 메뉴를 미국에서도 그대로 판매하면 되나요?",
            a: "반드시 그렇지는 않습니다. 미국 소비자의 취향, 식습관, 가격, 메뉴 구성, 지역적 특성을 고려해 일부 메뉴를 조정하거나 새로운 메뉴를 추가할 수 있습니다. 중요한 것은 한국의 성공 요소를 유지하면서 미국 시장에서 경쟁력을 확보하는 것입니다." },
          { q: "미국 시장을 위한 가격은 어떻게 결정하나요?",
            a: "단순히 한국 가격을 환율로 환산해서 결정해서는 안 됩니다. 현지 경쟁가격, 원가, 인건비, 임대료, 고객의 지불의사, 브랜드 포지셔닝, 목표 수익성을 함께 고려해야 합니다." },
        ],
      },
      {
        label: "파트너 · 투자",
        items: [
          { q: "미국에서 사업 파트너나 투자자를 찾는 것도 지원하나요?",
            a: "네. 사업모델과 진출 전략에 적합한 Franchisee, Area Developer, Investor, Business Partner를 발굴할 수 있도록 지원합니다. 단순히 많은 후보를 소개하기보다, 브랜드의 조건과 성장전략에 맞는 파트너를 찾는 것을 중요하게 생각합니다." },
          { q: "Franchisee와 Investor의 차이는 무엇인가요?",
            a: "Franchisee는 일반적으로 프랜차이즈 계약을 통해 브랜드의 사업을 직접 운영하는 사업자입니다. Investor는 사업에 자본을 투자하는 역할을 하며, 실제 운영 참여 여부는 투자 구조에 따라 달라질 수 있습니다. 브랜드의 미국 진출 목적과 성장전략에 따라 어떤 파트너 구조가 적합한지 검토해야 합니다." },
          { q: "미국에서 변호사, CPA, 보험회사 등도 연결해 주나요?",
            a: "네. 미국에서 사업을 시작하려면 법률, 회계, 세무, 보험, 금융, 부동산 등 다양한 분야의 전문가가 필요합니다. K Bridge Partners는 프로젝트에 필요한 전문 분야를 파악하고, 적절한 현지 전문가와 연결하는 역할을 지원합니다." },
          { q: "한국 본사와 미국 현지 파트너의 역할은 어떻게 나누나요?",
            a: "브랜드의 사업모델과 계약구조에 따라 달라집니다. 일반적으로 한국 본사는 브랜드, 제품, 시스템, 핵심 노하우를 담당하고, 미국 현지 파트너는 시장개발, 운영, 현지 네트워크, 고객관리를 담당하는 구조를 검토할 수 있습니다." },
          { q: "E-2 비자 지원도 가능한가요?",
            a: "한국은 미국과 E-2 조약을 체결한 국가이며, E-2 투자자 비자를 통해 창업자가 미국에 체류하며 사업을 직접 운영하는 것이 가능합니다. K Bridge Partners는 이민법 전문 로펌 네트워크와 함께 E-2 비자 요건에 부합하는 사업 구조 설계, 최소 투자금 요건(현실적으로 $100K~$200K 이상), '비주변적 사업(non-marginal business)' 요건 충족을 위한 재무 계획 수립을 지원합니다. 비자 신청 서류 자체는 파트너 로펌이 담당합니다." },
        ],
      },
      {
        label: "진행 과정 · 소통",
        items: [
          { q: "진행 기간은 보통 얼마나 걸리나요?",
            a: "초기 상담부터 매장 오픈까지의 전체 여정은 통상 6~10개월이 소요됩니다. 법인 설립 및 인허가(4~6주), 상업용 부동산 탐색과 임대차 계약(2~4개월, 상권 상황에 따라 변동), 시공 및 오픈 준비(4~8주)가 주요 구간입니다. 여기에 프랜차이즈 규제(FDD) 등록이 필요한 경우 6~10주가 추가됩니다. 상세 일정은 킥오프 시점에 브랜드 상황에 맞춰 함께 확정합니다." },
          { q: "계약 후 첫 단계는 무엇인가요?",
            a: "계약 후 2주 이내에 킥오프 워크숍을 진행합니다. 브랜드의 사업 모델, 목표 시장, 예산, 타임라인을 상세히 정리하고, 담당 파트너 팀을 배정합니다. 이후 진출 대상 주(State)와 법인 형태 결정, 초기 시장 리서치 브리핑, 잠정 로드맵 확정 순으로 첫 4~6주가 구성됩니다." },
          { q: "영어를 못해도 진행 가능한가요?",
            a: "네, 전혀 문제없습니다. 모든 커뮤니케이션은 한국어로 진행되며, 미국 현지 파트너(변호사, 회계사, 임대인 등)와의 협상과 문서 검토도 K Bridge가 브랜드를 대신해 진행합니다. 필요한 경우 브랜드 측 담당자를 위한 요약 브리핑을 한국어로 별도 제공합니다. 영어는 브랜드의 미국 진출을 막는 이유가 되어서는 안 된다는 것이 저희의 원칙입니다." },
          { q: "미국에 아직 실체가 없는데도 상담 가능한가요?",
            a: "네, 오히려 실체를 만들기 전 단계에서 상담을 시작하시는 것이 이상적입니다. 법인 설립, 주(State) 선택, 초기 자본 구조 같은 결정은 이후 5년의 유연성을 좌우하기 때문입니다. 한국에 계신 상태에서도 화상 상담과 서면 자료 검토를 통해 충분히 초기 단계를 함께 진행할 수 있습니다." },
        ],
      },
      {
        label: "K Bridge Partners 소개",
        items: [
          { q: "K Bridge Partners는 어떤 기업을 대상으로 하나요?",
            a: "한국의 우수한 브랜드와 기업 중 미국 시장 진출 또는 사업 확장을 계획하는 기업을 대상으로 합니다. 주요 대상은 F&B, 프랜차이즈, Beauty & Wellness, Retail, Lifestyle을 포함한 다양한 K-Brand입니다." },
          { q: "K Bridge Partners는 단순한 컨설팅 회사인가요?",
            a: "아닙니다. 일반적인 컨설팅펌은 리서치와 리포트를 산출물로 제공합니다. K Bridge Partners는 그 이후의 실행을 함께합니다. 시장조사와 전략 수립에서 끝나지 않고, 법인 설립의 실무 서류, 임대차 협상 테이블, 시공 파트너 조율, 오픈 이후 초기 운영 안정화까지 — 실제 매장이 안정적으로 운영되기까지의 전 여정을 하나의 팀이 책임집니다. 그래서 저희는 프로젝트를 많이 맡지 않습니다. 각 브랜드에 충분한 시간을 투입할 수 있는 규모로만 파트너십을 유지합니다." },
          { q: "특정 산업/업종에 특화되어 있나요?",
            a: "F&B, 리테일, 뷰티, 라이프스타일 등 소비자 대상 브랜드의 오프라인 미국 진출에 특화되어 있습니다. 특히 상업용 부동산 실무 경험이 결정적인 카테고리 — 매장 운영 기반의 프랜차이즈, 리테일, 레스토랑, K-Beauty — 에서 가장 강점이 있습니다. B2B SaaS나 순수 이커머스는 핵심 영역이 아니며, 그런 경우 더 적합한 파트너를 소개해 드리기도 합니다." },
          { q: "미국 시장 진출의 어느 단계에서 K Bridge Partners에 문의하는 것이 좋나요?",
            a: "미국 진출을 결정하기 전 단계부터, 이미 미국 사업을 운영하고 있는 단계까지 모두 가능합니다. 가장 이상적인 시점은 진출을 본격적으로 결정하기 전, 시장성과 사업모델을 검토하는 단계입니다. 초기 단계에서 충분한 시장조사를 거치면 사업 리스크를 줄이고 보다 현실적인 진출 전략을 수립하는 데 도움이 됩니다." },
          { q: "이미 미국에서 사업을 시작한 기업도 도움을 받을 수 있나요?",
            a: "물론입니다. 이미 미국에 매장이 있거나 사업을 운영 중인 기업의 경우에도 추가 매장 개발, 프랜차이즈 확장, 입지 선정, 브랜드 현지화, 마케팅, 또는 새로운 지역 진출을 지원할 수 있습니다." },
          { q: "K Bridge Partners와 함께하면 미국 진출 과정에서 어디까지 지원받을 수 있나요?",
            a: "기업의 필요에 따라 지원 범위를 맞춤형으로 구성할 수 있습니다. 시장 조사 → 미국 진출 전략 → 사업 구조 설계 → 프랜차이즈 개발 → 파트너 · 투자자 발굴 → 입지 선정 → 브랜드 현지화 → 시장 런칭 → 사업 확장까지, 각 단계에 필요한 전문가와 네트워크를 연결하고 실행을 지원합니다. K Bridge Partners의 목표는 단순히 한국 브랜드를 미국에 소개하는 것이 아니라, 한국의 좋은 브랜드가 미국에서 실제 사업으로 자리 잡고 지속적으로 성장할 수 있도록 함께하는 것입니다." },
        ],
      },
    ],
  },
  en: {
    eyebrow: "FAQ",
    title: "Frequently Asked Questions.",
    subtitle: "The questions we hear most often from brands preparing to enter the U.S.",
    footer: "Have another question? Reach out directly.",
    cta: "Contact us",
    categories: [
      {
        label: "Getting Started",
        items: [
          { q: "What should a Korean brand prepare first before entering the U.S. market?",
            a: "The first step isn't entity formation or signing a lease — it's confirming fit between your brand and the market. That means analyzing your target customer, market size, competing brands, price point, consumer behavior, and regional market conditions before building an entry strategy suited to your brand. K Bridge Partners treats this initial market research and competitive analysis as the true starting point." },
          { q: "If a brand succeeded in Korea, will it succeed in the U.S.?",
            a: "Success in Korea doesn't guarantee success in the U.S. Consumer taste, price structure, competitive landscape, operating norms, and culture all differ, so a localization strategy suited to the U.S. is necessary. K Bridge Partners helps adapt your business model to U.S. consumers and market conditions while preserving what made the brand strong in the first place." },
          { q: "Do we have to form a U.S. entity?",
            a: "Not every brand needs the same approach. The right structure depends on your business model, operating style, target region, and tax and legal considerations. K Bridge Partners works with U.S.-based attorneys, CPAs, and other specialists to help you review the entity structure that fits your brand." },
          { q: "Which U.S. region is best to enter?",
            a: "There's no single right answer. It requires analyzing your target customer, demographics, income levels, competitive landscape, consumption patterns, rent, accessibility, traffic, and future expansion potential together. K Bridge Partners analyzes which regions fit your brand and business model and helps you compare candidate markets and trade areas." },
        ],
      },
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
        label: "Franchise",
        items: [
          { q: "What do we need to launch a franchise business in the U.S.?",
            a: "Launching a franchise in the U.S. requires a thorough review of your business model, contract structure, and disclosure obligations. It's especially important to check both the federal FTC Franchise Rule and the individual regulations of each state you plan to enter. K Bridge Partners connects you with franchise attorneys and other specialists for the preparation this requires." },
          { q: "What is an FDD (Franchise Disclosure Document)?",
            a: "The FDD is the disclosure document required by the U.S. Federal Trade Commission, giving prospective franchisees the information they need to make a decision. Under the FTC Franchise Rule, it requires detailed disclosure across 23 items — company overview, financials, royalty and initial-fee structure, territorial rights, and more — and must generally be provided at least 14 days before any contract is signed or payment is required. Certain states, including California, New York, and Virginia, also require separate state registration. K Bridge Partners doesn't draft the FDD itself, but works closely with franchise attorneys to support the process end-to-end." },
          { q: "How long does preparing an FDD take?",
            a: "Typically 6–10 weeks, though it depends on your existing business model, financial records, operating systems, contract structure, and the state you're entering. Rather than fixing a date first, it's more useful to assess your current readiness and identify what materials and professional support you'll need." },
          { q: "How are franchise fee and royalty determined?",
            a: "Franchise fee and royalty should reflect brand value, the scope of initial support, operating costs, industry, competing franchises, and market conditions. Rather than simply matching competitor numbers, the goal is a structure that keeps both franchisor profitability and franchisee viability intact." },
          { q: "What's the difference between Master Franchise and Area Development?",
            a: "A Master Franchise grants a partner the right to develop and operate the franchise across a defined territory. Area Development grants a specific developer the right — and obligation — to open multiple units within a defined area. Which structure fits depends on your growth goals and U.S. expansion strategy." },
          { q: "How do we find franchisees in the U.S.?",
            a: "It's important to identify prospective franchisees who fit your business model and target region, and to confirm alignment between your brand's terms and the candidate's. K Bridge Partners supports this through our network, market presence, and business development activity." },
          { q: "Can we use our Korean franchise system as-is in the U.S.?",
            a: "Some elements can carry over directly, but applying everything unchanged isn't advisable. Menu, pricing, supply chain, training, staffing, customer service, marketing, and store operations may all need adjustment for the U.S. market." },
        ],
      },
      {
        label: "Real Estate & Site Selection",
        items: [
          { q: "How do we choose our first U.S. location?",
            a: "Your first location affects brand perception and future expansion potential, so it deserves careful evaluation — demographics, consumer profile, foot traffic, visibility, parking, accessibility, competitive landscape, lease terms, and planned area development all factor in." },
          { q: "What's the most important factor in judging a good trade area?",
            a: "Foot traffic alone isn't enough to judge a trade area. You need to analyze how many of your actual target customers are present, how much competition exists, how accessible the location is, and whether rent is reasonable relative to expected sales." },
          { q: "Is cheaper rent always a better deal?",
            a: "Not necessarily. The balance between rent and revenue potential matters more than rent alone. K Bridge Partners compares site candidates by weighing expected customer base, revenue potential, foot traffic, competition, and lease terms together." },
          { q: "Can K Bridge Partners find site candidates for us?",
            a: "Yes. Based on your industry and target market, we review suitable regions and trade areas, and connect you with vetted commercial real estate professionals and brokers as needed." },
          { q: "Do you review commercial lease agreements?",
            a: "K Bridge Partners reviews lease structures from a business and negotiation standpoint, and supports collaboration with the right specialists. Legal review and formal legal advice are always handled by a licensed attorney in the relevant state." },
        ],
      },
      {
        label: "Brand Localization",
        items: [
          { q: "Does a Korean brand need to be localized for U.S. consumers?",
            a: "In most cases, some degree of localization is necessary. While preserving your brand's core identity, menu, pricing, marketing messaging, customer service, in-store experience, and operations can all be adjusted to meet U.S. consumer expectations." },
          { q: "Should we emphasize that we're a Korean brand in the U.S.?",
            a: "It depends on the brand and category. Korean heritage can be a powerful brand asset in some cases, but connecting to what U.S. consumers actually value matters more. K Bridge Partners helps you find positioning that preserves your Korean identity while communicating effectively to U.S. consumers." },
          { q: "Can we sell our popular Korean menu items as-is in the U.S.?",
            a: "Not necessarily. U.S. consumer taste, eating habits, pricing, menu composition, and regional characteristics may call for adjusting some items or adding new ones. What matters is preserving what made you successful in Korea while staying competitive in the U.S. market." },
          { q: "How should we price for the U.S. market?",
            a: "Pricing shouldn't be a simple currency conversion of your Korean prices. Local competitive pricing, cost of goods, labor, rent, willingness to pay, brand positioning, and target profitability all need to be considered together." },
        ],
      },
      {
        label: "Partners & Investment",
        items: [
          { q: "Do you help find business partners or investors in the U.S.?",
            a: "Yes. We help identify franchisees, area developers, investors, and business partners who fit your business model and entry strategy. Rather than introducing as many candidates as possible, we focus on finding partners who genuinely match your brand's terms and growth strategy." },
          { q: "What's the difference between a franchisee and an investor?",
            a: "A franchisee typically operates the business directly under a franchise agreement. An investor provides capital, and their level of operational involvement depends on the investment structure. Which structure fits depends on your goals for U.S. entry and growth." },
          { q: "Can you connect us with attorneys, CPAs, insurance providers, and others?",
            a: "Yes. Starting a business in the U.S. requires specialists across legal, accounting, tax, insurance, finance, and real estate. K Bridge Partners identifies what your project needs and connects you with the right local professionals." },
          { q: "How are responsibilities split between Korean HQ and the U.S. local partner?",
            a: "This depends on your business model and contract structure. Typically, Korean HQ owns the brand, product, systems, and core know-how, while the U.S. local partner handles market development, operations, local network, and customer relationships — though the right structure is worth reviewing case by case." },
          { q: "Do you support E-2 investor visas?",
            a: "South Korea is an E-2 treaty country with the U.S., which allows Korean founders to reside in the U.S. and operate their business directly under the E-2 visa. K Bridge, working with a network of immigration attorneys, supports the structural work — designing a business that meets the minimum investment threshold (realistically $100K–$200K+), and building financial plans that satisfy the 'non-marginal business' requirement. The visa filing itself is handled by our partner law firm." },
        ],
      },
      {
        label: "Process & Communication",
        items: [
          { q: "How long does the whole process typically take?",
            a: "From first consultation to store opening usually takes 6–10 months. Key phases: entity formation and permits (4–6 weeks), commercial real estate search and lease (2–4 months, varies by market), buildout and opening prep (4–8 weeks). Add 6–10 weeks for FDD state registration if franchising. We finalize the detailed schedule with you at kickoff." },
          { q: "What's the first step after we sign?",
            a: "Within two weeks of signing we run a kickoff workshop — mapping business model, target market, budget, and timeline, and assigning your partner team. The first 4–6 weeks then cover state selection, entity structure decisions, initial market research briefing, and roadmap lock." },
          { q: "Can we proceed without English fluency?",
            a: "Yes — absolutely. All communication with K Bridge is in Korean, and we handle negotiations and document review with U.S. partners (lawyers, accountants, landlords) on your behalf. When needed, we provide summarized briefings in Korean for your team. English should never be the reason a good Korean brand can't enter the U.S." },
          { q: "Can we start before we have a U.S. entity?",
            a: "Yes — in fact, it's ideal to start before you have any U.S. entity. Decisions about which state to form in, entity type, and initial capital structure determine your flexibility for the next five years. We can run the early phases entirely via video consultation and document review while you're still based in Korea." },
        ],
      },
      {
        label: "About K Bridge Partners",
        items: [
          { q: "What kind of companies does K Bridge Partners work with?",
            a: "We work with strong Korean brands and companies planning U.S. market entry or expansion. Our core focus spans F&B, franchise, beauty & wellness, retail, lifestyle, and other consumer-facing K-brands." },
          { q: "Is K Bridge Partners just a consulting firm?",
            a: "No. A typical consulting firm delivers research and reports. K Bridge Partners executes alongside you. We don't stop at strategy — we handle entity paperwork, sit at the lease negotiation table, coordinate builders, and stay with you through post-opening stabilization. Because of that, we keep our engagement count small: only as many partnerships as we can give real time to." },
          { q: "Do you focus on specific industries?",
            a: "We specialize in offline U.S. market entry for consumer brands — F&B, retail, beauty, and lifestyle. Our edge is strongest in categories where commercial real estate experience is decisive: franchise, retail, restaurants, and K-Beauty. B2B SaaS or pure e-commerce isn't our core; when it comes to us, we often refer to more fitting partners." },
          { q: "At what stage should we reach out to K Bridge Partners?",
            a: "Anywhere from before you've decided to enter the U.S. to after you're already operating here. The ideal moment is before you've fully committed, while you're still evaluating market fit and business model — early market research reduces risk and leads to a more realistic entry strategy." },
          { q: "Can companies already operating in the U.S. still work with you?",
            a: "Absolutely. For brands that already have U.S. stores or operations, we support additional store development, franchise expansion, site selection, brand localization, marketing, and entry into new regions." },
          { q: "How far can K Bridge Partners support us through the U.S. entry process?",
            a: "Support is tailored to what your company needs. From market research → U.S. entry strategy → business structure → franchise development → partner and investor development → site selection → brand localization → market launch → expansion, we connect the right experts and network at each stage and support execution. Our goal isn't simply to introduce Korean brands to the U.S. — it's to help great Korean brands take root and grow sustainably as real businesses here." },
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
