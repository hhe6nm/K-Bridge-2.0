import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { FadeUp } from "@/components/MaskedReveal";
import { fetchInsight } from "@/lib/api";
import { useLang } from "@/lib/i18n";

const CONTENT = {
  ko: { notFound: "글을 찾을 수 없습니다.", back: "인사이트로 돌아가기", loading: "불러오는 중...", author: "Author", all: "모든 인사이트" },
  en: { notFound: "Article not found.", back: "Back to Insights", loading: "Loading...", author: "Author", all: "All Insights" },
};

export default function InsightPost() {
  const { slug } = useParams();
  const { lang } = useLang();
  const t = CONTENT[lang];
  const [post, setPost] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchInsight(slug).then(setPost).catch(() => setError(true));
  }, [slug]);

  if (error) {
    return (
      <div className="pt-40 pb-40 text-center bg-[color:var(--kb-bone)]">
        <div className="font-serif-kr text-4xl">{t.notFound}</div>
        <Link to="/insights" className="mt-8 inline-block text-[color:var(--kb-gold)] tick-arrow">{t.back}</Link>
      </div>
    );
  }
  if (!post) {
    return <div className="pt-40 pb-40 text-center bg-[color:var(--kb-bone)] text-[color:var(--kb-muted)]">{t.loading}</div>;
  }

  return (
    <div>
      <PageHeader eyebrow={`Insights · ${post.category}`} title={post.title} subtitle={post.excerpt} />
      <section className="bg-[color:var(--kb-bone)] py-24 md:py-32">
        <div className="max-w-[860px] mx-auto px-6 lg:px-10">
          {post.cover_image && (
            <FadeUp>
              <div className="aspect-[16/9] overflow-hidden mb-16 clip-corner">
                <img src={post.cover_image} alt="" className="w-full h-full object-cover" />
              </div>
            </FadeUp>
          )}
          <FadeUp>
            <div className="prose max-w-none">
              {post.content.split("\n").filter(Boolean).map((p, i) => (
                <p key={i} className="text-lg leading-[1.9] text-[color:var(--kb-text)]/85 mb-6 font-sans-kr">{p}</p>
              ))}
            </div>
          </FadeUp>
          <div className="mt-20 pt-10 border-t border-[color:var(--kb-border)] flex flex-col sm:flex-row justify-between gap-6">
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-gold)]">{t.author}</div>
              <div className="mt-2 font-serif-kr text-2xl">{post.author}</div>
            </div>
            <Link to="/insights" className="text-[color:var(--kb-ink)] tick-arrow text-sm tracking-[0.25em] uppercase self-end">{t.all}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
