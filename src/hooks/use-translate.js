import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { I18nContext } from "../i18n/context";
import useServices from "./use-services";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const i18n = useServices().i18n;

  const [lang, setLangState] = useState(i18n.locale);

  useEffect(() => {
    const setLang = (newLang) => {
      setLangState(newLang);
    };
    const unsubscribe = i18n.subscribe(setLang);
    return () => unsubscribe();
  }, [i18n, lang]);

  const t = useCallback(
    (text, number) => {
      return i18n.translate(lang, text, number);
    },
    [i18n, lang]
  );

  return {
    t,
    lang: lang,
    setLang: i18n.setLang,
  };

  // return useContext(I18nContext);
}
