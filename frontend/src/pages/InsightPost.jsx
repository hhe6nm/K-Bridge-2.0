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

// Turns **bold** inside a line into <strong> segments.
function renderInline(text, keyPrefix) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${keyPrefix}-${i}`} className="font-semibold text-[color:var(--kb-ink)]">{part.slice(2, -2)}</strong>;
    }
    return <span key={`${keyPrefix}-${i}`}>{part}</span>;
  });
}

const isHeadingBlock = (block) => block.trim().startsWith("## ");
const isQuoteBlock = (block) => block.trim().startsWith("> ");
const isListLine = (line) => /^(-\s|\d+[).]\s)/.test(line.trim());

// Parses the plain-text `content` field into structured blocks and renders
// headings, quotes, numbered/bulleted lists, and paragraphs distinctly.
function ArticleBody({ content }) {
  const blocks = content.split("\n\n").map((b) => b.trim()).filter(Boolean);

  return (
    <>
      {blocks.map((block, bi) => {
        // Heading: "## 사례 1: Innisfree — ..."
        if (isHeadingBlock(block)) {
          const text = block.replace(/^##\s*/, "");
          return (
            <h2
              key={bi}
              className="font-serif-kr text-2xl md:text-[28px] font-medium text-[color:var(--kb-ink)] mt-14 mb-5 leading-snug"
            >
              {renderInline(text, `h-${bi}`)}
            </h2>
          );
        }

        // Direct quote block (e.g. analyst commentary) — marked with "> "
        if (isQuoteBlock(block)) {
          const text = block.replace(/^>\s*/, "");
          return (
            <blockquote
              key={bi}
              className="border-l-2 border-[color:var(--kb-gold)] pl-6 md:pl-8 my-8 italic text-[color:var(--kb-text)] text-lg leading-[1.85] font-sans-kr"
            >
              {renderInline(text, `q-${bi}`)}
            </blockquote>
          );
        }

        // Numbered or bulleted list — lines within the block share a "\n"
        const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
        if (lines.length > 1 && lines.every(isListLine)) {
          const ordered = /^\d+[).]\s/.test(lines[0]);
          const Tag = ordered ? "ol" : "ul";
          return (
            <Tag
              key={bi}
              className={`my-6 pl-6 space-y-3 text-lg leading-[1.85] text-[color:var(--kb-text)]/85 font-sans-kr ${
                ordered ? "list-decimal" : "list-disc"
              }`}
            >
              {lines.map((line, li) => {
                const stripped = line.replace(/^(-\s|\d+[).]\s)/, "");
                return (
                  <li key={li} className="pl-2">
                    {renderInline(stripped, `li-${bi}-${li}`)}
                  </li>
                );
              })}
            </Tag>
          );
        }

        // Single short line with no ending punctuation and next to a longer
        // block often reads as a sub-heading (e.g. "실무 팁", "결론").
        // Treat short (<20 char) standalone lines with no trailing period as
        // sub-headings for visual rhythm, matching this site's existing house style.
        if (lines.length === 1 && lines[0].length <= 20 && !/[.!?다요]$/.test(lines[0])) {
          return (
            <h3
              key={bi}
              className="font-serif-kr text-xl font-medium text-[color:var(--kb-ink)] mt-10 mb-3"
            >
              {renderInline(lines[0], `sh-${bi}`)}
            </h3>
          );
        }

        // Default: paragraph (preserve internal single-line breaks)
        return (
          <p key={bi} className="text-lg leading-[1.9] text-[color:var(--kb-text)]/85 mb-6 font-sans-kr">
            {lines.map((line, li) => (
              <span key={li}>
                {renderInline(line, `p-${bi}-${li}`)}
                {li < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        );
      })}
    </>
  );
}

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
              <ArticleBody content={post.content} />
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
