// Single source of truth for K Bridge Partners U.S. market coverage.
// Used by Locations, Footer, Contact — do not duplicate this list elsewhere.
export const LOCATIONS = [
  {
    key: "dc",
    ko: "워싱턴 D.C.",
    en: "Washington D.C.",
    state: "DC · Capital Region",
    img: "https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    ko_note: "K Bridge Partners의 홈 마켓. 정부 · 국제기관 인접 지역의 리테일과 F&B 진출의 관문.",
    en_note: "K Bridge's home market — a gateway for retail and F&B entering the U.S. capital corridor.",
    tags: ["Retail", "F&B", "K-Beauty"],
  },
  {
    key: "va",
    ko: "버지니아",
    en: "Virginia",
    state: "VA · Northern VA · Richmond",
    img: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    ko_note: "북부 버지니아의 성장 상권과 리치먼드의 저비용 진입 옵션이 공존하는 균형 시장.",
    en_note: "Growth submarkets in Northern Virginia balanced with lower entry cost in Richmond.",
    tags: ["Retail", "F&B"],
  },
  {
    key: "mia",
    ko: "마이애미",
    en: "Miami",
    state: "FL · South Florida",
    img: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    ko_note: "라틴 아메리카와 미국을 잇는 관문. 프리미엄 F&B와 라이프스타일 브랜드의 실험 시장.",
    en_note: "The Latin America ↔ U.S. gateway — an experimentation market for premium F&B and lifestyle.",
    tags: ["F&B", "Lifestyle"],
  },
  {
    key: "nyc",
    ko: "뉴욕",
    en: "New York",
    state: "NY · Manhattan · Brooklyn · Queens",
    img: "https://images.unsplash.com/photo-1522083165195-3424ed129620?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    ko_note: "글로벌 브랜드의 무대. 프리미엄 포지셔닝과 미디어 노출이 결정적인 도시.",
    en_note: "The stage for global brands — where premium positioning and media exposure decide the outcome.",
    tags: ["Retail", "Fashion", "F&B"],
  },
  {
    key: "chi",
    ko: "시카고",
    en: "Chicago",
    state: "IL · Chicagoland",
    // Chicago skyline (verified Unsplash)
    img: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    ko_note: "미국 중서부 최대 상권. 다양한 이민자 커뮤니티가 만든 검증된 F&B 리테일 시장.",
    en_note: "The Midwest's largest commercial hub — a proven F&B and retail market powered by diverse immigrant communities.",
    tags: ["F&B", "Retail"],
  },
  {
    key: "dal",
    ko: "댈러스",
    en: "Dallas",
    state: "TX · DFW Metroplex",
    img: "https://images.unsplash.com/photo-1531218150217-54595bc2b934?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    ko_note: "빠르게 성장하는 아시안 커뮤니티와 상대적으로 낮은 진입 비용의 균형 시장.",
    en_note: "A fast-growing Asian community balanced with relatively lower entry cost.",
    tags: ["F&B", "Franchise"],
  },
  {
    key: "atl",
    ko: "애틀랜타",
    en: "Atlanta",
    state: "GA · Metro Atlanta",
    img: "https://images.unsplash.com/photo-1575917649705-5b59aaa12e6b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    ko_note: "미국 남부의 상업 허브. Duluth 등 아시안 커뮤니티 중심 상권의 성장세.",
    en_note: "A commercial hub of the U.S. South — Duluth and Asian-community submarkets are growing rapidly.",
    tags: ["F&B", "Retail"],
  },
  {
    key: "lv",
    ko: "라스베가스",
    en: "Las Vegas",
    state: "NV · Strip · Chinatown corridor",
    img: "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    ko_note: "관광객 트래픽 + 아시안 커뮤니티 상권이 공존하는 독특한 진입 시장.",
    en_note: "A unique market where tourist traffic overlaps with a strong Asian-community corridor.",
    tags: ["F&B", "Retail", "Franchise"],
  },
];

// Fallback used when a photo fails to load.
export const LOCATION_FALLBACK_GRADIENT =
  "linear-gradient(135deg, #0A1128 0%, #050914 60%, #12161F 100%)";
