import { useEffect, useState } from 'react';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate(name) {
  const i18n = useServices().i18n;

  const [lang, setCurrentLang] = useState(i18n.lang);

  const t = (text, number) => i18n.translate(text, number);

  useEffect(() => {
    const handleLanguageChange = (language) => {
      setCurrentLang(language);
    }
    const unsubscribe = i18n.subscribe(handleLanguageChange);
    return () => {
      unsubscribe();
    }
  }, [i18n])

  return {t, lang, setLang: i18n.setLang};
}
