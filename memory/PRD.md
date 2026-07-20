# K Bridge Partners — PRD

## Original Problem
Multi-page premium consulting website for K Bridge Partners, a U.S. market-entry
consulting firm helping Korean brands launch and grow in the U.S. Core differentiator:
decades of firsthand U.S. commercial real estate & franchise experience.

## User Choices
- Language: **Bilingual KO/EN** (KO primary, EN toggle)
- Contact form: **MongoDB only** (email later)
- Insights (Blog): **Full CMS backed by MongoDB**
- Imagery: **Tasteful placeholders** (Unsplash)
- Font pairing: **Noto Serif KR** (headings) + **Pretendard** (body)
- Brand mark: client-provided K BRIDGE PARTNERS LLC wordmark (raster PNG)

## Design Direction (Award-worthy)
- Deep navy/ink base (#050914 / #0A1128) + champagne gold accents (#C6A87C / #E5D3B3)
- Kinetic hero with masked line-by-line reveal + parallax skyline
- framer-motion scroll reveals + lenis smooth scrolling throughout
- Top horizontal nav (10 links) with KO/EN toggle
- Static value pillars (Trust / Experience / Professionalism / Local Expertise)
- Interactive Process timeline
- Team hover-reveal bios
- Equal-height service cards
- Sitewide client wordmark logo (raster PNG) — gold silhouette on dark, full-color on light

## Architecture
- Backend: FastAPI + Motor (MongoDB) — endpoints under `/api`
- Frontend: React 19 + React Router 7 + framer-motion + lenis + Shadcn UI
- Contact + Insights collections in MongoDB

## What's Implemented (2026-12 → 2026-02)
- 10 routes: /, /about, /team, /services, /process, /success, /insights, /insights/:slug, /faq, /locations, /contact
- Backend: GET /api/, GET/POST /api/insights, GET /api/insights/{slug}, POST/GET /api/contact
- Auto-seed 4 Korean insight articles on startup
- Contact form → MongoDB with sonner toast feedback
- Blog CMS: full detail page render from Mongo
- FAQ shadcn accordion
- Mobile responsive nav with drawer

### 2026-02 Visual & Interactive Upgrade Pass
- Centralized locations data in `/app/frontend/src/lib/locations.js` (Footer, Contact, Locations all share)
- Horizontal interactive Process timeline (5 steps)
- Team hover-reveal photo → bio panels
- Success Stories category/industry filter
- AnimatedCounter for Home stats
- Sitewide `Logo` component + custom favicon (regenerated from client K mark)
- Fixed Dallas + New Jersey skyline imagery
- KO/EN toggle persists via `localStorage['kb-lang']`

### 2026-02 Client Logo Swap
- Replaced inline SVG `Logo` with client-provided raster PNG (K BRIDGE PARTNERS LLC)
  - `/kbp-logo.png` — full color (transparent bg) for light backgrounds
  - `/kbp-logo-gold.png` — gold silhouette for dark navy backgrounds
- Removed duplicate hero wordmark on Home page (navbar logo is now the single instance)
- Regenerated favicons from client K mark (.ico, 32×32 PNG, 64×64 PNG)

## Testing (2026-02)
- iteration_3.json: backend 100% (4/4 pytest passing), frontend ~98%. Zero functional bugs.
- Design flags (content decisions, not code):
  - Process page ships 5 steps (not 6) — accepted in iteration_2
  - Team page uses '성함 예정' placeholder names + KB monogram (awaiting real data)
  - AnimatedCounter shows bracketed placeholders ('[수십]', '[X]') — no numeric animation until real data lands

## Backlog (P1)
- Real photography from client (hero + team headshots)
- Real numeric stats to replace bracketed placeholders on Home
- Admin CMS UI for creating/editing insights (POST endpoint exists)
- Email notifications on contact submit (Resend integration)
- Confirm final Process step count (5 vs 6) with client

## Backlog (P2)
- Case study data schema + editorial detail template
- Interactive US map on Locations page
- Sitemap.xml + robots.txt + OG images
- Newsletter capture on Insights index
- Real team member names + bios

## Next Tasks
1. Client to provide brand photography for hero + team headshots
2. Client to supply real numeric metrics + team roster
3. Wire Resend for contact form email notifications
4. Build minimal `/admin/insights` route for CMS create/edit
