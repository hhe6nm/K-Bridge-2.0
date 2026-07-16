# K Bridge Partners — PRD

## Original Problem
Multi-page premium consulting website for K Bridge Partners, a U.S. market-entry
consulting firm helping Korean brands launch and grow in the U.S. Core differentiator:
decades of firsthand U.S. commercial real estate & franchise experience.

## User Choices
- Language: **Korean only** (all UI + content)
- Contact form: **MongoDB only** (email later)
- Insights (Blog): **Full CMS backed by MongoDB**
- Imagery: **Tasteful placeholders** (Unsplash from design guidelines)
- Font pairing: refined premium — **Noto Serif KR** (headings) + **Pretendard** (body)

## Design Direction (Award-worthy per system reminder)
- Deep navy/ink base (#050914 / #0A1128) + champagne gold accents (#C6A87C / #E5D3B3)
- Kinetic hero with masked line-by-line reveal + parallax skyline
- framer-motion scroll reveals + lenis smooth scrolling throughout
- Numbered manifesto chapters (About, Services, Process, Team)
- One slow editorial marquee (Home only)
- Spotlight/clipped-corner image treatment
- 6-step process with **Step 04 (Site Selection)** visually emphasized
- 4-pillar Services bento — pillar 04 (Commercial Real Estate) spans 2 cols

## Architecture
- Backend: FastAPI + Motor (MongoDB) — endpoints under `/api`
- Frontend: React 19 + React Router 7 + framer-motion + lenis + react-fast-marquee + Shadcn UI
- Contact + Insights collections in MongoDB

## What's Implemented (2026-12)
- 10 routes: /, /about, /team, /services, /process, /success, /insights, /insights/:slug, /faq, /locations, /contact
- Backend: GET /api/, GET/POST /api/insights, GET /api/insights/{slug}, POST/GET /api/contact
- Auto-seed 4 Korean insight articles on startup
- Contact form → MongoDB with sonner toast feedback
- Blog CMS: full detail page render from Mongo
- FAQ shadcn accordion
- Mobile responsive nav with drawer

## Testing
- iteration_1.json: backend 100%, frontend ~92% (only LOW-priority selector-based toast detection issue, no functional bug)

## Backlog (P1)
- Real photography from client (replace Unsplash placeholders)
- Admin CMS UI for creating/editing insights (POST endpoint exists)
- Email notifications on contact submit (Resend integration)
- KR ↔ EN language toggle wiring (UI shell present)
- Awards & certifications modules (placeholders in About / Team)

## Backlog (P2)
- Case study data schema + editorial detail template (shell exists)
- Interactive US map on Locations page
- Sitemap.xml + robots.txt + OG images
- Newsletter capture on Insights index

## Next Tasks
1. Have client provide brand photography for hero + team headshots
2. Wire Resend for contact form email notifications
3. Build minimal `/admin/insights` route for CMS create/edit
