import { useLayoutEffect, useState } from 'react';
import useServices from './use-services';
import useInit from './use-init';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */

export default function useTranslate() {
  const service = useServices().i18n;

  const [lang, setLang] = useState(service.lang);


  useLayoutEffect(() => {
    const handleLanguageChange = (language) => {
      setLang(language);
    }
    const unsubscribe = service.subscribeLangChange(handleLanguageChange);
    return () => {
      unsubscribe();
    }
  }, [service])

  return { t: (text, number) => service.translate(text, number), lang, setLang: service.setLang };
}