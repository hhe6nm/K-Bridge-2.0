import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { TID } from "@/lib/testIds";
import { useLang } from "@/lib/i18n";
import Logo from "@/components/Logo";

const LINK_META = [
  { to: "/", ko: "홈", en: "Home", tid: TID.navHome },
  { to: "/about", ko: "회사 소개", en: "About", tid: TID.navAbout },
  { to: "/team", ko: "팀", en: "Team", tid: TID.navTeam },
  { to: "/services", ko: "서비스", en: "Services", tid: TID.navServices },
  { to: "/process", ko: "프로세스", en: "Process", tid: TID.navProcess },
  { to: "/success", ko: "성공 사례", en: "Success", tid: TID.navSuccess },
  { to: "/insights", ko: "인사이트", en: "Insights", tid: TID.navInsights },
  { to: "/faq", ko: "FAQ", en: "FAQ", tid: TID.navFaq },
  { to: "/locations", ko: "지역", en: "Locations", tid: TID.navLocations },
  { to: "/contact", ko: "문의", en: "Contact", tid: TID.navContact },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { lang, toggle } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const cta = lang === "ko" ? "무료 상담 신청" : "Free Consultation";
  const menuLabel = lang === "ko" ? "메뉴" : "Menu";
  const langLabel = lang === "ko" ? "언어 선택" : "Language";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#050914]/85 backdrop-blur-xl border-b border-[color:var(--kb-border)]" : "bg-transparent"
      }`}
      data-testid="site-navbar"
    >
      <div className={`max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center justify-between transition-all duration-500 ${scrolled ? "h-20" : "h-24"}`}>
        <Link to="/" className="flex items-center group" data-testid="nav-logo" aria-label="K Bridge Partners — Home">
          <Logo
            variant="light"
            className={`w-auto transition-all duration-500 ${scrolled ? "h-10" : "h-14"}`}
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
          {LINK_META.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              data-testid={l.tid}
              className={({ isActive }) =>
                `relative px-2.5 xl:px-3 py-2 text-[12px] xl:text-[13px] tracking-wide transition-colors group ${
                  isActive ? "text-[color:var(--kb-gold)]" : "text-white/80 hover:text-[color:var(--kb-gold)]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{lang === "ko" ? l.ko : l.en}</span>
                  <span
                    className={`pointer-events-none absolute left-2.5 xl:left-3 right-2.5 xl:right-3 -bottom-0.5 h-px bg-[color:var(--kb-gold)] origin-left transition-transform duration-500 ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="hidden md:inline text-[11px] tracking-[0.25em] uppercase text-white/70 border border-[color:var(--kb-border)] px-3 py-1.5 hover:text-[color:var(--kb-gold)] hover:border-[color:var(--kb-gold)] transition-colors"
            data-testid={TID.langToggle}
            aria-label={langLabel}
          >
            <span className={lang === "ko" ? "text-[color:var(--kb-gold)]" : "text-white/40"}>KO</span>
            <span className="mx-1.5 text-white/30">/</span>
            <span className={lang === "en" ? "text-[color:var(--kb-gold)]" : "text-white/40"}>EN</span>
          </button>
          <Link
            to="/contact"
            data-testid={TID.navCta}
            className="hidden md:inline-flex items-center bg-[color:var(--kb-gold)] text-[color:var(--kb-ink)] px-5 py-2.5 text-[12px] tracking-[0.2em] uppercase font-medium hover:bg-[color:var(--kb-champagne)] transition-colors"
          >
            {cta}
          </Link>
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setOpen((v) => !v)}
            data-testid={TID.mobileMenuToggle}
            aria-label={menuLabel}
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
            className="lg:hidden bg-[#050914]/95 backdrop-blur-xl border-t border-[color:var(--kb-border)]"
          >
            <div className="px-6 py-6 flex flex-col divide-y divide-[color:var(--kb-border)]">
              {LINK_META.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  data-testid={`mobile-${l.tid}`}
                  className={({ isActive }) =>
                    `py-4 text-lg font-serif-kr ${isActive ? "text-[color:var(--kb-gold)]" : "text-white/85"}`
                  }
                >
                  {lang === "ko" ? l.ko : l.en}
                </NavLink>
              ))}
              <button
                onClick={toggle}
                className="py-4 text-left text-[11px] tracking-[0.3em] uppercase text-[color:var(--kb-gold)]"
                data-testid={`mobile-${TID.langToggle}`}
              >
                {lang === "ko" ? "Switch to English" : "한국어로 보기"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
