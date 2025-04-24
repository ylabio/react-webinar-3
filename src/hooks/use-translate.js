import { useState, useEffect } from 'react';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const i18n = useServices().i18n;
  const [locale, setLocale] = useState(i18n.locale);

  useEffect(() => {
    const unsubscribe = i18n.subscribe(setLocale);

    return () => unsubscribe();
  }, [i18n]);

  return {
    locale,
    setLocale: i18n.setLocale.bind(i18n),
    t: i18n.t.bind(i18n),
  }
}
