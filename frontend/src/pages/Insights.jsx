import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { FadeUp } from "@/components/MaskedReveal";
import { fetchInsights } from "@/lib/api";
import { TID } from "@/lib/testIds";
import { useLang } from "@/lib/i18n";

const CONTENT = {
  ko: {
    eyebrow: "Insights", title: "시장을 읽는 시선.",
    subtitle: "현장에서 발견한 인사이트를 정리합니다. 한국 브랜드의 미국 진출에 실질적으로 도움이 되는 관점들.",
    loading: "불러오는 중...", empty: "게시글이 준비되고 있습니다.",
    featuredLabel: "Featured", readMin: "분 읽기", read: "읽기",
  },
  en: {
    eyebrow: "Insights", title: "Reading the Market.",
    subtitle: "What we're seeing on the ground, and what it means for your next move.",
    loading: "Loading...", empty: "New posts are being prepared.",
    featuredLabel: "Featured", readMin: "min read", read: "Read",
  },
};

export default function Insights() {
  const { lang } = useLang();
  const t = CONTENT[lang];
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ok = true;
    fetchInsights().then((data) => { if (ok) setPosts(data); }).catch(() => {}).finally(() => { if (ok) setLoading(false); });
    return () => { ok = false; };
  }, []);

  const [featured, ...rest] = posts;

  return (
    <div>
      <PageHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

      <section className="bg-[color:var(--kb-bone)] py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          {loading && <div className="text-center text-[color:var(--kb-muted)] py-24" data-testid="insights-loading">{t.loading}</div>}
          {!loading && posts.length === 0 && <div className="text-center text-[color:var(--kb-muted)] py-24" data-testid="insights-empty">{t.empty}</div>}

          {featured && (
            <FadeUp>
              <Link to={`/insights/${featured.slug}`} data-testid={`${TID.insightCard}-featured`}
                className="group grid grid-cols-12 gap-8 border-b border-[color:var(--kb-border)] pb-16 mb-16">
                <div className="col-span-12 lg:col-span-7 overflow-hidden">
                  <div className="aspect-[16/10] overflow-hidden bg-[color:var(--kb-ink)] clip-corner">
                    {featured.cover_image && <img src={featured.cover_image} alt="" className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />}
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-5 flex flex-col justify-center">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-gold)] mb-4">{t.featuredLabel} · {featured.category}</div>
                  <h2 className="font-serif-kr text-3xl md:text-5xl font-light leading-tight group-hover:text-[color:var(--kb-gold)] transition-colors">{featured.title}</h2>
                  <p className="mt-6 text-lg text-[color:var(--kb-text)]/70 leading-relaxed">{featured.excerpt}</p>
                  <div className="mt-8 flex items-center gap-6 text-xs tracking-[0.2em] uppercase text-[color:var(--kb-muted)]">
                    <span>{featured.reading_time} {t.readMin}</span>
                    <span className="w-px h-3 bg-[color:var(--kb-border)]" />
                    <span className="tick-arrow text-[color:var(--kb-ink)]">{t.read}</span>
                  </div>
                </div>
              </Link>
            </FadeUp>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((p, i) => (
              <FadeUp key={p.id} delay={i * 0.05}>
                <Link to={`/insights/${p.slug}`} data-testid={`${TID.insightCard}-${p.slug}`}
                  className="group block bg-white border border-[color:var(--kb-border)] hover:border-[color:var(--kb-gold)] transition-colors">
                  <div className="aspect-[16/10] overflow-hidden bg-[color:var(--kb-ink)]">
                    {p.cover_image && <img src={p.cover_image} alt="" className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />}
                  </div>
                  <div className="p-8">
                    <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-gold)] mb-4">{p.category}</div>
                    <h3 className="font-serif-kr text-2xl font-light leading-tight group-hover:text-[color:var(--kb-gold)] transition-colors">{p.title}</h3>
                    <p className="mt-4 text-sm text-[color:var(--kb-muted)] leading-relaxed line-clamp-3">{p.excerpt}</p>
                    <div className="mt-6 text-[11px] tracking-[0.25em] uppercase text-[color:var(--kb-ink)] tick-arrow">{p.reading_time} {t.readMin}</div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
