import useServices from './use-services';
import { useMemo, useState, useEffect } from 'react';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const i18nService = useServices().i18n;
  const [lang, setLang] = useState(i18nService.lang);

  useEffect(() => {
    const unsubscribe = i18nService.subscribe(newLang => setLang(newLang));
    return () => unsubscribe();
  }, [i18nService]);

  const handleChangeLang = lang => i18nService.setLang(lang);

  const translate = (text, number) => i18nService.translate(text, number);

  return useMemo(() => ({ lang, setLang: handleChangeLang, t: translate }), [lang]);
}
