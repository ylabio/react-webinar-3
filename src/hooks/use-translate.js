import {useCallback, useState, useEffect} from "react";
import useServices from "./use-services";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const {i18n} = useServices();

  const [lang, setLang] = useState(i18n.lang());

  const callbacks = {
    lang: useCallback(() => i18n.lang(), [lang]),
    setLang: useCallback((lang) => i18n.setLang(lang), [lang]),
    translate: useCallback((text, number) => i18n.translate(text, number), [lang]),
  }

  useEffect(() => {
    i18n.subscribe(setLang);
  }, []);

  return {lang: lang, setLang: callbacks.setLang, t: callbacks.translate};
}
