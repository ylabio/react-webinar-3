import {useCallback, useEffect, useState} from 'react';
import useServices from "./use-services";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const { i18n } = useServices();
  const [lang, setLangState] = useState(i18n.getLang());

  useEffect(() => {
    return i18n.subscribe(newLang => {
      setLangState(newLang);
    });
  }, [i18n]);

  const t = useCallback((key, plural, langCode) => {
    return i18n.translate(key, plural, langCode);
  }, [i18n, lang]);

  const setLang = useCallback((newLang) => {
    i18n.setLang(newLang);
  }, [i18n]);

  return { t, lang, setLang };
}
