# K Bridge Partners — PRD

## Original Problem
Multi-page premium consulting website for K Bridge Partners LLC — a U.S. market-entry
consulting firm helping Korean brands launch and grow in the U.S. Differentiator: decades
of firsthand U.S. commercial real estate + franchise experience, delivered as execution
(not just advisory).

## User Choices
- Language: **Bilingual KO/EN** (KO primary, EN toggle)
- Contact form: **MongoDB only** (email later)
- Insights (Blog): **Full CMS backed by MongoDB**
- Imagery: **Tasteful stock placeholders** (Unsplash)
- Font pairing: **Noto Serif KR** (headings) + **Pretendard** (body)
- Brand mark: client-provided K BRIDGE PARTNERS wordmark (LLC cropped out per revision brief)

## Design Direction
- Deep navy/ink base (#050914 / #0A1128) + champagne gold (#C6A87C / #E5D3B3)
- Kinetic hero with masked line-by-line reveal + parallax skyline
- framer-motion scroll reveals + lenis smooth scrolling throughout
- Top horizontal nav (9 links) with KO/EN toggle
- Static value pillars (신뢰 / 실전 경험 / 전문성 / 현지 네트워크)
- Interactive Process timeline (5 steps)
- Team hover-reveal bios
- 3×2 equal-height service cards
- Numbered ChapterBadge site-wide (replaced old "CHAPTER — X" pattern)
- Gold + bilingual Pill component for inline vocabulary

## Architecture
- Backend: FastAPI + Motor (MongoDB) — endpoints under `/api`
- Frontend: React 19 + React Router 7 + framer-motion + lenis + Shadcn UI
- Contact + Insights collections in MongoDB

## What's Implemented (Latest: 2026-02)

### Core (previously shipped)
- 12 routes: /, /about, /team, /services, /process, /insights, /insights/:slug, /faq, /locations, /contact, /privacy, /terms
- Backend: GET /api/, GET/POST /api/insights, GET /api/insights/{slug}, POST/GET /api/contact
- Contact form → MongoDB with sonner toast feedback
- FAQ shadcn accordion
- Mobile responsive nav with drawer
- KO/EN toggle persists via localStorage['kb-lang']

### 2026-02 Revision Brief (full pass)
**Global**
- Client K BRIDGE PARTNERS wordmark, LLC cropped from both `/kbp-logo.png` + `/kbp-logo-gold.png`
- Removed "FROM KOREA TO AMERICA" eyebrow everywhere
- Sitewide numbered ChapterBadge (01, 02, 03…) replaces "CHAPTER — X"
- Global bilingual Pill component
- Success Stories page + nav item **removed entirely**
- `scroll-padding-top: 96px` on html to fix sticky-nav content overlap

**Home**
- Real numeric stats (26 / 8 / 28 / 6) with fixed AnimatedCounter (memoized parse)
- Perspective section with DC/NoVA streetscape photo + rewritten body copy
- 6 service cards in 3×2 grid — 2nd is **Local Network Connections** (new)
- Placeholder disclaimer removed

**About**
- New hero: "한국의 도전을, 미국의 현실로."
- Section order: Overview (stats) → Mission → Approach → Founding Story
- Recognition/Awards section removed
- Mission section: isolated statement with gold left-accent + 3 bilingual pills + italic closing quote
- Approach section: 4-stage vertical timeline (Entity → Lease → Buildout → Ops)
- Founding Story: merged 창업 배경 + 창업자 이야기, top-wide photo + failure patterns + credibility

**Services**
- New headline "시장 조사부터 매장 오픈까지, 하나의 팀이 함께합니다."
- 6 pillars (added Local Network Connections at position 2)
- Fixed 초기 repetition in Store Opening card
- Updated CTA copy

**Team**
- 3 real team members: Jessica Chong (CEO), Joy Chong (Director), Samantha Cho (Principal Consultant)
- Bilingual titles, real bios, high-contrast chip tags

**Process**
- 5 steps with realistic timelines: 1–2주, 4–6주, 2–4개월, 6–10주, 4–8주 + 90일
- Expanded descriptions per step

**FAQ**
- 12 questions grouped into 4 categories (법인·비용 / 진행 과정 / 언어·소통 / 회사 소개)
- Custom chevron rotates 180° on open
- Gold left-accent + tinted background on active item
- scroll-mt-28 to fix sticky-nav overlap

**Locations**
- Chicago replaces New Jersey
- New tagline "지역에 상관없이, 함께 진출할 수 있습니다."

**Contact**
- New headline "한 통의 메시지로 시작됩니다."
- Email `contact@k-bridge-partners.com`, phone `(703) 629-9056`
- 'OFFICES' renamed to 'LOCATIONS'
- Fixed logo image (h-12 w-auto)

**Footer**
- Removed "Est. 2026"
- Contact block: email + phone + LinkedIn icons
- Legal column: Privacy Policy + Terms of Service (linked to real pages)
- '상담 신청' CTA moved out of Locations column into tagline column

**New Legal Pages**
- /privacy — bilingual privacy policy
- /terms — bilingual terms of service

**Insights**
- Replaced 4 legacy seed articles with 10 curated Korean articles (order 1–10)
- Legacy slugs auto-cleaned on startup
- Topics: EIN, E-2, Percentage Rent, Co-Tenancy, Lease Terms, Franchise Registration, Direct vs Franchise vs JV, DC/NoVA Corridor, First 90 Days, Personal Guarantee

## Testing
- iteration_1..3: backend 100%, frontend ~95–98%
- iteration_4: backend 100% (9/9 pytest), found 1 HIGH bug (AnimatedCounter re-render)
- iteration_5: verified AnimatedCounter fix — counters now converge to 26/8/28/6 on Home + About. Frontend 100%.

## Deployment Health
- deployment_agent: **PASS** — no hardcoded secrets, env externalized, CORS OK, supervisor valid, `/api` prefix consistent, no build errors. Ready to promote.

## Backlog (P1)
- Real professional photography (hero + team headshots)
- Numeric stats: keep 26/8/28/6 or replace with growth-updated figures
- Admin CMS UI for creating/editing insights (POST endpoint exists)
- Resend email notifications on contact submit

## Backlog (P2)
- Case study data schema + editorial detail template
- Interactive US map on Locations page
- Sitemap.xml + robots.txt + OG images
- Newsletter capture on Insights index
- prefers-reduced-motion opt-out for AnimatedCounter (accessibility)

## Next Tasks
1. Client to provide real hero + team photography
2. Wire Resend for contact form email notifications
3. Build /admin/insights CMS UI
4. Add sitemap.xml + robots.txt + OG meta tags for social sharing
