from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import re
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="K Bridge Partners API")
api_router = APIRouter(prefix="/api")


# ============= Models =============

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    company: Optional[str] = None
    email: str
    phone: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactMessageCreate(BaseModel):
    name: str
    company: Optional[str] = None
    email: EmailStr
    phone: Optional[str] = None
    message: str


class InsightPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str
    title: str
    category: str
    excerpt: str
    content: str
    author: str = "K Bridge Partners"
    cover_image: Optional[str] = None
    reading_time: int = 5
    published: bool = True
    order: int = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class InsightPostCreate(BaseModel):
    title: str
    category: str
    excerpt: str
    content: str
    author: Optional[str] = "K Bridge Partners"
    cover_image: Optional[str] = None
    reading_time: Optional[int] = 5
    published: Optional[bool] = True
    order: Optional[int] = 0


def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    return text.strip('-') or str(uuid.uuid4())[:8]


def serialize_doc(doc: dict) -> dict:
    if doc and '_id' in doc:
        doc.pop('_id')
    if doc and 'created_at' in doc and isinstance(doc['created_at'], str):
        try:
            doc['created_at'] = datetime.fromisoformat(doc['created_at'])
        except Exception:
            pass
    return doc


# ============= Routes =============

@api_router.get("/")
async def root():
    return {"message": "K Bridge Partners API", "status": "ok"}


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(payload: ContactMessageCreate):
    msg = ContactMessage(**payload.model_dump())
    doc = msg.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_messages.insert_one(doc)
    return msg


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contact_messages(limit: int = Query(100, ge=1, le=500)):
    docs = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    return [serialize_doc(d) for d in docs]


@api_router.get("/insights", response_model=List[InsightPost])
async def list_insights(limit: int = Query(50, ge=1, le=200)):
    docs = await db.insights.find({"published": True}, {"_id": 0}).sort("order", 1).to_list(limit)
    return [serialize_doc(d) for d in docs]


