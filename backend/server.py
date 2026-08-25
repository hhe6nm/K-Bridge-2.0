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

# Slugs removed at startup to make room for the current curated set —
# includes the pre-2026-02 legacy posts and the 7 lease/franchise/JV/geo
# posts retired in favor of the topics below.
LEGACY_SLUGS_TO_REMOVE = [
    "korean-brands-us-lease-mistakes",
    "franchise-vs-direct-entry",
    "understanding-us-commercial-lease-terms",
    "site-selection-methodology",
    "percentage-rent-lease-clause",
    "co-tenancy-clause-anchor-tenant-loss",
    "franchise-registration-states",
    "direct-vs-franchise-vs-jv",
    "dc-nova-korean-corridor",
    "personal-guarantee-negotiation",
    "first-90-days-post-opening",
]

SEED_INSIGHTS = [
    {
        "slug": "korea-to-america-phased-market-entry-strategy",
        "order": 0,
        "title": "성공적인 미국 시장 진출을 위한 단계별 전략",
        "category": "시장 진입 전략",
        "excerpt": "2025년 한국의 대미 투자는 253억 달러로 사상 최대치를 기록했습니다. 수요는 이미 증명됐습니다. 문제는 실행입니다 — Innisfree의 미국 철수와 Olive Young의 성공적 진출이 그 차이를 보여줍니다.",
        "content": "2025년 한국의 해외직접투자는 718억 8천만 달러로 전년 대비 8.7% 증가했고, 이 중 미국이 253억 달러로 가장 큰 비중을 차지했습니다. 전년 대비 12.9% 증가한 수치로, 2022년 이후 처음으로 나타난 증가 전환입니다. 미국 내 신규 한국 법인 설립 건수도 크게 늘었습니다. (출처: 기획재정부, 2025년 해외직접투자 동향, 2026년 3월 발표)\n\n소비재 부문의 성장도 뚜렷합니다. K-Food+ 수출은 2025년 136억 2천만 달러로 사상 최대치를 기록했고(전년 대비 5.1% 증가), 이 중 미국向 수출은 18억 달러로 전년 대비 13.2% 늘었습니다. 미국은 한국 농식품 최대 수출 시장입니다. (출처: 농림축산식품부, 2026년 1월 발표)\n\nK-Beauty도 같은 흐름입니다. 미국 국제무역위원회(US ITC) 데이터에 따르면, 한국은 2024년 미국 화장품 수입 시장에서 프랑스를 제치고 1위 공급국이 되었습니다(약 17억 달러). 그리고 2025년에는 반대 방향에서도 기록이 나왔습니다 — 한국 식품의약품안전처(MFDS) 발표에 따르면, 미국은 2025년 처음으로 한국 화장품의 최대 수출 대상국이 되었습니다(22억 달러, 전년 대비 15% 증가), 그동안 1위였던 중국을 앞질렀습니다. (출처: US ITC via Korea Herald, 2025년 4월; MFDS via Korea Biomed·서울경제, 2026년 5월)\n\n## 수요는 이미 증명됐다 — 문제는 실행이다\n\n이 통계들이 말해주는 것은 하나입니다. 한국 브랜드에 대한 미국 시장의 수요는 더 이상 가설이 아니라는 것. 그런데 같은 K-Beauty 업계 안에서도 극명하게 갈리는 두 사례가 있습니다.\n\nInnisfree는 2017년 9월 뉴욕에 첫 미국 매장을 열었습니다. 이후 미국 전역 10개 매장까지 늘렸지만, 2021년 2월 이 매장들을 모두 닫았습니다. 모회사 아모레퍼시픽은 팬데믹과 수익성 악화를 이유로 들었고, 이후 매장 운영을 접고 세포라 온라인 채널로 전환했습니다. 브랜드 자체는 여전히 존재하지만, 단독 리테일 모델로는 미국에서 지속 가능한 규모를 만들지 못했습니다. (출처: Korea Times, BusinessOfFashion, 2021년 5월)\n\n반면 올리브영(CJ Olive Young)은 2026년 5월 29일, 캘리포니아 패서디나에 미국 첫 매장을 열었습니다. 8,647제곱피트 규모에 400개 브랜드, 5,000개 SKU를 갖췄고, 오픈 당일 매장 앞에 밤샘 대기줄이 늘어설 정도로 반응을 얻었습니다. 이미 2018년부터 미국向 역직구 이커머스를 운영해오며 데이터를 축적했고, 매장 오픈과 동시에 미국 전용 온라인몰도 함께 열었습니다. 다음 매장(Westfield Century City)은 한 달 뒤인 6월 오픈이 예정되어 있었고, 세포라와도 협업 관계를 맺었습니다. (출처: Bloomberg, PR Newswire, Forbes, 2026년 5월)\n\n두 사례의 차이는 브랜드 파워가 아닙니다. Innisfree도 한국에서 압도적인 브랜드였습니다. 차이는 진입 방식입니다 — 올리브영은 매장을 열기 전에 이미 몇 년간 미국 소비자 데이터를 이커머스로 축적했고, 채널 파트너(세포라)와의 관계를 먼저 구축한 뒤 오프라인으로 확장했습니다. Innisfree는 브랜드 인지도만으로 단독 매장 모델에 먼저 뛰어들었습니다.\n\n## 반복되는 실패 패턴\n\nK Bridge가 지켜본 사례들, 그리고 업계에 문서화된 실패 패턴은 대체로 다음 다섯 가지로 수렴합니다.\n\n1) 취약한 운영 시스템 — 한국에서 통했던 공급망, 메뉴/원가 관리, 매장 운영 매뉴얼이 미국 현지 규모에서는 작동하지 않는 경우\n2) 현지화를 번역으로 착각 — 브랜드명과 메뉴를 영어로 바꾸는 것을 현지화라고 여기는 경우\n3) 프랜차이즈 컴플라이언스 누락 — 14개 등록주의 FDD 등록 요건, 상표 미등록 시 추가 등록 의무를 사전에 파악하지 못하는 경우\n4) E-2 비자 마찰 — 사업계획서가 \"marginal business\" 판정을 피하지 못하거나, 50% 소유·통제 요건을 충족하지 못하는 경우\n5) 입지·리스 실수 — 자본 구조가 확정되기 전에 입지를 먼저 정하거나, 퍼센티지 임대료·코테넌시·CAM 같은 미국식 리스 조항을 제대로 협상하지 못하는 경우\n\n## 단계별 진입 전략\n\n실제로 작동하는 진입 전략은 한 번에 전국 규모로 뛰어드는 것이 아니라, 단계를 나누는 것입니다.\n\n1단계 — 밀도 높고 비용이 낮은, 프랜차이즈 친화적인 시장에서 시작. DC·북부 버지니아처럼 이미 한인 소비자 기반이 있는 지역, 혹은 댈러스·애틀랜타처럼 등록 부담이 낮고 임대 비용이 낮은 지역이 여기 해당합니다.\n\n2단계 — 1단계에서 운영이 검증된 이후, 뉴욕·LA 같은 프레스티지·대규모 시장으로 확장.\n\n3단계 — 관광 의존도가 높은 시장(라스베이거스, 마이애미)은 브랜드가 이미 주류 소비자에게 각인된 이후 진입하는 것이 안전합니다.\n\n## 결론\n\n2025년 253억 달러라는 숫자, 그리고 미국이 한국 화장품의 최대 수출국이 되었다는 기록은 모두 같은 이야기를 하고 있습니다 — 시장은 이미 열려 있습니다. 남은 변수는 그 시장에 어떤 순서와 방식으로 들어가느냐입니다. Innisfree와 올리브영은 같은 산업, 같은 나라에서 출발했지만 정반대의 결과를 만들었습니다. 그 차이를 만드는 것이 전략이고, 그 전략을 설계하는 것이 K Bridge Partners가 하는 일입니다.",
        "reading_time": 9,
        "cover_image": "https://images.unsplash.com/photo-1508433957232-3107f5fd5995?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    },
    {
        "slug": "why-korea-successful-brands-fail-in-us",
        "order": 1,
        "title": "한국에서 성공한 브랜드가 미국에서 실패하는 이유",
        "category": "시장 진입 전략",
        "excerpt": "한국 시장에서의 성공은 미국 진출의 보증서가 아닙니다. Innisfree부터 SK텔레콤의 Helio까지, 브랜드력이 아니라 운영 시스템과 진입 방식에서 갈린 사례들을 분석합니다.",
        "content": "\"왜 한국에서 그렇게 잘되던 브랜드가 미국에서는 안 될까?\" K Bridge Partners가 상담 초기 단계에서 가장 자주 듣는 질문입니다. 결론부터 말하면 — 브랜드력의 문제가 아닙니다. 실패한 브랜드 대부분은 한국에서 이미 검증된, 좋은 브랜드였습니다. 문제는 미국이라는 시장이 요구하는 운영 시스템과 진입 방식을 브랜드력만으로는 대체할 수 없다는 데 있습니다.\n\n## 사례 1: Innisfree — 브랜드는 강했지만 시스템이 없었다\n\nInnisfree는 2017년 9월 뉴욕에 첫 매장을 열며 미국 시장에 진출했습니다. 아모레퍼시픽 산하 브랜드로, 한국에서는 950개 이상의 매장을 운영하던 검증된 브랜드였습니다. 미국에서도 10개 매장까지 확장했지만, 2021년 2월 이 매장들을 모두 닫았습니다. 아모레퍼시픽 측은 팬데믹을 표면적 이유로 들었지만, 실제로는 2016년 770억 원이던 매출이 2020년 348억 6천만 원으로 반토막 난 뒤였습니다. 회사는 이후 \"디지털 전환과 브랜드 강화에 집중하겠다\"며 오프라인 매장 대신 세포라 온라인 채널로 전환했습니다. (출처: Korea Times, BusinessOfFashion, 2021년 5월)\n\n반면 같은 그룹의 라네즈, 설화수는 세포라 입점 파트너십과 이커머스를 통해 미국에서 계속 성장했습니다. 브랜드가 실패한 것이 아니라, 단독 리테일 모델이라는 진입 방식이 미국 시장 규모에서 지속 가능하지 않았던 것입니다.\n\n## 사례 2: SK텔레콤의 Helio — 기술력이 아니라 타이밍의 문제\n\nF&B·뷰티 업계 바깥에서도 같은 패턴이 반복됩니다. SK텔레콤은 2005년 미국 이동통신사 EarthLink와 합작해 Helio라는 브랜드를 미국에 출시했습니다. 한국의 앞선 모바일 기술을 미국 시장에 들여온다는 포부였고, Helio 고객의 월평균 요금은 80달러로 업계 평균(약 50달러)을 크게 웃돌 만큼 프리미엄 포지셔닝에 성공했습니다. SK텔레콤은 초기 투자에 이어 2007년 9월 2억 7천만 달러를 추가로 투입하며 사업을 지키려 했습니다.\n\n하지만 결과는 2008년 6월, 버진모바일에 단 3,900만 달러(주식 교환 방식)로 매각이었습니다. 이유는 아이폰과 블랙베리가 촉발한 스마트폰 수요 전환을 Helio가 따라가지 못했기 때문입니다. (출처: Deseret News, TechCrunch, InformationWeek, 2008년 6월) 이 사례는 F&B·뷰티와는 다른 업종이지만 같은 교훈을 줍니다 — 제품력과 초기 반응이 좋아도, 그 시장이 다음에 무엇을 원하게 될지 읽지 못하면 몇 년 안에 무너질 수 있다는 것입니다.\n\n## 업계가 지목하는 반복적 실패 원인\n\n프랜차이즈·호스피탤리티 전문 컨설팅사 Canyon Springs Advisors는 한국 외식 브랜드의 해외 진출 실패를 여러 차례 자문하며 다음과 같이 지적합니다.\n\n> 많은 한국 외식 브랜드는 국제적 확장에는 턱없이 부족한, 매우 기초적인 수준의 운영 시스템을 갖추고 있다. 이는 공급망, 메뉴 관리, 원가 분석부터 기본적인 매장 기술 인프라까지 전방위적으로 해당된다.\n\n이 회사는 또한 \"한국 본사에 해외 프랜차이지를 지원할 인력 자체가 부족한 경우를 반복적으로 목격했다\"고 밝혔습니다. (출처: Canyon Springs Advisors, \"Why Do Korean Restaurant Brands Often Fail Overseas?\")\n\n국제 시장 진입 전략을 다루는 컨설턴트들 역시 비슷한 지점을 짚습니다.\n\n> 올바른 첫 진입 시장은 가장 명성 있는 곳이 아니라, 브랜드 포지셔닝이 가장 자연스럽게 맞아떨어지고 경쟁 구도가 관리 가능하며 학습 비용이 가장 낮은 곳이다.\n\n미국 진출을 준비하는 브랜드가 가장 먼저 저지르는 실수는 가장 화려한 시장(대개 뉴욕)에 가장 먼저 진출하려는 것입니다. (출처: 시장 진입 전략 컨설턴트 분석, Octonan, 2026년 7월)\n\n## 패턴을 종합하면\n\n위 사례들과 업계 자문을 종합하면, 실패는 대체로 다음 네 가지 지점에서 발생합니다.\n\n**1) 운영 시스템의 한계** — 한국 규모에서 통했던 공급망과 매장 관리 체계가 미국의 지리적 규모, 인건비 구조, 물류 환경에서는 그대로 작동하지 않습니다.\n\n**2) 진입 방식의 오판** — Innisfree처럼 브랜드 인지도만 믿고 단독 리테일에 먼저 투자하는 경우, 채널 파트너십(세포라, 아마존 등)이나 이커머스로 먼저 데이터와 고객 기반을 쌓은 경쟁 브랜드에 뒤처집니다.\n\n**3) 첫 진입 시장의 오판** — 가장 상징적인 시장(뉴욕, LA)에 첫 발을 딛는 것이 항상 정답은 아닙니다. 학습 비용이 낮고 리스크가 관리 가능한 시장에서 운영을 먼저 검증하는 것이 더 안전한 경로인 경우가 많습니다.\n\n**4) 본사 지원 인프라 부족** — 미국 파트너·프랜차이지·매장을 실시간으로 지원할 수 있는 인력과 체계가 한국 본사에 없는 경우, 초기 문제가 누적되어 브랜드 신뢰도 자체를 갉아먹습니다.\n\n## 결론\n\nInnisfree와 SK텔레콤 Helio는 업종도, 시대도, 실패의 표면적 이유도 다릅니다. 하지만 공통점은 분명합니다 — 두 브랜드 모두 한국에서는 이미 검증된 강한 브랜드였고, 실패는 제품이 아니라 시스템과 진입 순서에서 비롯됐습니다. 미국 시장에서 살아남는 것은 브랜드가 얼마나 좋은가의 문제가 아니라, 그 브랜드를 어떤 순서로, 어떤 파트너와, 어떤 운영 체계 위에서 진입시키는가의 문제입니다.",
        "reading_time": 10,
        "cover_image": "https://images.unsplash.com/photo-1741879871542-60f90be58ae0?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    },
    {
        "slug": "foreign-owned-ein-application-timeline",
        "order": 2,
        "title": "해외 소유 법인, EIN 발급이 왜 더 오래 걸릴까",
        "category": "법인 · 비자",
        "excerpt": "한국 브랜드가 미국에 법인을 설립할 때 가장 먼저 마주치는 병목은 법인 등록이 아니라 EIN 발급입니다. SSN·ITIN이 없는 대표자는 온라인 즉시 발급을 이용할 수 없어, 팩스·우편 경로만 남습니다.",
        "content": "한국 브랜드가 미국에 법인을 설립할 때 가장 먼저 마주치는 병목은 법인 등록이 아니라 EIN(고용주 식별번호) 발급입니다.\n\n미국 시민이나 영주권자는 IRS 웹사이트에서 온라인으로 EIN을 신청하면 즉시 발급받습니다. 하지만 이 온라인 시스템은 SSN(사회보장번호) 또는 ITIN(개인 납세자 번호)을 가진 신청자만 사용할 수 있습니다. 한국에 거주하며 미국 법인을 설립하는 대표자는 대부분 SSN도, ITIN도 없습니다.\n\n이 경우 IRS Form SS-4를 작성해 우편 또는 팩스로 제출해야 합니다. 처리 기간은 우편 기준 약 4~6주, 팩스는 이보다 조금 빠르지만 그래도 몇 주가 소요됩니다. 여기서 실수가 잦은 지점이 있습니다.\n\nThird Party Designee 항목 누락\n법인 대표가 한국에 있어 IRS와 직접 전화 응대가 어려운 경우, SS-4에 미국 내 담당자(변호사, 회계사 등)를 Third Party Designee로 지정해야 후속 문의에 대응할 수 있습니다. 이를 빠뜨리면 서류가 반려되거나 지연됩니다.\n\n책임 당사자(Responsible Party) 정보 오류\nLLC의 경우 SSN/ITIN이 없는 외국인도 책임 당사자로 등록 가능하지만, 양식 작성 방식이 미국 시민과 다릅니다. 이름 표기, 주소 형식, 신분 표기 방식에서 실수가 발생하면 IRS는 서류를 반려합니다.\n\n실무 팁\nEIN 발급이 늦어지면 법인 명의의 은행 계좌 개설, 상업 부동산 임대차 계약, 초기 인허가 신청까지 연쇄적으로 지연됩니다. 법인 설립 전략을 세울 때는 EIN 발급 기간을 반드시 초기 일정에 포함해야 합니다.",
        "reading_time": 6,
        "cover_image": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    },
    {
        "slug": "e2-investor-visa-korean-founders",
        "order": 3,
        "title": "E-2 투자자 비자, 한국 창업자가 반드시 알아야 할 것",
        "category": "법인 · 비자",
        "excerpt": "한국은 미국과 조약을 체결한 E-2 조약 투자자 비자 대상국입니다. 대부분의 거절 사유는 '투자금이 부족해서'가 아니라 Marginal Business 판정과 50% 소유·통제 요건 미충족입니다.",
        "content": "한국은 미국과 조약을 체결한 E-2 조약 투자자 비자 대상국입니다. 즉, 일정 요건을 갖춘 한국 국적자는 미국에 사업체를 설립하고 직접 운영하기 위한 비자를 받을 수 있습니다. 하지만 실제로 신청해보면, 대부분의 거절 사유는 \"투자금이 부족해서\"가 아니라 다음 두 가지입니다.\n\n1. Marginal Business(한계 사업) 판정\nE-2 비자는 단순히 투자자 본인의 생계를 유지하는 수준의 소규모 사업(marginal business)에는 발급되지 않습니다. 사업이 향후 미국 경제에 실질적으로 기여할 수 있다는 것 — 즉 현지 고용을 창출하거나 사업 규모가 확장될 잠재력이 있다는 것을 증명해야 합니다. 1인 매장 하나만 계획한 사업계획서는 이 기준을 통과하기 어렵습니다.\n\n2. 50% 이상 소유 및 실질적 통제\n신청자(또는 신청자가 대표하는 한국 법인)가 미국 사업체의 지분 50% 이상을 소유하고, 실질적으로 사업을 관리·통제해야 합니다. 지분 구조가 복잡하거나, 실제 운영 권한이 다른 투자자에게 있는 경우 이 요건에서 걸리는 경우가 많습니다.\n\n투자금 규모\n법적으로 정해진 최소 금액은 없지만, 이민국은 \"해당 사업 유형을 시작하고 운영하기에 충분한 금액\"인지를 판단합니다. 프랜차이즈나 상업 부동산 임대가 포함된 사업은 통상 최소 10만 달러 이상을 준비하는 것이 안전한 기준으로 여겨집니다.\n\n실무 팁\nE-2 비자 신청은 사업계획서의 완성도가 승인 여부를 좌우합니다. 시장 조사, 고용 계획, 5년 재무 전망까지 포함된 사업계획서를 비자 신청 전에 준비해야 하며, 이는 사업 자체를 위해서도 필요한 작업입니다.",
        "reading_time": 7,
        "cover_image": "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    },
    {
        "slug": "commercial-lease-terms-by-industry",
        "order": 4,
        "title": "미국 상업 임대차 계약, 업종별로 기간이 다른 이유",
        "category": "상업 부동산",
        "excerpt": "오피스는 3~7년, 리테일은 5~10년, 레스토랑은 10~15년+. 초기 투자 회수와 유연성의 트레이드오프.",
        "content": "미국 상업 임대차의 초기 계약 기간은 업종별로 상당한 편차를 보입니다. 이 편차는 자의적이지 않으며, 각 업종의 초기 자본 투자 규모와 매출 안정화까지의 시간을 반영합니다.\n\n오피스 (3~7년)\n초기 시공비가 비교적 낮고, 팀 규모 변동에 따른 유연성이 중요합니다. 임대인은 3~5년 기본 계약에 갱신 옵션을 붙이는 구조를 선호합니다.\n\n리테일 (5~10년)\n인테리어 시공과 매장 브랜딩에 상당한 초기 투자가 필요하므로, 회수 기간을 확보하기 위해 5년 이상이 표준입니다. 프리미엄 위치일수록 임대인이 더 긴 계약을 요구하는 경향.\n\n레스토랑 (10~15년+)\n주방 설비, 배관·환기 시공에 $500K~$1M+ 규모의 자본이 투입되므로 회수 기간이 길어야 합니다. 15년 계약도 흔하며, 통상 5년 갱신 옵션이 2회 이상 첨부됩니다.\n\n프랜차이즈 매장 (프랜차이즈 계약과 일치)\n프랜차이지의 프랜차이즈 계약 기간(통상 10년)과 임대 기간을 일치시키는 것이 원칙입니다. 프랜차이즈 종료 후 임대만 남는 상황을 방지하기 위함입니다.\n\n갱신 옵션(Renewal Option)의 중요성\n초기 계약 시점에 갱신 옵션을 반드시 확보해야 합니다. 옵션이 없으면 임대인이 재계약 시점에 대폭 임대료 인상을 요구할 수 있습니다. 일반적인 갱신 옵션 구조:\n\n- 갱신 기간: 5년 단위\n- 임대료: Fair Market Rent 또는 3~4% 연간 인상 중 낮은 것\n- 통지 기간: 만료 12~18개월 전\n\n결론: 업종별 표준 기간을 기준으로 협상을 시작하되, 갱신 옵션 확보에 협상 자원의 상당 부분을 배분해야 합니다.",
        "reading_time": 6,
        "cover_image": "https://images.unsplash.com/photo-1554224154-26032ffc0d07?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    },
    {
        "slug": "us-commercial-lease-checklist",
        "order": 5,
        "title": "미국 Commercial Lease에서 반드시 확인해야 할 사항",
        "category": "상업 부동산",
        "excerpt": "퍼센티지 임대료, 코테넌시, 개인 보증 — 한국식 임대 관행에는 없는 세 가지 조항이 미국 리스 계약의 실제 부담을 결정합니다.",
        "content": "미국 상업 임대차 계약서는 한국의 임대 관행과 근본적으로 다른 조항들을 포함합니다. 이 조항들을 모르고 서명하면, 매장이 잘돼도 임대료 부담이 예상보다 훨씬 커지거나, 매장이 안돼도 대표 개인이 그 손실을 떠안는 상황이 생깁니다. 아래 세 가지는 협상 테이블에서 반드시 확인해야 할 조항입니다.\n\n## 퍼센티지 임대료 (Percentage Rent)\n\n몰(mall)과 파워 센터 리테일 임대차에서 흔히 등장하는 구조입니다.\n\n구조: 기본 임대료(Base Rent) + (매출 - Breakpoint) × 지정된 %\n\nBreakpoint(브레이크포인트)는 매출이 이 금액을 넘으면 초과분에 대해 퍼센티지 임대료가 발생하는 기준선입니다. Natural Breakpoint(기본 임대료 ÷ 퍼센티지)는 임차인에게 유리하고, Artificial Breakpoint(임대인이 별도로 정한 기준선)는 임대인에게 유리합니다.\n\n예시: 기본 임대료 $10K/월, 퍼센티지 6%, Natural Breakpoint 기준 브레이크포인트는 $167K/월 매출입니다. $200K 매출 발생 시 초과 $33K의 6%, 즉 $2K가 기본 임대료에 추가로 부과됩니다.\n\n놓치기 쉬운 지점은 매출(Gross Sales)의 정의입니다 — 반품, 종업원 판매, 온라인 픽업이 포함되는지 명시해야 하고, 임대인의 매출 감사 권리(Audit Rights)도 협상 대상입니다.\n\n## 코테넌시 조항 (Co-Tenancy Clause)\n\n쇼핑몰·스트립몰에서 가장 간과되기 쉬운 조항입니다. 특정 앵커 테넌트(대형 마트, 백화점 등)나 전체 상가의 입점률이 일정 수준 이하로 떨어지면, 임차인에게 임대료 감면이나 계약 해지권을 부여하는 조항입니다.\n\n이 조항이 없으면 어떻게 될까요. 앵커 테넌트가 폐점해 상가 전체 유동인구가 급감해도, 임대료는 원래 계약대로 전액 납부해야 하고, 계약 해지나 재협상을 요구할 법적 근거가 없습니다.\n\n일반적으로 두 가지 형태로 구성됩니다. 개점 코테넌시(Opening Co-Tenancy)는 매장 오픈 시점에 특정 조건(보통 입점률 65~85%)이 충족돼야 하고, 운영 코테넌시(Operating Co-Tenancy)는 계약 기간 중 입점률이 일정 수준 아래로 떨어지면 임대료 감면이나 해지권이 발생합니다. 임대인은 이 조항을 먼저 제안하지 않으므로, 임차인 측에서 협상 테이블에 반드시 올려야 합니다.\n\n## 개인 보증 (Personal Guarantee)\n\n신용 이력(credit history)이 없는 신설 법인은 대부분 임대인으로부터 대표 개인 보증을 요구받습니다. 무제한 개인 보증(Unlimited PG)에 서명하면, 계약 전체 기간(예: 10년) 동안의 모든 채무에 개인이 책임지게 됩니다 — 월 임대료 $10K 기준으로 계산하면 $1.2M 이상의 잠재 노출입니다.\n\n협상 가능한 구조는 네 가지입니다.\n\n**Good Guy Guaranty (GGG)** — 임차인이 계약 위반을 즉시 통보하고 매장을 반납하면, 개인 보증 책임이 반납일까지로 제한됩니다.\n\n**캡드 보증 (Capped PG)** — 개인 책임의 최대 금액을 미리 설정합니다 (예: 최대 12개월분 임대료).\n\n**번오프 조항 (Burn-Off Clause)** — 계약 기간이 진행되면서 개인 보증 금액이 점진적으로 감소하거나 소멸됩니다.\n\n**매출 마일스톤 기반 소멸** — 특정 매출 마일스톤 달성 시 개인 보증이 자동으로 소멸됩니다.\n\n실무 협상 순서는 개인 보증 없음 시도 → GGG + Burn-Off → Capped PG + Burn-Off 순입니다. 최소한이라도 무제한이 아닌 캡드 구조를 확보해야 합니다.\n\n## 결론\n\n세 조항 모두 임대인이 먼저 유리한 조건을 제시하지 않습니다. 계약서에 없다는 것은 협상하지 않았다는 뜻이지, 그 리스크가 없다는 뜻이 아닙니다. 서명 전 반드시 상업 부동산 전문 변호사의 검토를 거쳐야 하며, 이 세 조항의 협상 여력을 미리 파악하는 것이 초기 미팅에서 K Bridge가 가장 먼저 하는 일 중 하나입니다.",
        "reading_time": 9,
        "cover_image": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    },
    {
        "slug": "korean-franchise-us-entry-a-to-z",
        "order": 6,
        "title": "한국 프랜차이즈의 미국 진출 과정 A to Z",
        "category": "프랜차이즈",
        "excerpt": "FDD 준비부터 14개 등록주 심사, 첫 프랜차이지 모집까지 — Paris Baguette와 Bonchon이 실제로 거친 순서를 따라갑니다.",
        "content": "한국 프랜차이즈가 미국에서 프랜차이즈 사업을 시작하려면, 브랜드력과는 별개로 정해진 법적 절차를 순서대로 통과해야 합니다. 이 절차를 건너뛰거나 순서를 잘못 잡으면, 아무리 좋은 브랜드도 첫 프랜차이지 계약조차 체결할 수 없습니다.\n\n## 1단계: FDD(Franchise Disclosure Document) 준비\n\n연방거래위원회(FTC)의 Franchise Rule은 모든 50개 주에서 계약 서명 또는 대금 지급 14일 전에 FDD를 프랜차이지에게 전달하도록 요구합니다. FDD에는 재무제표, 소송 이력, 초기 투자 비용, 영업 지원 내용 등 23개 항목이 포함되며, 준비에만 통상 6~10주가 소요됩니다.\n\n## 2단계: 상표 등록\n\nFDD 작성 전에 미국 상표청(USPTO)에 브랜드 상표를 등록해야 합니다. 상표가 연방 등록되지 않은 경우, 코네티컷·노스캐롤라이나·사우스캐롤라이나·메인 4개 주에서 추가 등록 의무가 발생합니다 — 다른 절차를 다 마쳐도 이 단계를 건너뛰면 특정 주에서 발이 묶입니다.\n\n## 3단계: 주 등록 (14개 등록주)\n\nFDD를 프랜차이지에게 제공하기 전, 캘리포니아·뉴욕·버지니아 등 14개 등록주에서는 주 당국의 사전 승인이 필요합니다. 전체 등록 비용은 주당 250달러(하와이·미시간)에서 1,865달러(캘리포니아)까지, 총 약 8,000달러가 소요되며, 연간 갱신 비용은 약 4,245달러입니다. 심사 기간은 주별로 20일에서 3개월까지 걸리며, 심사관이 코멘트 레터를 보내면 이를 해결해야 승인이 완료됩니다. (출처: FTC Franchise Rule; 각 주 프랜차이즈 등록국 공개 수수료 자료)\n\n## 4단계: 초기 투자 범위 확정\n\nParis Baguette의 2023년 FDD 기준, 카페 1개를 열고 첫 3개월을 운영하는 데 필요한 초기 투자는 652,565달러에서 1,750,900달러 사이입니다. (출처: Paris Baguette Family Inc. FDD, 2023) 이는 브랜드마다 다르지만, 이 정도 범위가 프랜차이즈 F&B 매장의 현실적인 투자 규모라는 것을 보여줍니다.\n\n## 5단계: 첫 프랜차이지 모집\n\nBonchon은 2025년 개발 부사장(VP of Development)과 시공·디자인 총괄을 새로 영입하며 미국 확장을 가속화했고, 2026년 신규 매장 파이프라인은 100개에 달합니다. (출처: Restaurant Dive, 2025년 7월) 이처럼 검증된 브랜드일수록 본사 차원에서 개발 전담 인력을 두고 프랜차이지 발굴에 나섭니다. Paris Baguette 역시 부동산팀과 직접 협업하는 본사 담당자를 두고, 현지 브로커 네트워크를 통해 입지를 물색합니다. (출처: 1851 Franchise, 2025년 11월)\n\n## 6단계: 사이트 선정과 오픈\n\nFDD 등록과 병렬로 진행할 수 있는 단계입니다. 등록 심사가 진행되는 2~3개월 동안 입지 선정과 리스 협상을 동시에 진행하면 전체 일정을 단축할 수 있습니다.\n\n## 결론\n\n순서를 요약하면: 상표 등록 → FDD 준비 → 등록주 심사 → 초기 투자 구조 확정 → 프랜차이지 모집 → 사이트 선정입니다. 이 중 어느 하나라도 순서가 뒤바뀌면 — 특히 상표 등록 전에 FDD부터 준비하는 경우 — 특정 주에서 추가 등록 의무가 발생해 전체 일정이 늘어집니다. 전체 과정은 브랜드 인지도와 무관하게, 절차를 정확히 따랐는지에 따라 6개월이 될 수도, 1년 이상이 될 수도 있습니다.",
        "reading_time": 9,
        "cover_image": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    },
    {
        "slug": "korean-franchise-localization-in-us",
        "order": 7,
        "title": "한국 프랜차이즈가 미국에서 현지화해야 할 것들",
        "category": "프랜차이즈",
        "excerpt": "Paris Baguette는 메뉴의 일부만 현지화하고 나머지는 지켰습니다. 무엇을 바꾸고 무엇을 지킬지의 기준이 현지화 성공을 가릅니다.",
        "content": "현지화는 번역이 아닙니다. 브랜드명과 메뉴판을 영어로 바꾸는 것과, 그 시장의 소비자가 실제로 원하는 방식으로 브랜드를 재구성하는 것은 전혀 다른 작업입니다. 이미 미국에서 수백 개 매장을 운영 중인 한국 프랜차이즈들의 실제 전략을 보면, 무엇을 현지화하고 무엇을 지켜야 하는지에 대한 뚜렷한 패턴이 있습니다.\n\n## \"Glocalization\": 전부 바꾸지도, 전부 지키지도 않는다\n\nParis Baguette를 운영하는 SPC그룹의 글로벌 전략 총괄 Jack Francis Moran은 이렇게 설명합니다.\n\n> 해외 시장에서 현지 브랜드와 정면으로 경쟁하려면, 세계적으로 통하는 경쟁력(globalization)을 유지하면서도 각 나라 소비자의 입맛에 맞는 메뉴를 적절히 보충하는 것(localization)이 필요하다.\n\n실제로 Paris Baguette는 중국 시장에서 전체 메뉴의 20%만 현지 맞춤 상품으로 채우고, 나머지 80%는 한국 본사의 핵심 메뉴를 그대로 유지하는 전략으로 성공했습니다. (출처: Korea Herald, 2023년 2월) 이는 브랜드 정체성을 지키면서도 진입 장벽을 낮추는 균형점을 보여줍니다.\n\n## 메뉴: 좁히거나, 지역별로 다르게\n\nBonchon은 반대 방향의 전략을 택했습니다. 메뉴를 확장하는 대신, 소이 갈릭·스파이시 두 가지 시그니처 맛에 집중하는 좁고 일관된 메뉴 구성으로 미국 전역 150개 이상 매장, 27개 주로 확장했습니다. 프랜차이즈 운영 전문 자료에 따르면, 잘 짜인 메뉴 구성은 프랜차이지가 조리 준비에 쏟는 시간을 줄이고 고객 경험에 집중할 수 있게 하며, SNS에서 공유되기 쉬운 비주얼이 자연스러운 마케팅 효과를 낸다고 설명합니다. (출처: Bonchon Franchising, 2025년 5월)\n\n두 브랜드의 접근은 다르지만 원칙은 같습니다 — 현지화는 메뉴를 늘리는 것이 아니라, 그 시장에서 통할 확률이 높은 조합을 의도적으로 설계하는 작업입니다.\n\n## 입지: 현지 데이터를 아는 사람에게 맡긴다\n\nParis Baguette 뉴욕 멀티유닛 오너 Poonam Sharma는 타임스퀘어 매장에 대해 이렇게 말합니다.\n\n> 타임스퀘어에서는 정말 다양한 손님들을 만납니다. 그 에너지는 놀라울 정도입니다. 자정까지 영업하는데, 마감 시간까지 손님이 계속 들어옵니다. 추수감사절부터 크리스마스 시즌에는 줄이 끊이지 않습니다.\n\n(출처: 1851 Franchise, 2025년 11월)\n\nParis Baguette 본사는 부동산팀과 직접 협업하는 담당자를 두고, 앵커 테넌트·인구통계·동선을 잘 아는 현지 브로커 네트워크를 통해 입지를 물색합니다. 한국 본사가 직접 미국 상권 데이터를 판단하려 하기보다, 그 시장을 매일 들여다보는 현지 파트너에게 입지 판단을 맡기는 구조입니다.\n\n## 무엇을 지켜야 하는가\n\n현지화가 만능은 아닙니다. Paris Baguette가 메뉴의 80%를 지켰듯, 브랜드의 핵심 정체성 — 시그니처 메뉴, 매장 디자인 언어, 품질 기준 — 은 시장이 바뀌어도 흔들리지 않아야 합니다. 무엇이든 현지 입맛에 맞춰 바꾸다 보면, 애초에 그 브랜드를 찾게 만든 차별점 자체가 사라집니다.\n\n## 결론\n\n현지화는 \"얼마나 많이 바꾸느냐\"의 문제가 아니라 \"무엇을 바꾸고 무엇을 지킬지 얼마나 정확히 아느냐\"의 문제입니다. 메뉴의 20%, 매장의 입지 판단, 운영 시간 — 현지 데이터가 필요한 지점은 현지 전문가에게 맡기고, 브랜드의 본질은 지키는 것. 이것이 이미 미국에서 검증된 한국 프랜차이즈들이 공통적으로 따른 원칙입니다.",
        "reading_time": 8,
        "cover_image": "https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    },
    {
        "slug": "korean-consumer-brands-gaining-traction-us",
        "order": 8,
        "title": "미국에서 주목받는 한국 소비재 브랜드",
        "category": "K-Brand Trends",
        "excerpt": "K-Beauty 매출이 1년 만에 48% 성장하고, 한국 브랜드가 세포라·타겟·코스트코 매대에 오르고 있습니다. 지금 미국에서 실제로 움직이고 있는 브랜드들을 짚어봅니다.",
        "content": "\"K-브랜드가 미국에서 뜨고 있다\"는 말은 이제 추상적인 표현이 아닙니다. NielsenIQ 데이터에 따르면 2026년 상반기 미국 K-Beauty 매출은 28억 달러로, 1년 전보다 약 48% 증가했습니다 — 직전 연도 성장률(약 45%)보다도 빨라진, 이례적인 가속입니다. K-Beauty 제품을 구매하는 미국 가구 비중도 28.7%까지 올라왔습니다. (출처: NielsenIQ via CNBC, 2026년 7월 18일)\n\n## 채널을 뚫고 들어간 브랜드들\n\n숫자보다 더 뚜렷한 신호는 어떤 브랜드가, 어떤 채널에 들어갔는가입니다.\n\n**Dr. Groot** — 세포라(Sephora) 정식 입점을 통해 미국 리테일에 진출했습니다. (출처: Global Cosmetics News, 2026년 6월)\n\n**I'm Meme** — 바이럴 메이크업 라인을 타겟(Target) 전 매장에 전국 론칭했습니다. 한국 인디 뷰티 브랜드가 미국 대형 마트 체인에 전국 단위로 입점한 사례로 주목받았습니다. (출처: Global Cosmetics News, 2026년 6월)\n\n**Mixsoon** — 코스트코(Costco) 약 500개 매장에 입점했습니다. 코스트코는 회원제 창고형 매장 특성상 입점 심사가 까다롭기로 알려져 있어, 이 입점 자체가 브랜드 신뢰도의 지표로 여겨집니다.\n\n**Olive Young** — 캘리포니아에 첫 북미 물류센터를 열며 장기 시장 정착 의지를 보였습니다. 단순 매장 오픈이 아니라 물류 인프라부터 갖췄다는 점에서, 일회성 진출이 아닌 지속 가능한 확장 전략으로 해석됩니다. (출처: Global Cosmetics News, 2026년 6월)\n\n## F&B에서도 같은 흐름\n\n뷰티 업계 바깥에서도 비슷한 모멘텀이 감지됩니다. Bonchon은 2026년 신규 매장 파이프라인 100개를 확보했고, 빠른 캐주얼(fast casual) 포맷의 새 프로토타입을 개발해 2026년 미국 내 3개 매장에 우선 적용하고 있습니다. (출처: Restaurant Dive, 2025년 7월) Paris Baguette는 미국 진출 10년을 넘기며 LA 지역에만 21개 매장을 확보했고, 전 세계 480개 이상 매장 중 상당수가 미국에 있습니다. (출처: Waldrop and Colvin PLLC, 2024년 2월; BusinessWire)\n\n## 왜 지금인가\n\n미국 로펌 Nixon Peabody의 변호사 Yun Kim은 이 흐름을 K-콘텐츠의 문화적 영향력 확산과 연결지어 설명합니다.\n\n> 한국의 문화적 영향력이 지금처럼 확장된 적은 없었다. 이제 그 영향력은 미디어를 넘어 한국 소비재, 뷰티 브랜드, 식품까지 이어지고 있다. 동시에 여전히 많은 한국 기업들이 해외 시장에 본격적으로 진출하지 못하고 있다.\n\nKim은 다만 \"가시성만으로는 부족하다\"고 강조합니다. 법인 구조, 계약 검토, 지적재산권 보호, 명확한 시장 진입 전략까지 갖춘 기업만이 이 모멘텀을 실제 사업 확장으로 전환할 수 있다는 것입니다. (출처: Nixon Peabody LLP, 2026년 5월)\n\n## 결론\n\n문화적 수요는 이미 검증됐고, 몇몇 브랜드는 이미 세포라·타겟·코스트코라는 미국 주류 유통 채널에 진입했습니다. 관건은 이 문화적 모멘텀을 실제 매장·매대·법인 구조로 전환할 수 있느냐입니다. 그 전환에 필요한 것이 바로 시장 진입 전략입니다.",
        "reading_time": 8,
        "cover_image": "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    },
    {
        "slug": "finding-franchisees-and-investors-in-us",
        "order": 9,
        "title": "Franchisee와 Investor는 어떻게 찾는가",
        "category": "프랜차이즈",
        "excerpt": "FDD를 완성했다고 프랜차이지가 저절로 나타나지 않습니다. 검증된 브랜드들이 실제로 채택한 두 가지 경로 — 본사 개발팀과 현지 브로커 네트워크.",
        "content": "FDD를 등록하고 상표를 확보했다고 해서 프랜차이지나 투자자가 저절로 나타나지는 않습니다. 미국에서 이미 자리 잡은 한국 프랜차이즈들을 보면, 이 단계에서 뚜렷한 두 가지 경로를 따랐다는 공통점이 있습니다.\n\n## 경로 1: 본사 개발팀을 직접 꾸린다\n\nBonchon은 2025년 David Wheeler를 개발 부사장(VP of Development)으로, Michael Haddad를 시공·디자인 총괄로 새로 영입했습니다. 이 인사는 단순 충원이 아니라, 미국과 해외 시장 모두에서 프랜차이즈 확장을 가속화하겠다는 신호로 해석됐습니다. 회사는 이와 함께 빠른 캐주얼(fast casual) 매장 포맷을 새로 개발해, 2026년 미국 내 3개 매장에 우선 적용하며 확장 파이프라인을 100개까지 늘렸습니다. (출처: Restaurant Dive, 2025년 7월)\n\n이 접근의 핵심은 프랜차이지를 \"기다리지\" 않는다는 것입니다. 본사가 개발 전담 인력을 두고, 후보 프랜차이지를 능동적으로 발굴·심사·지원하는 구조를 만듭니다.\n\n## 경로 2: 현지 브로커·부동산 네트워크를 활용한다\n\nParis Baguette는 다른 방식을 택했습니다. 본사에 부동산팀과 직접 협업하는 담당자를 두되, 실제 입지 발굴은 현지 브로커 네트워크에 맡깁니다. 이 브로커들은 \"어떤 앵커 테넌트가 있는지, 어떤 상권이 데이터와 다르게 실제로 걷기 어려운지, 어떤 인구통계와 동선을 봐야 하는지\"를 이미 알고 있는 사람들입니다. (출처: 1851 Franchise, 2025년 11월)\n\n이 구조의 장점은 확장성입니다. Paris Baguette는 이 방식으로 미국 진출 10년 만에 LA 지역에만 21개 매장을 확보했고, 캘리포니아 서부 해안 지역으로 지속적으로 신규 계약을 체결하고 있습니다. (출처: BusinessWire, 2020년) 브로커 네트워크를 통한 확장은 본사가 모든 시장을 직접 조사할 필요 없이, 이미 그 시장을 잘 아는 현지 파트너의 판단을 빌리는 구조입니다.\n\n## 투자자(Investor)를 찾을 때 추가로 필요한 것\n\n프랜차이지가 매장을 운영할 사람이라면, 투자자는 자본을 대는 쪽입니다. 이 경우 FDD만으로는 부족하고, 다음 세 가지가 추가로 필요합니다.\n\n1) 검증 가능한 재무 데이터 — FDD의 재무제표(Item 19, 있는 경우) 또는 기존 매장의 실제 매출·순이익 데이터\n2) 5년 재무 전망 — E-2 비자 신청에도 동일하게 요구되는 자료로, 투자자 유치와 비자 신청을 동시에 준비하면 자료를 이중으로 만들 필요가 없습니다\n3) 명확한 출구 전략 — 투자자가 지분을 회수할 수 있는 경로(재매각, 배당, 기업공개 등)에 대한 설명\n\n## 결론\n\n프랜차이지는 본사가 능동적으로 발굴하거나, 현지 네트워크를 통해 유입되는 두 경로 중 하나를 따릅니다. 두 경로 모두 \"기다림\"이 아니라 \"구조를 만드는 일\"입니다. 투자자 유치 역시 FDD 완성 이후의 별도 단계이며, E-2 비자 준비와 자료를 공유할 수 있다는 점에서 두 절차를 병렬로 진행하는 것이 효율적입니다.",
        "reading_time": 7,
        "cover_image": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    },
    {
        "slug": "pre-entry-market-research-checklist",
        "order": 10,
        "title": "미국 진출 전 반드시 확인해야 할 시장조사 항목",
        "category": "시장 진입 전략",
        "excerpt": "감이 아니라 데이터로 시작해야 합니다. 인구통계, 소매 공실률, 상표 현황까지 — 첫 미팅 전에 확인해야 할 다섯 가지 항목.",
        "content": "미국 진출을 검토하는 단계에서 가장 흔한 실수는 \"어디가 좋아 보인다\"는 감각으로 시장을 고르는 것입니다. 실제로 검증 가능한 데이터는 생각보다 많이 공개되어 있고, 첫 상담 전에 이 데이터를 스스로 확인해보는 것만으로도 진출 전략의 해상도가 크게 달라집니다.\n\n## 1) 한인 인구 통계 (US Census Bureau)\n\n미국 내 한인 인구는 2023년 기준 약 200만 명으로, 아시아계 그룹 중 5번째로 큽니다. 주별로는 캘리포니아(558,338명), 뉴욕(141,745명), 텍사스(115,107명), 뉴저지(113,736명), 버지니아(94,275명) 순입니다. 특히 버지니아·뉴욕·워싱턴 DC 광역권에 전체 한인 이민자의 약 40%가 밀집해 있습니다. (출처: US Census Bureau, Migration Policy Institute)\n\n이 데이터는 F&B·리테일처럼 초기 한인 소비자 기반이 필요한 브랜드에게 특히 중요합니다. 반대로 미국 주류 소비자를 처음부터 타겟팅하는 브랜드라면, 한인 인구 밀도보다 다른 지표가 더 중요할 수 있습니다.\n\n## 2) 소매 공실률과 임대료 수준\n\n2025년 기준 미국 쇼핑센터 공실률은 지역에 따라 약 4.3%~5.8%로 역사적으로 낮은 수준이며, 신규 공급도 기록적으로 적습니다. 이는 좋은 입지를 확보하기가 그만큼 어렵다는 뜻이기도 합니다. 댈러스·애틀랜타 같은 선벨트 지역은 공실률이 가장 낮고 임대료 상승률도 가장 가파른 반면, 시카고·DC는 상대적으로 임차인에게 유리한 조건입니다.\n\n공실률이 7~8% 이상으로 올라가는 시장이 있다면, 그 시장은 임차인 우위 협상이 가능한 시점으로 봐야 합니다. 이 지표는 분기별로 변하므로, 진출 시점을 정하기 전 최신 데이터를 다시 확인해야 합니다.\n\n## 3) 상표 등록 현황 (USPTO 검색)\n\n브랜드명이나 로고가 이미 미국에서 다른 주체에 의해 등록되어 있는지 USPTO 데이터베이스에서 사전 확인이 필요합니다. 이미 유사 상표가 등록되어 있다면, 브랜드명을 바꾸거나 별도의 미국 전용 브랜드를 만들어야 할 수 있습니다 — 이는 진출 전략 자체를 바꿀 수 있는 중대한 발견이므로 가장 먼저 확인해야 할 항목 중 하나입니다.\n\n## 4) 경쟁 브랜드의 현지 성과\n\n같은 카테고리의 한국 브랜드가 이미 미국에 진출해 있다면, 그 브랜드의 매장 수·확장 속도·실패 여부를 살펴봐야 합니다. Innisfree의 매장 철수와 올리브영의 성공적 진출처럼, 같은 업종 안에서도 진입 방식에 따라 결과가 극명하게 갈립니다. 경쟁 브랜드의 실제 궤적은 시장 보고서보다 훨씬 구체적인 신호를 줍니다.\n\n## 5) 규제 리드타임\n\n업종에 따라 규제 절차가 전체 일정을 좌우합니다. 화장품은 MoCRA에 따른 시설 등록과 성분 신고, 식품은 FDA 시설 등록과 FSVP(해외 공급자 검증 프로그램), 프랜차이즈는 FDD 등록(주별 20일~3개월)이 필요합니다. 이 리드타임을 무시하고 오픈 날짜부터 정하면, 규제 절차가 완료되기 전에 매장 임대가 시작되는 비효율이 발생합니다.\n\n## 결론\n\n다섯 가지 항목 모두 공개된 데이터로 확인 가능합니다. 컨설팅 없이도 이 정도는 스스로 조사할 수 있고, 그렇게 해야 컨설팅을 받을 때도 더 정확한 질문을 할 수 있습니다. 진짜 컨설팅의 가치는 이 데이터를 모으는 데 있는 것이 아니라, 이 데이터들을 종합해 어떤 시장에서 어떤 순서로 움직여야 하는지 판단하는 데 있습니다.",
        "reading_time": 8,
        "cover_image": "https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    },
]


@app.on_event("startup")
async def seed_insights():
    # Remove any legacy seed posts to make room for the curated set.
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
