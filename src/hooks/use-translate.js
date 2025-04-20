import { useCallback, useEffect, useState } from 'react';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const services = useServices();
  const i18n = services.i18n;
  
  const [lang, setLang] = useState(i18n.lang);

  useEffect(() => {
    const handleLanguageChange = (newLang) => {
      setLang(newLang);
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const t = useCallback((text, number) => i18n.translate(text, number), [i18n, lang]); // Добавили lang в зависимости
  const setLangCallback = useCallback((newLang) => {
    i18n.lang = newLang;
  }, [i18n]);

  return { t, lang, setLang: setLangCallback };
}