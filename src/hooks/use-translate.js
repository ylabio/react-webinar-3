import { useCallback, useContext, useState, useEffect } from 'react';
import { I18nContext } from '../i18n/context';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  // return useContext(I18nContext);
  // console.log('useServices', useServices().store);
  const i18n = useServices().i18n;
  const [locale, setLocale] = useState(i18n.locale);
  // console.log('current locale', locale);

  useEffect(() => {
    const unsubscribe = i18n.subscribe(setLocale);

    return () => unsubscribe();
  }, [i18n]);

  // return {
  //   locale,
  //   changeLocale: i18n.changeLocale.bind(i18n),
  //   t: i18n.translate.bind(i18n),
  // }
  // return useServices().i18n;
  return {
    locale,
    setLocale: i18n.setLocale.bind(i18n),
    t: i18n.t.bind(i18n),
  }
}
