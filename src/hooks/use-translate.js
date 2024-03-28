import { useCallback, useEffect, useState } from 'react';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate(name) {

  const translate = useServices().translate;
  const [lang, setCurrentLang] = useState(translate.lang);

  const t = useCallback((text, number) => translate.translate(text, number), [lang]);

  useEffect(() => {
    const handleLanguageChange = (language) => {
      setCurrentLang(language);
    }
    const unsubscribe = translate.subscribe(handleLanguageChange);
    return () => {
      unsubscribe();
    }
  }, [translate])

  return {t, lang, setLang: translate.setLang};
}