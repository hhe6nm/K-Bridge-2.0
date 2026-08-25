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
        "slug": "korea-to-america-phased-market-entry-strategy",
        "order": 0,
        "title": "From Korea to America: 성공적인 미국 시장 진출을 위한 단계별 전략",
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
        "slug": "percentage-rent-lease-clause",
        "order": 4,
        "title": "퍼센티지 임대료(Percentage Rent), 계약서에서 놓치기 쉬운 조항",
        "category": "상업 부동산",
        "excerpt": "기본 임대료(base rent)에 매출액의 일정 %를 추가로 지불하는 구조. 브레이크포인트와 매출 감사 조항이 실제 부담을 좌우합니다.",
        "content": "미국 리테일 임대차, 특히 몰(mall)과 파워 센터에서 자주 등장하는 조항이 퍼센티지 임대료입니다.\n\n구조: 기본 임대료(Base Rent) + (매출 - Breakpoint) × 지정된 %\n\nBreakpoint(브레이크포인트)는 매출이 이 금액을 넘으면 초과 매출에 대해 퍼센티지 임대료가 발생하는 기준선입니다. 통상 다음 두 가지 방식이 사용됩니다.\n\n- Natural Breakpoint: 기본 임대료 ÷ 퍼센티지 = 브레이크포인트 (임차인에게 유리)\n- Artificial Breakpoint: 임대인과 협상으로 결정된 별도 기준선 (임대인에게 유리)\n\n실무 예시\n기본 임대료 $10K/월, 퍼센티지 6%, Natural Breakpoint의 경우:\n브레이크포인트 = $10K ÷ 6% = $167K/월 매출\n$200K 매출 발생 시: 초과 $33K × 6% = $2K의 퍼센티지 임대료가 기본 임대료에 추가로 부과됩니다.\n\n놓치기 쉬운 사항\n1) 매출 정의 (Gross Sales의 범위): 반품, 종업원 판매, 온라인 픽업이 포함되는지 명시\n2) 매출 감사 조항 (Audit Rights): 임대인이 실제 매출을 감사할 수 있는 권리와 조건\n3) 최소 임대료 보장 (Guaranteed Minimum): 매출이 낮아도 기본 임대료는 유지\n\n협상 포인트: 브레이크포인트를 Natural로 설정하고, Gross Sales 정의에서 온라인 매출과 기프트 카드 판매를 명확히 제외하는 것이 핵심입니다.",
        "reading_time": 7,
        "cover_image": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    },
    {
        "slug": "co-tenancy-clause-anchor-tenant-loss",
        "order": 5,
        "title": "코테넌시 조항이 없으면 생기는 일",
        "category": "상업 부동산",
        "excerpt": "쇼핑몰이나 스트립몰 임대차 계약서에서 가장 간과되기 쉬운 조항 중 하나. 앵커 테넌트 폐점 시 임차인을 보호하는 안전장치입니다.",
        "content": "쇼핑몰이나 스트립몰에 입점할 때, 임대차 계약서에서 가장 간과되기 쉬운 조항 중 하나가 코테넌시 조항(Co-Tenancy Clause)입니다.\n\n코테넌시 조항은 간단히 말해 \"특정 앵커 테넌트(대형 마트, 백화점 등)나 전체 상가의 입점률이 일정 수준 이하로 떨어지면, 임차인에게 임대료 감면이나 계약 해지권을 부여하는 조항\"입니다.\n\n이 조항이 없다면 어떻게 될까요\n\n예를 들어 대형 마트를 앵커로 둔 스트립몰에 입점했는데, 몇 년 후 그 마트가 폐점했다고 가정해보겠습니다. 코테넌시 조항이 없다면 —\n\n상가 전체 유동인구가 급감해도 임대료는 원래 계약대로 전액 납부해야 합니다.\n계약 해지나 임대료 재협상을 요구할 법적 근거가 없습니다.\n매출이 떨어져도 임대인에게 책임을 물을 수 없습니다.\n\n일반적인 코테넌시 조항의 구조\n\n개점 코테넌시(Opening Co-Tenancy)\n매장 오픈 시점에 특정 앵커 테넌트나 전체 입점률(보통 65~85%)이 조건을 충족해야 합니다. 이 조건이 미충족되면 임차인은 개점을 연기하거나 계약 조건을 재조정할 수 있습니다.\n\n운영 코테넌시(Operating Co-Tenancy)\n계약 기간 중 입점률이 일정 수준 아래로 떨어지면 임대료 감면(주로 매출 기준 임대료로 전환) 또는 계약 해지권이 발생합니다.\n\n실무 팁\n코테넌시 조항은 임대인이 먼저 제안하지 않습니다. 임차인 측에서 협상 테이블에 올려야 하며, 특히 앵커 테넌트 의존도가 높은 상가에 입점할 때는 반드시 확인해야 할 조항입니다.",
        "reading_time": 6,
        "cover_image": "https://images.unsplash.com/photo-1568992687947-868a62a9f521?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    },
    {
        "slug": "commercial-lease-terms-by-industry",
        "order": 6,
        "title": "미국 상업 임대차 계약, 업종별로 기간이 다른 이유",
        "category": "상업 부동산",
        "excerpt": "오피스는 3~7년, 리테일은 5~10년, 레스토랑은 10~15년+. 초기 투자 회수와 유연성의 트레이드오프.",
        "content": "미국 상업 임대차의 초기 계약 기간은 업종별로 상당한 편차를 보입니다. 이 편차는 자의적이지 않으며, 각 업종의 초기 자본 투자 규모와 매출 안정화까지의 시간을 반영합니다.\n\n오피스 (3~7년)\n초기 시공비가 비교적 낮고, 팀 규모 변동에 따른 유연성이 중요합니다. 임대인은 3~5년 기본 계약에 갱신 옵션을 붙이는 구조를 선호합니다.\n\n리테일 (5~10년)\n인테리어 시공과 매장 브랜딩에 상당한 초기 투자가 필요하므로, 회수 기간을 확보하기 위해 5년 이상이 표준입니다. 프리미엄 위치일수록 임대인이 더 긴 계약을 요구하는 경향.\n\n레스토랑 (10~15년+)\n주방 설비, 배관·환기 시공에 $500K~$1M+ 규모의 자본이 투입되므로 회수 기간이 길어야 합니다. 15년 계약도 흔하며, 통상 5년 갱신 옵션이 2회 이상 첨부됩니다.\n\n프랜차이즈 매장 (프랜차이즈 계약과 일치)\n프랜차이지의 프랜차이즈 계약 기간(통상 10년)과 임대 기간을 일치시키는 것이 원칙입니다. 프랜차이즈 종료 후 임대만 남는 상황을 방지하기 위함입니다.\n\n갱신 옵션(Renewal Option)의 중요성\n초기 계약 시점에 갱신 옵션을 반드시 확보해야 합니다. 옵션이 없으면 임대인이 재계약 시점에 대폭 임대료 인상을 요구할 수 있습니다. 일반적인 갱신 옵션 구조:\n\n- 갱신 기간: 5년 단위\n- 임대료: Fair Market Rent 또는 3~4% 연간 인상 중 낮은 것\n- 통지 기간: 만료 12~18개월 전\n\n결론: 업종별 표준 기간을 기준으로 협상을 시작하되, 갱신 옵션 확보에 협상 자원의 상당 부분을 배분해야 합니다.",
        "reading_time": 6,
        "cover_image": "https://images.unsplash.com/photo-1554224154-26032ffc0d07?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    },
    {
        "slug": "franchise-registration-states",
        "order": 7,
        "title": "프랜차이즈 등록이 필요한 14개 주, 어디인가",
        "category": "프랜차이즈",
        "excerpt": "연방 FDD 외에 별도의 주 등록이 필요한 등록주(Registration States)와 통보주(Filing States)의 실제 리스트와 검토 기간.",
        "content": "미국에서 프랜차이즈를 판매하려면 연방거래위원회(FTC)가 요구하는 FDD(Franchise Disclosure Document)를 준비해야 합니다. 그러나 일부 주는 여기에 더해 별도의 주 등록(State Registration) 또는 통보(Filing)를 요구합니다.\n\n등록주 (Registration States) — 사전 승인 필요\n다음 14개 주에서는 FDD를 주 당국에 제출하고 검토·승인을 받아야 프랜차이즈 판매가 가능합니다.\n\n- California, Hawaii, Illinois, Indiana, Maryland, Michigan (주로 통보), Minnesota, New York, North Dakota, Rhode Island, South Dakota, Virginia, Washington, Wisconsin\n\n검토 기간 (실무 기준)\n- California: 4~6주\n- New York: 6~8주\n- Virginia: 4~6주\n- Illinois: 4~6주\n\n다수 주에 동시 등록할 경우 전체 기간은 가장 오래 걸리는 주의 기간에 수렴합니다. 통상 2~3개월을 잡아야 안전합니다.\n\n통보주 (Filing States) — 단순 접수\n다음 주는 사전 승인은 필요 없지만, 프랜차이즈 판매 전 통보(Filing) 의무가 있습니다.\n\n- Connecticut, Florida, Kentucky, Nebraska, North Carolina, South Carolina, Texas, Utah\n\n비등록주\n위 리스트에 없는 주는 연방 FDD만 준비하면 프랜차이즈 판매가 가능합니다.\n\n초기 진출 시 전략\n1) 첫 진출 도시의 주가 등록주라면, 그 주 등록을 우선 완료\n2) 인근 확장 예상 주가 통보주라면, 첫 등록과 병렬 진행\n3) 다수 등록주를 한 번에 진행할지, 순차적으로 진행할지는 자본과 스케줄에 따라 결정\n\n결론: 진출 첫해에 어느 주에서 프랜차이지를 모집할지에 따라 FDD 준비의 우선순위와 스케줄이 결정됩니다. 이 결정은 시장 진입 전략 초기 단계에서 확정되어야 합니다.",
        "reading_time": 7,
        "cover_image": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    },
    {
        "slug": "direct-vs-franchise-vs-jv",
        "order": 8,
        "title": "직진출 vs 프랜차이즈 vs JV: 어떤 방식이 맞을까",
        "category": "시장 진입 전략",
        "excerpt": "자본 부담, 통제력, 시장 진입 속도. 세 가지 진입 방식은 이 세 축에서 근본적으로 다릅니다.",
        "content": "미국 시장 진입 방식은 크게 세 가지로 나뉩니다. 각 방식은 자본 부담, 브랜드 통제력, 진입 속도에서 서로 다른 트레이드오프를 가집니다.\n\n직진출 (Direct Entry)\n- 자본 부담: 매우 높음. 매장당 $500K~$1.5M 초기 자본 + 6개월 운영 자금.\n- 브랜드 통제력: 최고. 매장 운영, 인력, 마케팅 모두 직접 관리.\n- 진입 속도: 느림. 첫 매장 오픈까지 6~12개월. 다수 매장 확장에 자본 부담이 급증.\n- 적합한 브랜드: 브랜드 자산이 여전히 진화 중이고, 초기 소수 매장으로 시장 반응을 정밀 확인해야 하는 경우.\n\n프랜차이즈 (Franchise)\n- 자본 부담: 낮음. 프랜차이지 자본으로 확장하며, 본사는 FDD 준비와 로열티 수취 구조에 집중.\n- 브랜드 통제력: 중간. SOP와 매뉴얼로 표준화하지만, 매장 운영은 프랜차이지 재량.\n- 진입 속도: 상대적으로 빠름. FDD 준비(6~10주) + 첫 프랜차이지 확보 + 오픈까지 8~12개월.\n- 적합한 브랜드: 국내에서 검증된 SOP를 갖추고 있으며, 확장 속도가 자본 능력을 앞서는 경우.\n\n조인트 벤처 (Joint Venture)\n- 자본 부담: 중간. 미국 파트너와 자본을 분담. 지분 구조에 따라 20~80% 사이.\n- 브랜드 통제력: 지분과 계약에 따라 결정. 잘 설계하면 통제 유지, 잘못 설계하면 브랜드 방향성 상실 위험.\n- 진입 속도: 파트너의 부동산·운영 네트워크를 활용하면 가장 빠를 수 있음.\n- 적합한 브랜드: 미국 시장의 부동산·운영 노하우가 절실하고, 지분 일부 양보로 이를 확보할 의사가 있는 경우.\n\n결정 프레임워크\n1) 자본 여력: 5년간 최소 몇 개 매장을 자본으로 감당할 수 있는가?\n2) 브랜드 성숙도: SOP가 매뉴얼화되어 있는가? 프랜차이지가 재현 가능한가?\n3) 확장 속도의 시장 기회: 진입 창구가 5년인가, 2년인가?\n\n실무에서는 세 방식을 순차적으로 결합하는 경우도 많습니다. 초기 1~2년은 직진출로 브랜드 검증, 이후 프랜차이즈로 확장, 특정 시장은 JV로 진입 — 이런 하이브리드 구조가 자본 효율과 통제력의 균형을 맞추는 데 유리합니다.",
        "reading_time": 8,
        "cover_image": "https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    },
    {
        "slug": "dc-nova-korean-corridor",
        "order": 9,
        "title": "워싱턴 DC · 버지니아 한인 상권, 무엇이 다른가",
        "category": "시장 진입 전략",
        "excerpt": "Annandale, Centreville, Fairfax — 북부 버지니아의 한인 커뮤니티 상권은 뉴욕·LA와 다른 결을 갖습니다.",
        "content": "뉴욕과 LA가 미국 내 대표적인 한인 상권으로 알려져 있지만, 워싱턴 DC 광역권(북부 버지니아 중심)의 한인 커뮤니티도 이에 못지않게 밀도 높은 상권을 형성하고 있습니다.\n\n북부 버지니아 한인 상권의 특징\n1) 소득 수준\n연방 정부와 국제기관 종사자가 밀집한 지역 특성상 소득 중앙값이 높고, 프리미엄 카테고리에 대한 수요가 상대적으로 견고합니다.\n\n2) 밀집도\nAnnandale과 Centreville은 한인 밀집 상권의 대표 지역으로, 한식당, K-Beauty, K-Pop 굿즈, 한인 마트, 학원, 병원까지 완결된 생태계가 형성되어 있습니다.\n\n3) 부동산 특징\nLA·뉴욕 대비 임대료 부담이 낮고, 리테일 공간의 회전율이 상대적으로 낮아 안정적인 임대 관계 형성이 가능합니다.\n\n4) 소비 패턴\n뉴욕처럼 트렌드 실험적 소비보다는, 검증된 브랜드를 반복 소비하는 패턴이 두드러집니다. 진입 초기 리스크가 낮은 반면, 폭발적 확장 가능성은 뉴욕만큼 크지 않습니다.\n\nDC 도심\n반면 DC 도심(다운타운, Georgetown, Dupont Circle 등)은 관광객과 젊은 프로페셔널을 타겟팅한 프리미엄 브랜드 진출에 유리합니다. 이 지역은 한인 커뮤니티보다는 미국 주류 소비자를 겨냥한 포지셔닝이 적합합니다.\n\n주요 상권별 특징\n- Annandale (버지니아): 한인 커뮤니티의 심장. F&B, 리테일, 서비스 모두 밀집.\n- Centreville (버지니아): 젊은 한인 가족 인구 중심. 학원, F&B, 소비재 강세.\n- Fairfax (버지니아): 오피스와 리테일이 혼합된 균형 시장.\n- Tysons Corner (버지니아): 프리미엄 몰 중심. 미국 주류 시장 진출용.\n- Georgetown (DC): 프리미엄 라이프스타일 브랜드. 관광객 트래픽.\n\n결론: 북부 버지니아는 첫 매장 오픈으로 브랜드를 미국 시장에 안착시키기에 자본 부담과 리스크가 상대적으로 낮은 시장입니다. 이후 확장은 뉴욕·LA로 이어지는 것이 자연스러운 경로입니다.",
        "reading_time": 7,
        "cover_image": "https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    },
    {
        "slug": "first-90-days-post-opening",
        "order": 10,
        "title": "오픈 후 첫 90일, 무엇을 점검해야 하나",
        "category": "매장 오픈 · 운영",
        "excerpt": "스태프 이탈률, 매출 대 예측, 실질 임대료 부담 — 안정화 여부를 판단하는 구체적 지표.",
        "content": "매장 오픈은 성공의 종착점이 아니라 안정화의 출발점입니다. 오픈 후 첫 90일은 매장이 지속 가능한 운영 궤도에 진입하는지, 조기 개입이 필요한지를 판단하는 결정적 기간입니다.\n\n1) 스태프 이탈률 (Turnover Rate)\n첫 30일 이탈률이 15%를 넘으면 조기 경보입니다. 30% 이상이면 매니지먼트 구조를 재점검해야 합니다.\n\n주요 원인\n- 트레이닝 부실\n- 근무 스케줄의 불안정성\n- 매니저의 커뮤니케이션 스타일\n\n대응: 매주 스태프 1:1 미팅, 30일 시점 리뷰, 60일 시점 재검토.\n\n2) 매출 대 예측 (Sales vs. Projection)\n첫 30일 매출이 예측의 70% 이하면 재무 모델을 재점검해야 합니다.\n\n분석 프레임\n- 트래픽 (Traffic): 예측 대비 실제 방문객 수\n- 전환율 (Conversion): 방문객 중 구매로 이어진 비율\n- 객단가 (Average Ticket): 1인당 평균 구매 금액\n\n어느 지표가 예측을 벗어났는지 파악하면 개입 방향이 달라집니다. 트래픽 부족이면 마케팅, 전환율 부족이면 매장 경험, 객단가 부족이면 상품 구성.\n\n3) 실질 임대료 부담 (Effective Rent Load)\n임대료가 매출의 몇 %를 차지하는지 매월 계산해야 합니다. 리테일 카테고리별 안전선:\n\n- F&B: 매출의 8~12%\n- 리테일: 매출의 10~15%\n- 프리미엄 F&B: 매출의 6~10%\n\n임대료 부담이 안전선을 크게 초과하면 90일 시점에 임대인과의 조기 대화가 필요합니다.\n\n4) NNN Reconciliation 실제 값\n계약 시점의 NNN 추정치와 실제 청구액이 다를 수 있습니다. 첫 3개월 청구서를 검토해 연간 예상치를 조정해야 합니다.\n\n5) 리뷰 및 온라인 평판\nGoogle Reviews, Yelp, Instagram의 초기 리뷰 흐름은 이후 6개월 매출에 지속적으로 영향을 미칩니다. 부정적 리뷰가 3개 이상 누적되면 즉시 대응 프로토콜을 실행해야 합니다.\n\n90일 시점의 종합 판단\n- 스태프 이탈률 < 15%\n- 매출 > 예측의 80%\n- 임대료 부담 안전선 내\n- 부정 리뷰 관리 프로토콜 작동\n\n이 네 가지가 충족되면 매장이 안정화 궤도에 진입했다고 판단할 수 있습니다.",
        "reading_time": 8,
        "cover_image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    },
    {
        "slug": "personal-guarantee-negotiation",
        "order": 11,
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
