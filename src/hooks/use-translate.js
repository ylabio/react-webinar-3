import useServices from './use-services';
import { useState, useEffect, useCallback } from 'react';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const { i18n } = useServices();
  const [lang, setNewLang] = useState(i18n.getLang());
  useEffect(() => {
    const unsubscribe = i18n.subscribe(setNewLang);

    return () => unsubscribe();
  }, [i18n]);

  const setLang = useCallback((newLang) => i18n.setLang(newLang), [i18n]);

  return {
    lang,
    setLang,
    t: (text, number) => i18n.translate(lang, text, number),
  }
}
