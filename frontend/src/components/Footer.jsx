import { Link } from "react-router-dom";
import { useLang } from "@/lib/i18n";

export default function Footer() {
  const year = new Date().getFullYear();
  const { lang } = useLang();
  const t = lang === "ko"
    ? {
        tagline1: "한국 브랜드의 미국 진출 파트너.",
        tagline2: "수십 년간 축적된 미국 상업 부동산과 프랜차이즈 실전 경험을 바탕으로, 단순한 자문이 아닌 실질적 실행을 함께합니다.",
        services: "서비스",
        s1: "시장 진입 전략", s2: "프랜차이즈 확장", s3: "법인 설립 · 오픈 지원", s4: "상업 부동산 · 입지 선정",
        company: "회사", a1: "소개", a2: "팀", a3: "프로세스", a4: "인사이트",
        contact: "문의", cta: "상담 신청",
      }
    : {
        tagline1: "The U.S. market-entry partner for Korean brands.",
        tagline2: "Built on decades of hands-on U.S. commercial real estate and franchise experience — we don't just advise, we execute.",
        services: "Services",
        s1: "Market Entry Strategy", s2: "Franchise Development", s3: "Business Setup & Launch", s4: "Real Estate & Site Selection",
        company: "Company", a1: "About", a2: "Team", a3: "Process", a4: "Insights",
        contact: "Contact", cta: "Request Consultation",
      };

  return (
    <footer className="bg-[color:var(--kb-ink)] text-white/70" data-testid="site-footer">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-[color:var(--kb-border)]">
          <div className="md:col-span-5">
            <div className="font-serif-kr text-3xl text-[color:var(--kb-champagne)]">K Bridge Partners</div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/60">
              {t.tagline1}<br />{t.tagline2}
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-[11px] tracking-[0.25em] uppercase text-[color:var(--kb-gold)] mb-5">{t.services}</div>
            <ul className="space-y-3 text-sm">
              <li><Link to="/services" className="hover:text-[color:var(--kb-champagne)]">{t.s1}</Link></li>
              <li><Link to="/services" className="hover:text-[color:var(--kb-champagne)]">{t.s2}</Link></li>
              <li><Link to="/services" className="hover:text-[color:var(--kb-champagne)]">{t.s3}</Link></li>
              <li><Link to="/services" className="hover:text-[color:var(--kb-champagne)]">{t.s4}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-[11px] tracking-[0.25em] uppercase text-[color:var(--kb-gold)] mb-5">{t.company}</div>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-[color:var(--kb-champagne)]">{t.a1}</Link></li>
              <li><Link to="/team" className="hover:text-[color:var(--kb-champagne)]">{t.a2}</Link></li>
              <li><Link to="/process" className="hover:text-[color:var(--kb-champagne)]">{t.a3}</Link></li>
              <li><Link to="/insights" className="hover:text-[color:var(--kb-champagne)]">{t.a4}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-[11px] tracking-[0.25em] uppercase text-[color:var(--kb-gold)] mb-5">{t.contact}</div>
            <ul className="space-y-3 text-sm">
              <li className="text-white/70">Washington DC</li>
              <li className="text-white/70">New York</li>
              <li className="text-white/70">Miami · Dallas</li>
              <li className="pt-3"><Link to="/contact" className="text-[color:var(--kb-champagne)] tick-arrow">{t.cta}</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between gap-4 text-xs text-white/40">
          <div>© {year} K Bridge Partners. All rights reserved.</div>
          <div className="flex gap-6">
            <span>KO · EN</span>
            <span>Est. 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
