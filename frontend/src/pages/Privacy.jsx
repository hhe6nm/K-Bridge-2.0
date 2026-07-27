import PageHeader from "@/components/PageHeader";
import { FadeUp } from "@/components/MaskedReveal";
import { useLang } from "@/lib/i18n";

const CONTENT = {
  ko: {
    eyebrow: "Legal",
    title: "개인정보처리방침",
    subtitle: "K Bridge Partners LLC (이하 \u201C회사\u201D)는 개인정보 보호를 중요하게 여기며, 본 방침에 따라 개인정보를 수집·이용합니다.",
    updated: "최종 업데이트: 2026년 2월",
    sections: [
      {
        h: "1. 수집하는 개인정보",
        p: "회사는 상담 문의 접수를 위해 다음 정보를 수집합니다: 이름, 회사명, 이메일, 전화번호, 문의 내용. 제공된 정보는 문의 응대 및 서비스 상담 목적으로만 사용됩니다.",
      },
      {
        h: "2. 개인정보의 이용 목적",
        p: "수집된 개인정보는 (1) 문의 사항에 대한 응답 및 상담 진행, (2) K Bridge Partners의 서비스 제공 및 개선, (3) 관련 법령상 의무 이행에 사용됩니다.",
      },
      {
        h: "3. 개인정보의 보유 및 이용 기간",
        p: "회사는 수집한 개인정보를 문의 응답 및 상담 종료 시점부터 최대 3년간 보유하며, 이후 안전하게 파기합니다. 관련 법령에 따른 보존 의무가 있는 경우 해당 기간 동안 보관합니다.",
      },
      {
        h: "4. 제3자 제공 및 위탁",
        p: "회사는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만, 서비스 진행상 필요한 경우 사전 동의를 받거나 관련 법령에 따라 예외적으로 제공될 수 있습니다.",
      },
      {
        h: "5. 이용자의 권리",
        p: "이용자는 언제든지 자신의 개인정보에 대한 열람·정정·삭제·처리정지를 요청할 수 있으며, contact@k-bridge-partners.com 을 통해 접수됩니다.",
      },
      {
        h: "6. 문의처",
        p: "본 방침 관련 문의는 이메일(contact@k-bridge-partners.com) 또는 전화((703) 629-9056)로 연락 주시기 바랍니다.",
      },
    ],
  },
  en: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    subtitle: "K Bridge Partners LLC (\u201Cwe\u201D or \u201Cthe Company\u201D) values your privacy. This policy explains how we collect and use personal information.",
    updated: "Last updated: February 2026",
    sections: [
      {
        h: "1. Information We Collect",
        p: "We collect the following information via our consultation contact form: name, company, email, phone number, and the content of your inquiry. This information is used solely to respond to your inquiry and to discuss potential services.",
      },
      {
        h: "2. How We Use Your Information",
        p: "We use collected information to (1) respond to your inquiry and manage consultation, (2) provide and improve our services, and (3) comply with applicable legal obligations.",
      },
      {
        h: "3. Retention",
        p: "We retain personal information for up to three (3) years from the end of the consultation, after which it is securely destroyed. Where retention is required by law, we retain the data for the mandated period.",
      },
      {
        h: "4. Sharing with Third Parties",
        p: "We do not share your personal information with third parties, except with your prior consent or where required by law, or as necessary to deliver the services you requested (e.g., with vetted partner law firms or accountants engaged on your behalf).",
      },
      {
        h: "5. Your Rights",
        p: "You may request access, correction, deletion, or suspension of processing of your personal information at any time. Requests can be sent to contact@k-bridge-partners.com.",
      },
      {
        h: "6. Contact",
        p: "For questions about this policy, contact us at contact@k-bridge-partners.com or (703) 629-9056.",
      },
    ],
  },
};

export default function Privacy() {
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
