import { useState, useEffect } from "react";
import useServices from "./use-services";

export default function useTranslate() {
  const i18n = useServices().i18n;
  const api = useServices().api;

  const [currentLanguage, setCurrentLanguage] = useState(i18n.lang);

  useEffect(() => {
    const handleLanguageChange = (lang) => {
      setCurrentLanguage(lang);
    };

    const unsubscribe = i18n.subscribe(handleLanguageChange);
    api.setHeader("X-Lang", currentLanguage);
    i18n.setLang(currentLanguage);
    return () => {
      unsubscribe();
    };
  }, [currentLanguage, i18n]);

  const t = (text, plural) => {
    return i18n.translate(currentLanguage, text, plural);
  };
  return { t, setCurrentLanguage, currentLanguage };
}
