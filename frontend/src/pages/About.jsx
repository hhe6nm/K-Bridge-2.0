import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { FadeUp, MaskedLineInView } from "@/components/MaskedReveal";
import ChapterBadge from "@/components/ChapterBadge";
import StatsBlock from "@/components/StatsBlock";
import SectionQuote from "@/components/SectionQuote";
import { useLang } from "@/lib/i18n";
import {
  Route,
  Building2,
  Network,
  Languages,
  Target,
  Check,
} from "lucide-react";

const APPROACH_ICONS = {
  route: Route,
  "building-skyscraper": Building2,
  network: Network,
  language: Languages,
  "target-arrow": Target,
};

const CONTENT = {
  ko: {
    eyebrow: "About K Bridge",
    title: "한국의 도전을, 미국의 현실로.",
    subtitle: "이론이 아닌 현장에서, 함께 만듭니다.",

    introBadge: "회사 개요",
    introTitle: "한국과 미국을 잇는, 하나의 파트너.",
    introBody: [
      "K Bridge Partners는 한국의 유망한 프랜차이즈 및 소비재 브랜드가 미국 시장에 성공적으로 진출하고 안정적으로 성장할 수 있도록 지원하는 U.S. Market Entry & Business Development 전문 파트너입니다.",
      "한국과 미국의 서로 다른 시장환경, 소비자 문화, 법률 및 비즈니스 시스템에 대한 이해를 바탕으로 단순한 컨설팅을 넘어 시장조사부터 사업구조 구축, 현지 파트너 발굴, 입지 선정, 프랜차이즈 개발, 마케팅 및 사업 확장까지 실제 시장 진입에 필요한 전 과정을 연결하고 실행합니다.",
      "K Bridge Partners의 핵심 가치는 \"Bridge\"에 있습니다.",
      "한국의 좋은 브랜드와 미국의 시장·자본·파트너·소비자를 연결하여, 한국 브랜드가 미국에서 지속 가능한 비즈니스로 성장할 수 있도록 돕습니다.",
    ],
    stats: [
      { value: "20+", unit: "년", label: "상업 부동산 실무 경험" },
      { value: "8", unit: "개", label: "커버하는 미국 주요 시장" },
      { value: "28", unit: "곳", label: "전문 네트워크 파트너" },
      { value: "6", unit: "개", label: "제공 서비스 분야" },
    ],

    ceoBadge: "대표 인사말",
    ceoQuote: "한 걸음, 한 걸음을 함께 걷겠습니다.",
    ceoBody: [
      "안녕하십니까. K Bridge CEO Jessica Chong 입니다.",
      "K Bridge Partners를 찾아주셔서 감사합니다.",
      "오랫동안 여러 브랜드의 현장에서 일하면서, 정말 좋은 제품과 진심 어린 이야기를 가진 한국 기업들을 많이 만났습니다. 밤새워 브랜드를 키워온 사람들, 자기 이름을 걸고 시작한 사람들이었습니다.",
      "그런데 그렇게 애써 키운 브랜드가 미국이라는 낯선 시장 앞에서 자꾸 작아지는 모습을 볼 때마다 마음이 쓰였습니다. 실력이 부족해서가 아니었습니다. 그저 이 시장을 먼저 겪어본 사람이, 옆에서 손을 잡아줄 사람이 없었을 뿐이었습니다.",
      "\"이렇게 좋은 브랜드가, 이런 이유로 여기서 멈춰야 하나.\" 그 마음이 오래 남았고, K Bridge Partners는 거기서 시작됐습니다.",
      "저희는 보고서를 만들어 드리고 끝나는 회사가 아닙니다. 브랜드가 미국 땅에 실제로 자리 잡을 때까지, 그 모든 과정을 곁에서 함께 걷습니다.",
      "솔직히 말씀드리면, 저희에게 이 일은 그냥 사업이 아닙니다. 애정을 담아 키운 브랜드가 낯선 땅에서도 인정받는 모습을 보는 것 — 그게 저희가 이 일을 계속하는 이유입니다.",
      "여러분의 브랜드가 다음 이야기의 주인공이 되면 좋겠습니다. 그 여정에 K Bridge Partners가 함께하겠습니다.",
      "감사합니다.",
    ],
    ceoSignatureName: "Jessica Chong",
    ceoSignatureTitle: "K Bridge Partners 대표",

    foundingBadge: "진출 과제",
    foundingHeading: "미국 진출, 왜 어려울까요?",
    foundingIntro: "많은 한국 기업이 미국 진출 과정에서 다음과 같은 어려움을 경험합니다.",
    foundingHook: "",
    foundingPatterns: [
      "적합한 지역 선정의 어려움",
      "현지 부동산 시장 이해 부족",
      "법인 및 인허가 절차",
      "현지 파트너 발굴",
      "브랜드 현지화",
      "운영 시스템 구축",
    ],
    foundingLocalHeading: "",
    foundingCredibility: "K Bridge는 수십 년간 미국 상업 부동산 현장에서 활동해온 창업팀의 실전 경험에서 출발했습니다. 그 시간이 만들어 낸 것은 계약서에는 적히지 않은 감각입니다 — 임대인이 어떤 조건에서 유연해지는지, 어떤 상권이 데이터와 달리 실제로 걷기 어려운지, 어떤 시공 업체가 예산을 지키는지.",

    approachBadge: "Why K Bridge",
    approachTitle: "왜 K Bridge와 함께해야 할까요.",
    approachStages: [
      {
        title: "처음부터 오픈까지, 원스톱 솔루션",
        body: "여러 업체를 거치지 않고, 한 팀이 시장 조사부터 매장 오픈까지 함께 실행합니다.",
        icon: "route",
        featured: true,
      },
      {
        title: "프랜차이즈 & 상업용 부동산 전문성",
        body: "일반 컨설팅이 아닌, 실전 부동산과 프랜차이즈 실무에서 나온 전문성입니다.",
        icon: "building-skyscraper",
      },
      {
        title: "미국 현지 네트워크",
        body: "20년 이상 다져온 임대인, 시공사, 전문가 네트워크로 실행력을 더합니다.",
        icon: "network",
      },
      {
        title: "한미 비즈니스 환경에 대한 이해",
        body: "한국의 사업 관행과 미국의 실무 방식, 양쪽 언어로 협상합니다.",
        icon: "language",
      },
      {
        title: "현장에서 실행 가능한 현실적인 전략",
        body: "이론이 아닌, 실제로 작동하는 전략만 제안합니다.",
        icon: "target-arrow",
      },
    ],
    approachClosing: "다섯 가지 이유, 하나의 확신.",

    ctaTitle: "다음 단계를 함께 그려봅니다.",
    ctaButton: "무료 상담 신청",
  },

  en: {
    eyebrow: "About K Bridge",
    title: "Your Vision, Our Mission.",
    subtitle: "Built in the field. With you. For you.",

    introBadge: "Company Overview",
    introTitle: "Korea's Brands, Built for America.",
    introBody: [
      "K Bridge Partners is a specialized U.S. Market Entry & Business Development partner, helping promising Korean franchise and consumer brands enter the U.S. market successfully and grow sustainably. The firm covers eight U.S. metro markets today, through a network of 28 vetted local partners built over 25 years of operating in U.S. commercial real estate.",
      "Built on an understanding of the differing market environments, consumer cultures, legal frameworks, and business systems between Korea and the U.S., we go beyond simple consulting, connecting and executing the full process a real market entry requires, from market research and business structuring to local partner sourcing, site selection, franchise development, marketing, and business expansion.",
      "That's the whole job. Getting it right the first time, so there isn't a second time.",
    ],
    stats: [
      { value: "20+", unit: "years", label: "of commercial real estate experience" },
      { value: "8", unit: "markets", label: "U.S. metros we cover" },
      { value: "28", unit: "partners", label: "in our vetted network" },
      { value: "6", unit: "services", label: "verticals we deliver" },
    ],

    ceoBadge: "A Message from Our CEO",
    ceoQuote: "One Step at a Time. Together.",
    ceoBody: [
      "Hello, I'm Jessica Chong, CEO of K Bridge Partners.",
      "Thank you for taking the time to learn more about K Bridge Partners.",
      "Over the years, I've had the opportunity to work closely with Korean brands and the people behind them. I've seen firsthand the dedication, creativity, and care that go into building a business from the ground up. I've also seen how difficult it can be to bring that success into an unfamiliar market like the United States.",
      "Entering a new market takes more than a good product. It requires a clear understanding of the market, the right strategy, strong local relationships, and the ability to navigate challenges along the way.",
      "That is why we founded K Bridge Partners.",
      "Our role is to work alongside our clients throughout that journey, not simply to provide recommendations, but to help turn those recommendations into action. From entering the U.S. market to building a lasting presence, we are committed to being a trusted partner every step of the way.",
      "We believe that every brand has a story worth sharing, and that the right support can help that story reach a much larger audience.",
      "As K Bridge Partners continues to grow, our commitment remains simple: to help Korean companies build meaningful, sustainable success in the United States.",
      "I look forward to seeing where your journey takes you, and I hope K Bridge Partners can be there with you along the way.",
      "Thank you.",
    ],
    ceoSignatureName: "Jessica Chong",
    ceoSignatureTitle: "Chief Executive Officer, K Bridge Partners",

    foundingBadge: "Market Challenges",
    foundingHeading: "The U.S. Market Is Full of Opportunity. Getting There Takes More Than a Good Plan.",
    foundingIntro:
      "A strong product is only the beginning. Entering the U.S. means navigating an unfamiliar market, making decisions with limited local context, and building the right foundation for long-term growth.",
    foundingHook: "What makes the journey challenging?",
    foundingPatterns: [
      { title: "Where should we start?", body: "Choosing the right city, region, and market for your brand." },
      { title: "Will our brand resonate here?", body: "Adapting your brand to the U.S. market without losing what makes it unique." },
      { title: "How do we set up correctly?", body: "Navigating entity formation, licensing, regulations, and other local requirements." },
      { title: "Who can we trust?", body: "Finding reliable local partners, vendors, landlords, and professionals." },
      { title: "How do we make the operation work?", body: "Building the people, systems, and processes needed to operate successfully." },
      { title: "How do we build for what's next?", body: "Creating a foundation that supports sustainable growth beyond the first launch." },
    ],
    foundingLocalHeading: "This is where local experience matters.",
    foundingCredibility:
      "K Bridge Partners was built on decades of hands-on experience in the U.S. commercial real estate market. Over the years, we've learned that some of the most important decisions go beyond what a report or spreadsheet can tell you, from choosing the right location and understanding how a market really works, to finding partners who can deliver. We bring that practical experience to every engagement, helping Korean brands enter the U.S. with greater clarity, confidence, and a stronger foundation for growth.",

    approachBadge: "Why K Bridge",
    approachTitle: "Why Brands Choose K Bridge.",
    approachStages: [
      {
        title: "You bring the brand. We know the ground.",
        body: "From market entry to opening day, K Bridge brings the local experience and coordination needed to help your business take root in the U.S.",
        icon: "route",
        featured: true,
      },
      {
        kicker: "Experience where it matters",
        title: "Deep expertise in U.S. commercial real estate and franchising",
        body: "Our team brings decades of hands-on experience across commercial real estate, site selection, and franchise development, not just theoretical market knowledge.",
        icon: "building-skyscraper",
      },
      {
        kicker: "Relationships you can build on",
        title: "A trusted network on the ground",
        body: "More than 20 years of relationships with landlords, contractors, brokers, vendors, and other local partners help our clients move with greater confidence.",
        icon: "network",
      },
      {
        kicker: "Understanding both sides",
        title: "We know how Korean businesses work",
        body: "We understand the expectations, decision-making, and business culture on both sides of the bridge, and know how to turn them into effective U.S. operations.",
        icon: "language",
      },
      {
        kicker: "From strategy to reality",
        title: "One team from first step to opening day",
        body: "We don't stop at recommendations. We stay involved through the decisions, coordination, and execution required to turn a plan into a functioning U.S. business.",
        icon: "target-arrow",
      },
    ],
    approachClosing: "Five reasons. One conviction.",

    ctaTitle: "Let's Sketch the Next Step Together.",
    ctaButton: "Free Consultation",
  },
};

