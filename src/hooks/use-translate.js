import {useCallback, useState, useEffect} from 'react';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  //return useContext(I18nContext);

  const i18n = useServices().i18n;
  const [locale, setLocale] = useState(i18n.locale);

  useEffect(() => {
    const handleLocaleChange = (value) => {
      setLocale(value);
    }

    i18n.subscribe(handleLocaleChange)
  }, [i18n, locale])

  const t= useCallback((text) => {
    return i18n.t(text)
  }, [i18n, locale])

  const setLocaleCallback = useCallback((value) => {
    setLocale(value);
    i18n.setLocale(value);
  }, [i18n, locale])

  return {t, locale, setLocale: i18n.setLocale};
}
