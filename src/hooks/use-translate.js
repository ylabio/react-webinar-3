import {useCallback, useState, useEffect} from 'react';
import useServices from './use-services';
import { useMemo } from 'react';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const i18n = useServices().i18n;
  const [locale, setLocale] = useState(i18n.locale);

  const unsubscribe = useMemo(() => {
    return i18n.subscribe((value) => {
      setLocale(value);
    })
  }, [])

  useEffect(() => unsubscribe, [unsubscribe])

  const t= useCallback((text) => {
    return i18n.t(text)
  }, [i18n, locale])

  const setLocaleCallback = useCallback((value) => {
    setLocale(value);
    return i18n.setLocale(value);
  }, [i18n])

  return {t, locale, setLocale: setLocaleCallback};
}