@api_router.get("/insights/{slug}", response_model=InsightPost)
async def get_insight(slug: str):
    doc = await db.insights.find_one({"slug": slug}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Insight not found")
    return serialize_doc(doc)


@api_router.post("/insights", response_model=InsightPost)
async def create_insight(payload: InsightPostCreate):
    base_slug = slugify(payload.title)
    slug = base_slug
    counter = 1
    while await db.insights.find_one({"slug": slug}):
        slug = f"{base_slug}-{counter}"
        counter += 1
    post = InsightPost(slug=slug, **payload.model_dump())
    doc = post.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.insights.insert_one(doc)
    return post


# ============= Seed =============

# Slugs of the older seed set (pre-2026-02) — removed at startup so the 10
# curated articles below can take their place.
LEGACY_SLUGS_TO_REMOVE = [
    "korean-brands-us-lease-mistakes",
    "franchise-vs-direct-entry",
    "understanding-us-commercial-lease-terms",
    "site-selection-methodology",
]

SEED_INSIGHTS = [
    {
        "slug": "foreign-owned-ein-application-timeline",
        "order": 1,
        "title": "해외 소유 법인, EIN 발급이 왜 더 오래 걸릴까",
        "category": "법인 · 비자",
        "excerpt": "미국 SSN이나 ITIN이 없는 한국인 오너는 IRS의 온라인 즉시 발급을 이용할 수 없어, 팩스·우편 접수만 가능합니다. 이로 인해 법인 설립 일정이 실질적으로 몇 주 늘어납니다.",
        "content": "EIN(Employer Identification Number)은 미국 법인 운영의 시작점입니다. 은행 계좌 개설, 세무 신고, 라이센싱 — 모두 EIN이 발급된 이후에야 가능합니다.\n\n미국인 SSN 소지자는 IRS 온라인 도구를 통해 몇 분 안에 EIN을 발급받습니다. 그러나 SSN이나 ITIN이 없는 해외 오너는 이 경로를 사용할 수 없습니다.\n\n대신 Form SS-4를 팩스 또는 우편으로 접수해야 하며, 접수 방식에 따라 처리 기간이 다음과 같이 달라집니다.\n\n팩스 접수: 통상 4~6영업일\n우편 접수: 4~6주 소요 (지연되는 경우 8주 이상)\n\n실무에서는 팩스 접수를 우선하지만, IRS 팩스 회선의 병목으로 인해 최근에는 팩스로도 2~3주가 걸리는 경우가 많습니다.\n\n대응 방법\n1) 킥오프 시점부터 EIN 신청을 병행 진행\n2) 법인 등록과 SS-4 접수를 동시에 진행해 병목 최소화\n3) IRS International Applications 라인((267) 941-1099)으로 전화 신청 (일부 케이스만 해당)\n\n결론: 해외 소유 법인의 EIN 발급은 국내 설립 대비 3~5주가 추가로 소요될 수 있음을 초기 일정에 반영해야 합니다.",
        "reading_time": 6,
        "cover_image": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    },
    {
        "slug": "e2-investor-visa-korean-founders",
        "order": 2,
        "title": "E-2 투자자 비자, 한국 창업자가 반드시 알아야 할 것",
        "category": "법인 · 비자",
        "excerpt": "한국은 E-2 조약 체결국이지만, 승인의 관건은 '50% 이상 소유 요건'과 '비주변적 사업(non-marginal business)' 요건입니다.",
        "content": "E-2 비자는 미국과 조약을 체결한 국가의 국민이 미국에 실질적 투자를 하고 그 사업을 직접 운영할 때 발급되는 비이민 비자입니다. 한국은 E-2 조약국이므로, 이 경로는 한국 창업자에게 열려 있습니다.\n\n하지만 승인의 관건은 두 가지입니다.\n\n1) 50% 이상의 조약국 국적 소유\n미국 법인의 지분 50% 이상을 한국 국적자가 보유해야 하며, 이 요건은 최종 심사 시점까지 유지되어야 합니다.\n\n2) '비주변적 사업(Non-Marginal Business)' 요건\n단순히 오너와 그 가족을 부양하는 수준을 넘어, 미국 경제에 실질적 기여를 하는 사업이어야 합니다. 실무적으로는 다음이 확인됩니다.\n- 오너 외 미국인 고용 계획\n- 5년 재무 프로젝션의 성장 궤도\n- 초기 자본과 매출 규모의 비례 관계\n\n최소 투자 금액\n법령상 명확한 금액은 없지만, 실무에서는 $100K~$200K 이상이 안전선으로 간주됩니다. 다만 카테고리와 사업 규모에 따라 상한선도 유연합니다.\n\n승인이 거절되는 주요 사유는 대부분 '비주변적 사업' 요건 미충족입니다. 사업 계획서의 재무 시뮬레이션과 고용 계획을 얼마나 실질적으로 뒷받침하는지가 핵심입니다.\n\nK Bridge는 이민법 전문 로펌 네트워크와 함께 E-2 요건에 부합하는 사업 구조 설계를 지원합니다. 비자 신청 서류 자체는 파트너 로펌이 담당합니다.",
        "reading_time": 7,
        "cover_image": "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    },
    {
        "slug": "percentage-rent-lease-clause",
        "order": 3,
        "title": "퍼센티지 임대료(Percentage Rent), 계약서에서 놓치기 쉬운 조항",
        "category": "상업 부동산",
        "excerpt": "기본 임대료(base rent)에 매출액의 일정 %를 추가로 지불하는 구조. 브레이크포인트와 매출 감사 조항이 실제 부담을 좌우합니다.",
        "content": "미국 리테일 임대차, 특히 몰(mall)과 파워 센터에서 자주 등장하는 조항이 퍼센티지 임대료입니다.\n\n구조: 기본 임대료(Base Rent) + (매출 - Breakpoint) × 지정된 %\n\nBreakpoint(브레이크포인트)는 매출이 이 금액을 넘으면 초과 매출에 대해 퍼센티지 임대료가 발생하는 기준선입니다. 통상 다음 두 가지 방식이 사용됩니다.\n\n- Natural Breakpoint: 기본 임대료 ÷ 퍼센티지 = 브레이크포인트 (임차인에게 유리)\n- Artificial Breakpoint: 임대인과 협상으로 결정된 별도 기준선 (임대인에게 유리)\n\n실무 예시\n기본 임대료 $10K/월, 퍼센티지 6%, Natural Breakpoint의 경우:\n브레이크포인트 = $10K ÷ 6% = $167K/월 매출\n$200K 매출 발생 시: 초과 $33K × 6% = $2K의 퍼센티지 임대료가 기본 임대료에 추가로 부과됩니다.\n\n놓치기 쉬운 사항\n1) 매출 정의 (Gross Sales의 범위): 반품, 종업원 판매, 온라인 픽업이 포함되는지 명시\n2) 매출 감사 조항 (Audit Rights): 임대인이 실제 매출을 감사할 수 있는 권리와 조건\n3) 최소 임대료 보장 (Guaranteed Minimum): 매출이 낮아도 기본 임대료는 유지\n\n협상 포인트: 브레이크포인트를 Natural로 설정하고, Gross Sales 정의에서 온라인 매출과 기프트 카드 판매를 명확히 제외하는 것이 핵심입니다.",
        "reading_time": 7,
        "cover_image": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    },
    {
        "slug": "co-tenancy-clause-anchor-tenant-loss",
        "order": 4,
        "title": "코테넌시 조항이 없으면 생기는 일",
        "category": "상업 부동산",
        "excerpt": "앵커 테넌트가 떠난 몰, 65~85% 아래로 떨어진 점유율. 코테넌시 조항이 없으면 임차인이 감당해야 합니다.",
        "content": "쇼핑 센터에 입점할 때, 그 센터의 앵커 테넌트(예: 대형 백화점, 슈퍼마켓)가 얼마나 트래픽을 만들어내는지가 매장의 매출을 크게 좌우합니다. 만약 앵커 테넌트가 떠난다면?\n\n코테넌시 조항(Co-Tenancy Clause)은 다음과 같은 상황에서 임차인에게 임대료 감면 또는 계약 해지 권리를 부여합니다.\n\n타입 1: Named Co-Tenancy\n특정 앵커 테넌트(예: \"Macy's\")가 이탈할 경우 발동. 명시된 브랜드에만 적용되므로, 브랜드 지정에 신중해야 합니다.\n\n타입 2: Occupancy Percentage Co-Tenancy\n센터 전체 점유율이 특정 % (통상 65~85%) 아래로 떨어질 경우 발동.\n\n타입 3: Combined Co-Tenancy\n앵커 + 점유율 조건을 결합. 임차인에게 가장 유리한 구조.\n\n발동 시 구제 방법\n1) 감액 임대료 (Reduced Rent): 통상 50~75% 수준으로 조정\n2) 매출 연동 임대료 (Alternative Rent): 매출의 일정 %만 지불\n3) 계약 해지권 (Termination Right): 6~12개월의 시정 기간 후 이탈 가능\n\n협상 포인트\n임대인은 대부분 코테넌시 조항 자체에 저항합니다. 신규 브랜드 진출 시 협상 여지는 제한적이지만, 다음 조건을 요구할 수는 있습니다.\n- 앵커 이탈 후 6개월 이상 지속되면 감액 임대료 발동\n- 대체 앵커 유치 시 조항 해제\n- 12개월 이상 지속 시 계약 해지권\n\n결론: 몰이나 파워 센터에 입점한다면, 코테넌시 조항 없이 계약하지 않는 것이 원칙입니다.",
        "reading_time": 6,
        "cover_image": "https://images.unsplash.com/photo-1568992687947-868a62a9f521?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    },
    {
        "slug": "commercial-lease-terms-by-industry",
        "order": 5,
        "title": "미국 상업 임대차 계약, 업종별로 기간이 다른 이유",
        "category": "상업 부동산",
        "excerpt": "오피스는 3~7년, 리테일은 5~10년, 레스토랑은 10~15년+. 초기 투자 회수와 유연성의 트레이드오프.",
        "content": "미국 상업 임대차의 초기 계약 기간은 업종별로 상당한 편차를 보입니다. 이 편차는 자의적이지 않으며, 각 업종의 초기 자본 투자 규모와 매출 안정화까지의 시간을 반영합니다.\n\n오피스 (3~7년)\n초기 시공비가 비교적 낮고, 팀 규모 변동에 따른 유연성이 중요합니다. 임대인은 3~5년 기본 계약에 갱신 옵션을 붙이는 구조를 선호합니다.\n\n리테일 (5~10년)\n인테리어 시공과 매장 브랜딩에 상당한 초기 투자가 필요하므로, 회수 기간을 확보하기 위해 5년 이상이 표준입니다. 프리미엄 위치일수록 임대인이 더 긴 계약을 요구하는 경향.\n\n레스토랑 (10~15년+)\n주방 설비, 배관·환기 시공에 $500K~$1M+ 규모의 자본이 투입되므로 회수 기간이 길어야 합니다. 15년 계약도 흔하며, 통상 5년 갱신 옵션이 2회 이상 첨부됩니다.\n\n프랜차이즈 매장 (프랜차이즈 계약과 일치)\n프랜차이지의 프랜차이즈 계약 기간(통상 10년)과 임대 기간을 일치시키는 것이 원칙입니다. 프랜차이즈 종료 후 임대만 남는 상황을 방지하기 위함입니다.\n\n갱신 옵션(Renewal Option)의 중요성\n초기 계약 시점에 갱신 옵션을 반드시 확보해야 합니다. 옵션이 없으면 임대인이 재계약 시점에 대폭 임대료 인상을 요구할 수 있습니다. 일반적인 갱신 옵션 구조:\n\n- 갱신 기간: 5년 단위\n- 임대료: Fair Market Rent 또는 3~4% 연간 인상 중 낮은 것\n- 통지 기간: 만료 12~18개월 전\n\n결론: 업종별 표준 기간을 기준으로 협상을 시작하되, 갱신 옵션 확보에 협상 자원의 상당 부분을 배분해야 합니다.",
        "reading_time": 6,
        "cover_image": "https://images.unsplash.com/photo-1554224154-26032ffc0d07?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    },
    {
        "slug": "franchise-registration-states",
        "order": 6,
        "title": "프랜차이즈 등록이 필요한 14개 주, 어디인가",
        "category": "프랜차이즈",
        "excerpt": "연방 FDD 외에 별도의 주 등록이 필요한 등록주(Registration States)와 통보주(Filing States)의 실제 리스트와 검토 기간.",
        "content": "미국에서 프랜차이즈를 판매하려면 연방거래위원회(FTC)가 요구하는 FDD(Franchise Disclosure Document)를 준비해야 합니다. 그러나 일부 주는 여기에 더해 별도의 주 등록(State Registration) 또는 통보(Filing)를 요구합니다.\n\n등록주 (Registration States) — 사전 승인 필요\n다음 14개 주에서는 FDD를 주 당국에 제출하고 검토·승인을 받아야 프랜차이즈 판매가 가능합니다.\n\n- California, Hawaii, Illinois, Indiana, Maryland, Michigan (주로 통보), Minnesota, New York, North Dakota, Rhode Island, South Dakota, Virginia, Washington, Wisconsin\n\n검토 기간 (실무 기준)\n- California: 4~6주\n- New York: 6~8주\n- Virginia: 4~6주\n- Illinois: 4~6주\n\n다수 주에 동시 등록할 경우 전체 기간은 가장 오래 걸리는 주의 기간에 수렴합니다. 통상 2~3개월을 잡아야 안전합니다.\n\n통보주 (Filing States) — 단순 접수\n다음 주는 사전 승인은 필요 없지만, 프랜차이즈 판매 전 통보(Filing) 의무가 있습니다.\n\n- Connecticut, Florida, Kentucky, Nebraska, North Carolina, South Carolina, Texas, Utah\n\n비등록주\n위 리스트에 없는 주는 연방 FDD만 준비하면 프랜차이즈 판매가 가능합니다.\n\n초기 진출 시 전략\n1) 첫 진출 도시의 주가 등록주라면, 그 주 등록을 우선 완료\n2) 인근 확장 예상 주가 통보주라면, 첫 등록과 병렬 진행\n3) 다수 등록주를 한 번에 진행할지, 순차적으로 진행할지는 자본과 스케줄에 따라 결정\n\n결론: 진출 첫해에 어느 주에서 프랜차이지를 모집할지에 따라 FDD 준비의 우선순위와 스케줄이 결정됩니다. 이 결정은 시장 진입 전략 초기 단계에서 확정되어야 합니다.",
        "reading_time": 7,
        "cover_image": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    },
    {
        "slug": "direct-vs-franchise-vs-jv",
        "order": 7,
        "title": "직진출 vs 프랜차이즈 vs JV: 어떤 방식이 맞을까",
        "category": "시장 진입 전략",
        "excerpt": "자본 부담, 통제력, 시장 진입 속도. 세 가지 진입 방식은 이 세 축에서 근본적으로 다릅니다.",
        "content": "미국 시장 진입 방식은 크게 세 가지로 나뉩니다. 각 방식은 자본 부담, 브랜드 통제력, 진입 속도에서 서로 다른 트레이드오프를 가집니다.\n\n직진출 (Direct Entry)\n- 자본 부담: 매우 높음. 매장당 $500K~$1.5M 초기 자본 + 6개월 운영 자금.\n- 브랜드 통제력: 최고. 매장 운영, 인력, 마케팅 모두 직접 관리.\n- 진입 속도: 느림. 첫 매장 오픈까지 6~12개월. 다수 매장 확장에 자본 부담이 급증.\n- 적합한 브랜드: 브랜드 자산이 여전히 진화 중이고, 초기 소수 매장으로 시장 반응을 정밀 확인해야 하는 경우.\n\n프랜차이즈 (Franchise)\n- 자본 부담: 낮음. 프랜차이지 자본으로 확장하며, 본사는 FDD 준비와 로열티 수취 구조에 집중.\n- 브랜드 통제력: 중간. SOP와 매뉴얼로 표준화하지만, 매장 운영은 프랜차이지 재량.\n- 진입 속도: 상대적으로 빠름. FDD 준비(6~10주) + 첫 프랜차이지 확보 + 오픈까지 8~12개월.\n- 적합한 브랜드: 국내에서 검증된 SOP를 갖추고 있으며, 확장 속도가 자본 능력을 앞서는 경우.\n\n조인트 벤처 (Joint Venture)\n- 자본 부담: 중간. 미국 파트너와 자본을 분담. 지분 구조에 따라 20~80% 사이.\n- 브랜드 통제력: 지분과 계약에 따라 결정. 잘 설계하면 통제 유지, 잘못 설계하면 브랜드 방향성 상실 위험.\n- 진입 속도: 파트너의 부동산·운영 네트워크를 활용하면 가장 빠를 수 있음.\n- 적합한 브랜드: 미국 시장의 부동산·운영 노하우가 절실하고, 지분 일부 양보로 이를 확보할 의사가 있는 경우.\n\n결정 프레임워크\n1) 자본 여력: 5년간 최소 몇 개 매장을 자본으로 감당할 수 있는가?\n2) 브랜드 성숙도: SOP가 매뉴얼화되어 있는가? 프랜차이지가 재현 가능한가?\n3) 확장 속도의 시장 기회: 진입 창구가 5년인가, 2년인가?\n\n실무에서는 세 방식을 순차적으로 결합하는 경우도 많습니다. 초기 1~2년은 직진출로 브랜드 검증, 이후 프랜차이즈로 확장, 특정 시장은 JV로 진입 — 이런 하이브리드 구조가 자본 효율과 통제력의 균형을 맞추는 데 유리합니다.",
        "reading_time": 8,
        "cover_image": "https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    },
    {
        "slug": "dc-nova-korean-corridor",
        "order": 8,
        "title": "워싱턴 DC · 버지니아 한인 상권, 무엇이 다른가",
        "category": "시장 진입 전략",
        "excerpt": "Annandale, Centreville, Fairfax — 북부 버지니아의 한인 커뮤니티 상권은 뉴욕·LA와 다른 결을 갖습니다.",
        "content": "뉴욕과 LA가 미국 내 대표적인 한인 상권으로 알려져 있지만, 워싱턴 DC 광역권(북부 버지니아 중심)의 한인 커뮤니티도 이에 못지않게 밀도 높은 상권을 형성하고 있습니다.\n\n북부 버지니아 한인 상권의 특징\n1) 소득 수준\n연방 정부와 국제기관 종사자가 밀집한 지역 특성상 소득 중앙값이 높고, 프리미엄 카테고리에 대한 수요가 상대적으로 견고합니다.\n\n2) 밀집도\nAnnandale과 Centreville은 한인 밀집 상권의 대표 지역으로, 한식당, K-Beauty, K-Pop 굿즈, 한인 마트, 학원, 병원까지 완결된 생태계가 형성되어 있습니다.\n\n3) 부동산 특징\nLA·뉴욕 대비 임대료 부담이 낮고, 리테일 공간의 회전율이 상대적으로 낮아 안정적인 임대 관계 형성이 가능합니다.\n\n4) 소비 패턴\n뉴욕처럼 트렌드 실험적 소비보다는, 검증된 브랜드를 반복 소비하는 패턴이 두드러집니다. 진입 초기 리스크가 낮은 반면, 폭발적 확장 가능성은 뉴욕만큼 크지 않습니다.\n\nDC 도심\n반면 DC 도심(다운타운, Georgetown, Dupont Circle 등)은 관광객과 젊은 프로페셔널을 타겟팅한 프리미엄 브랜드 진출에 유리합니다. 이 지역은 한인 커뮤니티보다는 미국 주류 소비자를 겨냥한 포지셔닝이 적합합니다.\n\n주요 상권별 특징\n- Annandale (버지니아): 한인 커뮤니티의 심장. F&B, 리테일, 서비스 모두 밀집.\n- Centreville (버지니아): 젊은 한인 가족 인구 중심. 학원, F&B, 소비재 강세.\n- Fairfax (버지니아): 오피스와 리테일이 혼합된 균형 시장.\n- Tysons Corner (버지니아): 프리미엄 몰 중심. 미국 주류 시장 진출용.\n- Georgetown (DC): 프리미엄 라이프스타일 브랜드. 관광객 트래픽.\n\n결론: 북부 버지니아는 첫 매장 오픈으로 브랜드를 미국 시장에 안착시키기에 자본 부담과 리스크가 상대적으로 낮은 시장입니다. 이후 확장은 뉴욕·LA로 이어지는 것이 자연스러운 경로입니다.",
        "reading_time": 7,
        "cover_image": "https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    },
    {
        "slug": "first-90-days-post-opening",
        "order": 9,
        "title": "오픈 후 첫 90일, 무엇을 점검해야 하나",
        "category": "매장 오픈 · 운영",
        "excerpt": "스태프 이탈률, 매출 대 예측, 실질 임대료 부담 — 안정화 여부를 판단하는 구체적 지표.",
        "content": "매장 오픈은 성공의 종착점이 아니라 안정화의 출발점입니다. 오픈 후 첫 90일은 매장이 지속 가능한 운영 궤도에 진입하는지, 조기 개입이 필요한지를 판단하는 결정적 기간입니다.\n\n1) 스태프 이탈률 (Turnover Rate)\n첫 30일 이탈률이 15%를 넘으면 조기 경보입니다. 30% 이상이면 매니지먼트 구조를 재점검해야 합니다.\n\n주요 원인\n- 트레이닝 부실\n- 근무 스케줄의 불안정성\n- 매니저의 커뮤니케이션 스타일\n\n대응: 매주 스태프 1:1 미팅, 30일 시점 리뷰, 60일 시점 재검토.\n\n2) 매출 대 예측 (Sales vs. Projection)\n첫 30일 매출이 예측의 70% 이하면 재무 모델을 재점검해야 합니다.\n\n분석 프레임\n- 트래픽 (Traffic): 예측 대비 실제 방문객 수\n- 전환율 (Conversion): 방문객 중 구매로 이어진 비율\n- 객단가 (Average Ticket): 1인당 평균 구매 금액\n\n어느 지표가 예측을 벗어났는지 파악하면 개입 방향이 달라집니다. 트래픽 부족이면 마케팅, 전환율 부족이면 매장 경험, 객단가 부족이면 상품 구성.\n\n3) 실질 임대료 부담 (Effective Rent Load)\n임대료가 매출의 몇 %를 차지하는지 매월 계산해야 합니다. 리테일 카테고리별 안전선:\n\n- F&B: 매출의 8~12%\n- 리테일: 매출의 10~15%\n- 프리미엄 F&B: 매출의 6~10%\n\n임대료 부담이 안전선을 크게 초과하면 90일 시점에 임대인과의 조기 대화가 필요합니다.\n\n4) NNN Reconciliation 실제 값\n계약 시점의 NNN 추정치와 실제 청구액이 다를 수 있습니다. 첫 3개월 청구서를 검토해 연간 예상치를 조정해야 합니다.\n\n5) 리뷰 및 온라인 평판\nGoogle Reviews, Yelp, Instagram의 초기 리뷰 흐름은 이후 6개월 매출에 지속적으로 영향을 미칩니다. 부정적 리뷰가 3개 이상 누적되면 즉시 대응 프로토콜을 실행해야 합니다.\n\n90일 시점의 종합 판단\n- 스태프 이탈률 < 15%\n- 매출 > 예측의 80%\n- 임대료 부담 안전선 내\n- 부정 리뷰 관리 프로토콜 작동\n\n이 네 가지가 충족되면 매장이 안정화 궤도에 진입했다고 판단할 수 있습니다.",
        "reading_time": 8,
        "cover_image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    },
    {
        "slug": "personal-guarantee-negotiation",
        "order": 10,
        "title": "개인 보증(Personal Guarantee), 서명 전 확인해야 할 것",
        "category": "법인 설립",
        "excerpt": "미국 진출 초기 법인은 신용 이력이 없어 임대인이 대표 개인 보증을 요구합니다. 그러나 무제한 보증에 서명해서는 안 됩니다.",
        "content": "미국 상업 임대차 계약을 하려는 신설 법인은 대부분 신용 이력(credit history)이 없습니다. 이 경우 임대인은 대표(founder) 또는 주요 오너의 개인 보증(Personal Guarantee, PG)을 요구합니다.\n\n개인 보증이란\n임대료 미납, 계약 위반 등의 상황에서 법인이 지불하지 못할 경우, 개인이 자산으로 책임진다는 계약입니다. 잘못 서명하면 사업 실패가 개인 자산까지 침해할 수 있습니다.\n\n무제한 개인 보증(Unlimited PG)의 위험\n계약 전체 기간(예: 10년) 동안 발생 가능한 모든 채무에 개인 책임. $10K 임대료 × 120개월 = $1.2M+ 잠재 노출.\n\n협상 가능한 구조 4가지\n\n1) Good Guy Guaranty (GGG) — 가장 협상 가능한 구조\n임차인이 계약 위반을 즉시 통보하고, 매장을 임대인이 요구한 상태로 반납할 경우 개인 보증 책임이 제한되는 구조. 미납 임대료는 반납일까지만 개인 부담.\n\n2) 캡드 보증 (Capped PG)\n개인 책임의 최대 금액을 미리 설정. 예: \"최대 12개월분 임대료까지\" — $10K × 12 = $120K로 노출 제한.\n\n3) 번오프 조항 (Burn-Off Clause)\n계약 기간이 진행되면서 개인 보증 금액이 점진적으로 감소하거나 소멸. 예: \"3년 시점부터 매년 25%씩 감소, 6년 후 소멸\".\n\n4) 매출 마일스톤 기반 소멸\n특정 매출 마일스톤 달성 시 개인 보증 자동 소멸. 예: \"연 매출 $2M 도달 시점부터 개인 보증 소멸\".\n\n실무 협상 순서\n1) 첫 번째 시도: 개인 보증 없음 (신규 진출 시 대부분 거절)\n2) 두 번째: GGG + Burn-Off\n3) 세 번째: Capped PG + Burn-Off\n4) 최소한이라도 무제한이 아닌 캡드 구조 확보\n\nK Bridge는 임대인의 협상 여지를 초기 미팅에서 파악해, 브랜드에 유리한 개인 보증 구조를 이끌어내는 협상을 대행합니다. 개인 보증 조항은 서명 전 반드시 이민법·회사법 전문 변호사의 검토를 거쳐야 합니다.",
        "reading_time": 8,
        "cover_image": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    },
]


@app.on_event("startup")
async def seed_insights():
    # Remove any legacy seed posts to make room for the curated 10.
    if LEGACY_SLUGS_TO_REMOVE:
        await db.insights.delete_many({"slug": {"$in": LEGACY_SLUGS_TO_REMOVE}})
    for post in SEED_INSIGHTS:
        existing = await db.insights.find_one({"slug": post["slug"]})
        if not existing:
            doc = InsightPost(**post).model_dump()
            doc['created_at'] = doc['created_at'].isoformat()
            await db.insights.insert_one(doc)
        else:
            # Keep order + latest content in sync with source of truth.
            await db.insights.update_one(
                {"slug": post["slug"]},
                {"$set": {
                    "title": post["title"],
                    "category": post["category"],
                    "excerpt": post["excerpt"],
                    "content": post["content"],
                    "reading_time": post["reading_time"],
                    "cover_image": post["cover_image"],
                    "order": post["order"],
                }},
            )


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
