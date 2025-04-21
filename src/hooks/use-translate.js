import { useEffect, useState } from 'react';
import useServices from './use-services';

/**
 * Хук для доступа к переводу и текущему языку.
 * Использует i18n-сервис напрямую, без контекста.
 */
export default function useTranslate() {
  const { i18n } = useServices();

  const [locale, setLocale] = useState(i18n.getLocale());

  useEffect(() => {
    const unsubscribe = i18n.onChange(setLocale);
    return unsubscribe;
  }, [i18n]);

  return {
    t: i18n.translate,
    locale,
    setLocale: i18n.setLocale.bind(i18n),
    getAvailableLocales: i18n.getAvailableLocales.bind(i18n),
  };
}
