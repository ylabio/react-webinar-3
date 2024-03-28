import { useEffect, useMemo, useState } from 'react';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 * @return {I18nService}
 */
export default function useTranslate() {
  const service = useServices().i18n;

  const [lang, setLang] = useState(service.lang);

  const i18n = useMemo(() => ({
    lang: service.lang,
    setLang: (lang) => service.setLang(lang),
    t: (text, number) => service.translate(lang, text, number)
  }), [lang]);

  useEffect(() => {
    const handleChangeLocale = (language) => {
      setLang(language);
    };

    const unsubscribe = service.subscribe(handleChangeLocale);
    return () => {
      unsubscribe();
    };
  }, [service]);

  return i18n;
}
