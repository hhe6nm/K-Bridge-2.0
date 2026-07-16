import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[color:var(--kb-ink)] text-white/70" data-testid="site-footer">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-[color:var(--kb-border)]">
          <div className="md:col-span-5">
            <div className="font-serif-kr text-3xl text-[color:var(--kb-champagne)]">K Bridge Partners</div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/60">
              한국 브랜드의 미국 진출 파트너.<br />
              수십 년간 축적된 미국 상업 부동산과 프랜차이즈 실전 경험을 바탕으로,
              단순한 자문이 아닌 실질적 실행을 함께합니다.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-[11px] tracking-[0.25em] uppercase text-[color:var(--kb-gold)] mb-5">서비스</div>
            <ul className="space-y-3 text-sm">
              <li><Link to="/services" className="hover:text-[color:var(--kb-champagne)]">시장 진입 전략</Link></li>
              <li><Link to="/services" className="hover:text-[color:var(--kb-champagne)]">프랜차이즈 확장</Link></li>
              <li><Link to="/services" className="hover:text-[color:var(--kb-champagne)]">법인 설립 · 오픈 지원</Link></li>
              <li><Link to="/services" className="hover:text-[color:var(--kb-champagne)]">상업 부동산 · 입지 선정</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-[11px] tracking-[0.25em] uppercase text-[color:var(--kb-gold)] mb-5">회사</div>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-[color:var(--kb-champagne)]">소개</Link></li>
              <li><Link to="/team" className="hover:text-[color:var(--kb-champagne)]">팀</Link></li>
              <li><Link to="/process" className="hover:text-[color:var(--kb-champagne)]">프로세스</Link></li>
              <li><Link to="/insights" className="hover:text-[color:var(--kb-champagne)]">인사이트</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-[11px] tracking-[0.25em] uppercase text-[color:var(--kb-gold)] mb-5">문의</div>
            <ul className="space-y-3 text-sm">
              <li className="text-white/70">Los Angeles</li>
              <li className="text-white/70">New York</li>
              <li className="text-white/70">Dallas</li>
              <li className="pt-3"><Link to="/contact" className="text-[color:var(--kb-champagne)] tick-arrow">상담 신청</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between gap-4 text-xs text-white/40">
          <div>© {year} K Bridge Partners. All rights reserved.</div>
          <div className="flex gap-6">
            <span>KR · EN</span>
            <span>Est. 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
