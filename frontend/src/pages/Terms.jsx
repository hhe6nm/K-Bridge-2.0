import PageHeader from "@/components/PageHeader";
import { FadeUp } from "@/components/MaskedReveal";
import { useLang } from "@/lib/i18n";

const CONTENT = {
  ko: {
    eyebrow: "Legal",
    title: "이용약관",
    subtitle: "본 이용약관은 K Bridge Partners LLC(이하 \u201C회사\u201D)의 웹사이트 및 서비스 이용에 관한 조건을 규정합니다.",
    updated: "최종 업데이트: 2026년 2월",
    sections: [
      {
        h: "1. 서비스 개요",
        p: "회사는 한국 브랜드의 미국 시장 진출을 지원하는 자문 및 실행 서비스를 제공합니다. 본 웹사이트에 게시된 정보는 일반적 안내를 위한 것이며, 개별 상황에 대한 법률·회계·투자 자문을 구성하지 않습니다.",
      },
      {
        h: "2. 계약 관계",
        p: "실제 자문 관계는 개별 서면 계약(Engagement Letter)이 체결된 시점에 성립됩니다. 웹사이트를 통한 문의만으로는 회사와 이용자 간에 자문 관계가 성립되지 않습니다.",
      },
      {
        h: "3. 지식재산권",
        p: "본 웹사이트의 모든 콘텐츠(텍스트, 그래픽, 로고, 인사이트 게시물 포함)는 회사의 자산이며, 사전 서면 동의 없이 복제·재배포·상업적 이용이 금지됩니다.",
      },
      {
        h: "4. 책임의 제한",
        p: "웹사이트에 게재된 정보의 정확성을 유지하기 위해 노력하지만, 특정 상황에 대한 결과를 보장하지 않습니다. 회사는 웹사이트 이용으로 발생하는 간접적, 부수적, 결과적 손해에 대해 책임지지 않습니다.",
      },
      {
        h: "5. 준거법",
        p: "본 이용약관은 미국 버지니아주 법령에 따라 해석되며, 관련 분쟁은 버지니아주 관할 법원의 전속 관할에 따릅니다.",
      },
      {
        h: "6. 문의처",
        p: "본 약관 관련 문의는 이메일(contact@k-bridge-partners.com) 또는 전화((703) 629-9056)로 연락 주시기 바랍니다.",
      },
    ],
  },
  en: {
    eyebrow: "Legal",
    title: "Terms of Service",
    subtitle: "These Terms of Service govern your use of the K Bridge Partners LLC website and services.",
    updated: "Last updated: February 2026",
    sections: [
      {
        h: "1. About Our Services",
        p: "K Bridge Partners LLC provides advisory and execution services supporting Korean brands entering the U.S. market. Content on this website is provided for general informational purposes and does not constitute legal, accounting, or investment advice.",
      },
      {
        h: "2. Client Relationship",
        p: "A formal advisory relationship only exists upon execution of a written engagement letter. Submitting an inquiry through this website does not, by itself, establish an advisory relationship.",
      },
      {
        h: "3. Intellectual Property",
        p: "All website content — including text, graphics, logos, and insight posts — is the property of K Bridge Partners LLC. Reproduction, redistribution, or commercial use without prior written consent is prohibited.",
      },
      {
        h: "4. Limitation of Liability",
        p: "While we make good-faith efforts to keep website content accurate, we make no guarantees regarding outcomes. K Bridge Partners LLC is not liable for indirect, incidental, or consequential damages arising from use of this website.",
      },
      {
        h: "5. Governing Law",
        p: "These Terms are governed by the laws of the Commonwealth of Virginia, USA. Any disputes shall be resolved exclusively in the courts of Virginia.",
      },
      {
        h: "6. Contact",
        p: "For questions about these Terms, contact us at contact@k-bridge-partners.com or (703) 629-9056.",
      },
    ],
  },
};

export default function Terms() {
  const { lang } = useLang();
  const t = CONTENT[lang];
  return (
    <div>
      <PageHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
      <section className="bg-[color:var(--kb-bone)] py-24 md:py-28">
        <div className="max-w-[860px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <div className="text-xs text-[color:var(--kb-muted)] mb-12 tracking-widest uppercase">{t.updated}</div>
            {t.sections.map((s, i) => (
              <div key={i} className="mb-10">
                <h2 className="font-serif-kr text-xl md:text-2xl font-light text-[color:var(--kb-ink)] mb-3">{s.h}</h2>
                <p className="text-base md:text-lg text-[color:var(--kb-text)]/80 leading-[1.9]">{s.p}</p>
              </div>
            ))}
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
