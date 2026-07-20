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
async def  list_contact_messages(limit: int = Query(100, ge=1, le=500)):
    docs = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    return [serialize_doc(d) for d in docs]


@api_router.get("/insights", response_model=List[InsightPost])
async def list_insights(limit: int = Query(50, ge=1, le=200)):
    docs = await db.insights.find({"published": True}, {"_id": 0}).sort("created_at", -1).to_list(limit)
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

SEED_INSIGHTS = [
    {
        "slug": "korean-brands-us-lease-mistakes",
        "title": "한국 브랜드가 미국 상업 임대차에서 놓치는 5가지",
        "category": "상업 부동산",
        "excerpt": "미국 상업 임대차 계약은 한국과 근본적으로 다릅니다. 실무에서 반복적으로 발견되는 주요 리스크와 그 대응 방식.",
        "content": "미국 상업 임대차는 단순한 '월세 계약'이 아닙니다. Triple Net, CAM, Percentage Rent, Exclusive Use, Co-Tenancy 등 한국 시장에서는 낯선 조항들이 수십 페이지에 걸쳐 존재합니다.\n\n1. 임대료 외의 실제 부담 (NNN Reconciliation)\n계약서에 명시된 임대료는 실제 지불액의 60~70%에 불과한 경우가 흔합니다. 재산세, 보험, 공용 관리비가 별도로 청구되며, 매년 정산됩니다.\n\n2. 사용 조항의 함정\n'F&B 매장'이라는 광범위한 표현은 향후 브랜드 확장을 제약할 수 있습니다. 반대로 지나치게 좁게 정의하면 메뉴 변경조차 임대인 승인이 필요해집니다.\n\n3. 개인 보증(Personal Guaranty)\n미국 진출 초기 한국 법인은 신용 이력이 없어 대부분의 랜드로드가 대표 개인 보증을 요구합니다. Good Guy Guaranty 구조를 협상해야 리스크가 제한됩니다.\n\n4. TI(Tenant Improvement) 예산\n건물주가 제공하는 시설 개선비는 협상 가능한 항목입니다. 평당 $50~$150 수준으로 인테리어 예산의 상당 부분을 커버할 수 있습니다.\n\n5. 갱신·양도 조건\n초기 계약 시점에 갱신 옵션과 양도(Assignment) 조건을 확보해야, 향후 프랜차이지 매각이나 사업 재편 시 유연성이 확보됩니다.",
        "reading_time": 8,
        "cover_image": "https://images.unsplash.com/photo-1576831371356-d6e9411ae501?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600"
    },
    {
        "slug": "franchise-vs-direct-entry",
        "title": "프랜차이즈 vs 직진출 — 무엇이 맞는가",
        "category": "시장 진입 전략",
        "excerpt": "미국 시장 진입 방식은 브랜드의 라이프사이클 단계와 현금 흐름 구조에 따라 결정되어야 합니다.",
        "content": "많은 한국 브랜드가 '일단 직영으로 시작하자'는 정서적 결정을 내립니다. 그러나 미국 시장의 자본 강도와 운영 복잡성을 고려할 때, 진입 방식은 재무 모델로 검증되어야 합니다.\n\n직진출(Direct Entry)의 조건\n- 초기 3~5년간 매장당 $80만~$150만의 자본 조달 가능\n- 현지 운영 리더십 확보 능력\n- 브랜드 자산이 여전히 진화 중이어서 통제가 필요한 단계\n\n마스터 프랜차이즈(Master Franchise)\n- 이미 국내에서 검증된 SOP와 매뉴얼 보유\n- 지역별 파트너를 통해 자본과 운영을 분산\n- 로열티 및 개설비 구조의 초기 설계가 관건\n\n조인트 벤처(JV)\n- 미국 파트너의 자본과 부동산 네트워크를 활용\n- 통제권과 지분 구조에 대한 정교한 협상 필요\n\n결정 프레임워크\n브랜드의 재무 여력, 운영 성숙도, 미국 시장의 카테고리 경쟁 강도를 매트릭스로 평가해야 합니다.",
        "reading_time": 6,
        "cover_image": "https://images.unsplash.com/photo-1614595737476-42487331b8a1?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600"
    },
    {
        "slug": "understanding-us-commercial-lease-terms",
        "title": "미국 상업 임대차 용어 완전 정복",
        "category": "실무 가이드",
        "excerpt": "NNN, CAM, TI, LOI — 미국 부동산 실무에서 반복 등장하는 핵심 용어의 실전 의미.",
        "content": "미국 상업 임대차 실무에서 자주 등장하는 용어들은 계약의 실질을 결정합니다.\n\nLOI (Letter of Intent)\n본 계약 전 조건 협상서. 법적 구속력은 제한적이지만 협상의 골격을 정의합니다.\n\nNNN Lease (Triple Net)\n임차인이 재산세, 보험, 공용 관리비를 모두 부담하는 구조. 미국 리테일 임대의 표준.\n\nCAM (Common Area Maintenance)\n쇼핑센터의 공용 공간 유지비. 매년 정산되며 상한선(Cap) 협상이 중요합니다.\n\nTI Allowance (Tenant Improvement)\n건물주가 제공하는 시설 개선 지원금. 평당 지원 규모는 위치와 임차 기간에 따라 협상됩니다.\n\nExclusive Use Clause\n특정 카테고리에 대한 독점 영업권. 경쟁 브랜드의 동일 상권 입점을 차단합니다.\n\nCo-Tenancy\n앵커 테넌트가 이탈할 경우 임대료 감액 또는 계약 해지를 요구할 수 있는 권리.",
        "reading_time": 5,
        "cover_image": "https://images.unsplash.com/photo-1664353655151-9d94a9170eb0?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600"
    },
    {
        "slug": "site-selection-methodology",
        "title": "입지 선정 — 데이터와 발품의 균형",
        "category": "상업 부동산",
        "excerpt": "GIS 데이터, 인구 통계, 트래픽 분석만으로는 결정할 수 없는 미국 상권의 미묘한 결.",
        "content": "미국 리테일 입지 선정은 '데이터'와 '현장 감각'의 결합입니다.\n\n1단계: 지역 스크리닝\nDMA(Designated Market Area) 기준으로 잠재 시장을 우선 필터링합니다. 아시안 인구 밀도, 소득 중앙값, 카테고리 지출액을 교차 분석합니다.\n\n2단계: 상권 후보 선정\n선정된 도시 내에서 5~7개 상권을 후보로 압축합니다. 이 단계에서는 경쟁 밀도, 앵커 브랜드, 데일리 트래픽 카운트가 핵심 지표입니다.\n\n3단계: 부지 실사\n최소 3회 이상 서로 다른 요일과 시간대에 현장 방문. 주차 회전율, 인접 매장의 운영 강도, 도보 접근성을 실측합니다.\n\n4단계: 임대 조건 정합성 검증\n좋은 자리라 하더라도 임대 조건이 손익 모델과 맞지 않으면 포기해야 합니다. 매출 시뮬레이션과 임대료 상한선을 사전 정의합니다.\n\n결론\n최고의 입지는 데이터가 지목하는 곳이 아니라, 데이터가 지목한 후보군 중에서 현장 실사가 검증한 곳입니다.",
        "reading_time": 7,
        "cover_image": "https://images.unsplash.com/photo-1770217615204-bde2afff8c7f?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600"
    }
]


@app.on_event("startup")
async def seed_insights():
    for post in SEED_INSIGHTS:
        existing = await db.insights.find_one({"slug": post["slug"]})
        if not existing:
            doc = InsightPost(**post).model_dump()
            doc['created_at'] = doc['created_at'].isoformat()
            await db.insights.insert_one(doc)


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
