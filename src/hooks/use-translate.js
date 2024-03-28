import useServices from './use-services';
import {useMemo, useState, useEffect} from 'react';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const i18nService = useServices().i18n;
  const [lang, setLang] = useState(i18nService.lang);

  const unsubscribe = useMemo(() => i18nService.subscribe((newLang) => setLang(newLang)), []);

  useEffect(() => unsubscribe, [unsubscribe]);

  return useMemo(
    () => ({
      lang,
      setLang: (lang) => i18nService.setLang(lang),
      t: (text, number, lang) => i18nService.translate(lang, text, number),
    }),
    [lang]
  );
}
