import { createContext, useContext, useEffect, useState, useCallback } from "react";

const LangContext = createContext({ lang: "ko", setLang: () => {}, toggle: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window === "undefined") return "ko";
    return localStorage.getItem("kb-lang") || "ko";
  });

  useEffect(() => {
    localStorage.setItem("kb-lang", lang);
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang === "ko" ? "ko" : "en";
    }
  }, [lang]);

  const setLang = useCallback((v) => setLangState(v), []);
  const toggle = useCallback(() => setLangState((l) => (l === "ko" ? "en" : "ko")), []);

  return (
    <LangContext.Provider value={{ lang, setLang, toggle }}>{children}</LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

/**
 * Pick localized content from a { ko, en } object.
 * Falls back to ko when en is missing.
 */
export function pick(content, lang) {
  if (!content) return content;
  return content[lang] ?? content.ko;
}
