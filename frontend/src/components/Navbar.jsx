import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { TID } from "@/lib/testIds";

const LINKS = [
  { to: "/", label: "홈", tid: TID.navHome },
  { to: "/about", label: "회사 소개", tid: TID.navAbout },
  { to: "/team", label: "팀", tid: TID.navTeam },
  { to: "/services", label: "서비스", tid: TID.navServices },
  { to: "/process", label: "프로세스", tid: TID.navProcess },
  { to: "/success", label: "성공 사례", tid: TID.navSuccess },
  { to: "/insights", label: "인사이트", tid: TID.navInsights },
  { to: "/faq", label: "FAQ", tid: TID.navFaq },
  { to: "/locations", label: "지역", tid: TID.navLocations },
  { to: "/contact", label: "문의", tid: TID.navContact },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#050914]/85 backdrop-blur-xl border-b border-[color:var(--kb-border)]" : "bg-transparent"
      }`}
      data-testid="site-navbar"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group" data-testid="nav-logo">
          <span className="font-serif-kr text-[color:var(--kb-champagne)] text-2xl tracking-tight">
            K Bridge
          </span>
          <span className="hidden sm:inline text-[10px] tracking-[0.28em] uppercase text-[color:var(--kb-gold)]/70 border-l border-[color:var(--kb-border)] pl-3">
            Partners
          </span>
        </Link>

        <nav className="hidden xl:flex items-center gap-1">
          {LINKS.slice(1, -1).map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={l.tid}
              className={({ isActive }) =>
                `px-3 py-2 text-[13px] tracking-wide transition-colors ${
                  isActive ? "text-[color:var(--kb-gold)]" : "text-white/80 hover:text-[color:var(--kb-gold)]"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            className="hidden md:inline text-[11px] tracking-[0.25em] uppercase text-white/70 border border-[color:var(--kb-border)] px-3 py-1.5 hover:text-[color:var(--kb-gold)] transition-colors"
            data-testid={TID.langToggle}
            aria-label="언어 선택"
          >
            KR · <span className="text-white/40">EN</span>
          </button>
          <Link
            to="/contact"
            data-testid={TID.navCta}
            className="hidden md:inline-flex items-center bg-[color:var(--kb-gold)] text-[color:var(--kb-ink)] px-5 py-2.5 text-[12px] tracking-[0.2em] uppercase font-medium hover:bg-[color:var(--kb-champagne)] transition-colors"
          >
            무료 상담 신청
          </Link>
          <button
            className="xl:hidden text-white p-2"
            onClick={() => setOpen((v) => !v)}
            data-testid={TID.mobileMenuToggle}
            aria-label="메뉴"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="xl:hidden bg-[#050914]/95 backdrop-blur-xl border-t border-[color:var(--kb-border)]"
          >
            <div className="px-6 py-6 flex flex-col divide-y divide-[color:var(--kb-border)]">
              {LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  data-testid={`mobile-${l.tid}`}
                  className={({ isActive }) =>
                    `py-4 text-lg font-serif-kr ${isActive ? "text-[color:var(--kb-gold)]" : "text-white/85"}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
