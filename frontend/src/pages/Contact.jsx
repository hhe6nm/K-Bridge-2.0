import { useState } from "react";
import { toast } from "sonner";
import PageHeader from "@/components/PageHeader";
import { FadeUp } from "@/components/MaskedReveal";
import Logo from "@/components/Logo";
import { submitContact } from "@/lib/api";
import { TID } from "@/lib/testIds";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { LOCATIONS } from "@/lib/locations";

const INITIAL = { name: "", company: "", email: "", phone: "", message: "" };

const CONTENT = {
  ko: {
    eyebrow: "Contact", title: "대화의 시작.",
    subtitle: "미국 진출의 첫 걸음은 좋은 대화에서 시작됩니다. 부담 없이 문의해 주세요.",
    sideEyebrow: "무료 상담 신청",
    sideTitle1: "당신의 브랜드에 대해",
    sideTitleItalic: "듣고 싶습니다.",
    sideBody: "진출 준비 단계, 카테고리, 목표 시장에 대해 간단히 알려주시면, 담당 파트너가 48시간 이내로 회신드립니다.",
    labelEmail: "Email", labelPhone: "Phone", labelOffices: "Offices",
    officesValue: "Washington D.C. · New York · Miami · Dallas",
    fName: "이름 *", fCompany: "회사", fEmail: "이메일 *", fPhone: "전화", fMessage: "문의 내용 *",
    placeholder: "브랜드, 카테고리, 준비 단계, 목표를 자유롭게 알려주세요.",
    disclaimer: "제출 시 K Bridge Partners의 개인정보 처리 방침에 동의하는 것으로 간주됩니다.",
    submit: "상담 신청", submitting: "전송 중...",
    successMsg: "문의가 접수되었습니다. 곧 연락드리겠습니다.",
    validationMsg: "이름, 이메일, 메시지는 필수 입력 항목입니다.",
    errorMsg: "전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
  },
  en: {
    eyebrow: "Contact", title: "Let's start a conversation.",
    subtitle: "The first step into the U.S. begins with a good conversation. Reach out — no pressure.",
    sideEyebrow: "Free consultation",
    sideTitle1: "We'd love to",
    sideTitleItalic: "hear about your brand.",
    sideBody: "Tell us where you are in the process, your category, and target market. A partner will reply within 48 hours.",
    labelEmail: "Email", labelPhone: "Phone", labelOffices: "Offices",
    officesValue: "Washington D.C. · New York · Miami · Dallas",
    fName: "Name *", fCompany: "Company", fEmail: "Email *", fPhone: "Phone", fMessage: "Message *",
    placeholder: "Tell us about your brand, category, stage of readiness, and goals.",
    disclaimer: "By submitting, you agree to K Bridge Partners' privacy policy.",
    submit: "Send inquiry", submitting: "Sending...",
    successMsg: "Your inquiry has been received. We'll be in touch shortly.",
    validationMsg: "Name, email, and message are required.",
    errorMsg: "Something went wrong. Please try again in a moment.",
  },
};

export default function Contact() {
  const { lang } = useLang();
  const t = CONTENT[lang];
  const [form, setForm] = useState(INITIAL);
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error(t.validationMsg);
      return;
    }
    setSubmitting(true);
    try {
      await submitContact(form);
      toast.success(t.successMsg);
      setForm(INITIAL);
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(typeof detail === "string" ? detail : t.errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = "w-full bg-transparent border-0 border-b border-[color:var(--kb-border)] focus:border-[color:var(--kb-gold)] outline-none py-4 text-lg placeholder:text-[color:var(--kb-muted)]/60 transition-colors";

  return (
    <div>
      <PageHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

      <section className="bg-[color:var(--kb-bone)] py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-12 gap-10">
          <FadeUp className="col-span-12 lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <div className="mb-8" data-testid="contact-logo">
                <Logo variant="dark" className="w-40 h-auto" />
              </div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-gold)] mb-4">{t.sideEyebrow}</div>
              <h2 className="font-serif-kr text-4xl md:text-5xl font-light leading-tight">
                {t.sideTitle1}<br />
                <span className="italic text-[color:var(--kb-gold)]">{t.sideTitleItalic}</span>
              </h2>
              <p className="mt-8 text-lg text-[color:var(--kb-text)]/70 leading-relaxed max-w-md">{t.sideBody}</p>

              <div className="mt-16 space-y-8">
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-muted)] mb-2">{t.labelEmail}</div>
                  <div className="font-serif-kr text-xl">contact@kbridgepartners.com</div>
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-muted)] mb-2">{t.labelPhone}</div>
                  <div className="font-serif-kr text-xl">+1 (000) 000-0000</div>
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-muted)] mb-2">{t.labelOffices}</div>
                  <ul className="space-y-1" data-testid="contact-locations-list">
                    {LOCATIONS.map((loc) => (
                      <li key={loc.key} className="font-serif-kr text-lg text-[color:var(--kb-text)]/85">
                        {lang === "ko" ? loc.ko : loc.en}
                        <span className="ml-2 text-xs text-[color:var(--kb-muted)] tracking-widest">{loc.state.split(" · ")[0]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </FadeUp>

          <FadeUp className="col-span-12 lg:col-span-7" delay={0.15}>
            <form onSubmit={onSubmit} data-testid={TID.contactForm} className="bg-white border border-[color:var(--kb-border)] p-10 md:p-14 space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                <div className="pt-4">
                  <label className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-gold)]">{t.fName}</label>
                  <input name="name" value={form.name} onChange={onChange} className={inputCls} data-testid={TID.contactName} required />
                </div>
                <div className="pt-4">
                  <label className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-gold)]">{t.fCompany}</label>
                  <input name="company" value={form.company} onChange={onChange} className={inputCls} data-testid={TID.contactCompany} />
                </div>
                <div className="pt-4">
                  <label className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-gold)]">{t.fEmail}</label>
                  <input type="email" name="email" value={form.email} onChange={onChange} className={inputCls} data-testid={TID.contactEmail} required />
                </div>
                <div className="pt-4">
                  <label className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-gold)]">{t.fPhone}</label>
                  <input name="phone" value={form.phone} onChange={onChange} className={inputCls} data-testid={TID.contactPhone} />
                </div>
              </div>

              <div className="pt-8">
                <label className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--kb-gold)]">{t.fMessage}</label>
                <textarea name="message" value={form.message} onChange={onChange} rows={5}
                  className={`${inputCls} resize-none`} data-testid={TID.contactMessage}
                  placeholder={t.placeholder} required />
              </div>

              <div className="pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <p className="text-xs text-[color:var(--kb-muted)] max-w-sm">{t.disclaimer}</p>
                <button type="submit" disabled={submitting} data-testid={TID.contactSubmit}
                  className="inline-flex items-center gap-3 bg-[color:var(--kb-ink)] text-white px-8 py-4 text-sm tracking-[0.25em] uppercase hover:bg-[color:var(--kb-gold)] hover:text-[color:var(--kb-ink)] transition-colors disabled:opacity-50">
                  {submitting ? t.submitting : t.submit} <ArrowUpRight size={16} />
                </button>
              </div>
            </form>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