export default function About() {
  const { lang } = useLang();
  const t = CONTENT[lang];

  return (
    <div>
      <PageHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

      {/* Intro + stats — shared component */}
      <StatsBlock
        badge={{ number: 1, label: t.introBadge }}
        badgeClassName="mb-10"
        stats={t.stats}
        testIdPrefix="about-stat"
        overviewTitle={t.introTitle}
        overviewBody={t.introBody}
        containerClassName="max-w-[1440px] mx-auto px-6 lg:px-10"
      />

      {/* CEO's Message */}
      <section className="bg-[color:var(--kb-paper)] pt-16 md:pt-20 pb-24 md:pb-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          {/* Chapter badge */}
          <FadeUp>
            <ChapterBadge number={2} label={t.ceoBadge} />
          </FadeUp>

          {/* Section heading */}
          <FadeUp delay={0.1}>
            <h2 className="mt-10 font-serif-kr text-4xl md:text-5xl font-light leading-[1.2] text-[color:var(--kb-ink)] max-w-5xl text-balance break-keep">
              {t.ceoQuote}
            </h2>
          </FadeUp>

          {/* Body paragraphs */}
          <FadeUp delay={0.25}>
            <div className="mt-8 space-y-5 max-w-3xl">
              {t.ceoBody.map((p, i) => (
                <p key={i} className="text-base md:text-[17px] text-[color:var(--kb-text)]/80 leading-[1.9]">
                  {p}
                </p>
              ))}
            </div>
          </FadeUp>

          {/* Signature */}
          <FadeUp delay={0.35}>
            <div className="mt-10 max-w-3xl" data-testid="ceo-signature">
              <img
                src="/jessica-chong-signature.svg"
                alt={t.ceoSignatureName}
                className="h-20 md:h-24 w-auto -ml-3 md:-ml-4 select-none"
                draggable={false}
              />
              <p className="mt-5 text-sm text-[color:var(--kb-ink)]">{t.ceoSignatureName}</p>
              <p className="mt-1 text-sm text-[color:var(--kb-text)]/60">{t.ceoSignatureTitle}</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Market Challenges */}
      <section className="bg-[color:var(--kb-bone)] pt-16 md:pt-20 pb-24 md:pb-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <ChapterBadge number={3} label={t.foundingBadge} />
          </FadeUp>

          {/* Section heading */}
          <FadeUp delay={0.1}>
            <h2 className="mt-10 font-serif-kr text-4xl md:text-5xl font-light leading-[1.2] text-[color:var(--kb-ink)] max-w-5xl text-balance break-keep">
              {t.foundingHeading}
            </h2>
          </FadeUp>

          {/* Intro line */}
          <FadeUp delay={0.15}>
            <p className="mt-8 text-lg text-[color:var(--kb-text)]/80 leading-[1.9] max-w-3xl">
              {t.foundingIntro}
            </p>
          </FadeUp>

          {/* Hook line — introduces the challenges list (only for content that has one) */}
          {t.foundingHook && (
            <FadeUp delay={0.2}>
              <p className="mt-12 font-serif-kr text-xl md:text-2xl font-light text-[color:var(--kb-ink)] max-w-3xl">
                {t.foundingHook}
              </p>
            </FadeUp>
          )}

          {/* Six challenge points — checklist grid. Items may be a plain string
              or a {title, body} pair depending on language content. */}
          <FadeUp delay={0.3}>
            <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-7 max-w-4xl">
              {t.foundingPatterns.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-1 w-6 h-6 rounded-full border border-[color:var(--kb-gold)] flex items-center justify-center">
                    <Check size={13} strokeWidth={2} className="text-[color:var(--kb-gold)]" />
                  </span>
                  {typeof item === "string" ? (
                    <span className="text-base md:text-lg text-[color:var(--kb-text)]/85">{item}</span>
                  ) : (
                    <span>
                      <p className="text-base md:text-lg font-medium text-[color:var(--kb-ink)]">{item.title}</p>
                      <p className="mt-1 text-sm md:text-base text-[color:var(--kb-text)]/70 leading-[1.7]">{item.body}</p>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </FadeUp>

          {/* Local experience heading (only for content that has one) */}
          {t.foundingLocalHeading && (
            <FadeUp delay={0.35}>
              <h3 className="mt-16 font-serif-kr text-2xl md:text-3xl font-light text-[color:var(--kb-ink)] max-w-3xl">
                {t.foundingLocalHeading}
              </h3>
            </FadeUp>
          )}

          {/* Credibility paragraph */}
          <FadeUp delay={0.4}>
            <p className="mt-6 text-lg text-[color:var(--kb-text)]/80 leading-[1.9] max-w-3xl">
              {t.foundingCredibility}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Why K Bridge — bento grid: one featured navy card + 4 supporting cards */}
      <section className="bg-[color:var(--kb-paper)] pt-16 md:pt-20 pb-24 md:pb-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <ChapterBadge number={4} label={t.approachBadge} />
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="mt-10 font-serif-kr text-4xl md:text-5xl font-light leading-[1.2] text-[color:var(--kb-ink)] max-w-5xl text-balance break-keep">
              {t.approachTitle}
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="mt-4 text-base text-[color:var(--kb-text)]/60 max-w-3xl">
              {t.approachClosing}
            </p>
          </FadeUp>

          <FadeUp delay={0.25}>
            <div
              className="mt-16 grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 gap-4 md:gap-5"
              data-testid="about-why-grid"
            >
              {t.approachStages.map((stage, i) => {
                const Icon = APPROACH_ICONS[stage.icon] || Route;

                if (stage.featured) {
                  return (
                    <div
                      key={i}
                      className="md:col-start-1 md:row-start-1 md:row-span-2 bg-[color:var(--kb-ink)] p-8 md:p-10 flex flex-col justify-between min-h-[220px]"
                    >
                      <Icon size={26} strokeWidth={1.5} className="text-[color:var(--kb-gold)]" />
                      <div>
                        <h3 className="font-serif-kr text-xl md:text-2xl font-light leading-[1.4] text-[color:var(--kb-champagne)] mb-3">
                          {stage.title}
                        </h3>
                        <p className="text-[13px] md:text-sm text-white/85 leading-[1.7]">
                          {stage.body}
                        </p>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={i}
                    className="bg-[color:var(--kb-bone)] border border-[color:var(--kb-border)] p-7 md:p-8"
                  >
                    <Icon size={22} strokeWidth={1.5} className="text-[color:var(--kb-gold)]" />
                    {stage.kicker && (
                      <p className="mt-4 text-[11px] md:text-xs uppercase tracking-[0.15em] text-[color:var(--kb-gold)]">
                        {stage.kicker}
                      </p>
                    )}
                    <h3 className="mt-2 font-serif-kr text-lg md:text-xl font-light leading-[1.4] text-[color:var(--kb-ink)] mb-2">
                      {stage.title}
                    </h3>
                    <p className="text-[13px] md:text-sm text-[color:var(--kb-text)]/70 leading-[1.7]">
                      {stage.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[color:var(--kb-ink)] text-white py-24 md:py-28">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-10 text-center">
          <FadeUp>
            <h2 className="font-serif-kr text-4xl md:text-6xl font-light leading-[1.1] italic text-[color:var(--kb-champagne)]">
              <MaskedLineInView>{t.ctaTitle}</MaskedLineInView>
            </h2>
            <div className="mt-10">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-[color:var(--kb-gold)] text-[color:var(--kb-ink)] px-10 py-5 text-sm tracking-[0.25em] uppercase hover:bg-[color:var(--kb-champagne)] transition-colors"
              >
                {t.ctaButton}
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
