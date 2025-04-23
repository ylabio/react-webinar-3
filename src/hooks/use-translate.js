// /**
//  * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
//  */

import { useEffect, useState } from 'react';
import useServices from './use-services';

export default function useServiceTranslate() {
  const services = useServices();
  const i18n = services.i18n;

  const [locale, setCurrentLocale] = useState(i18n.getLocale());

  useEffect(() => {
    const unsubscribe = i18n.subscribe(setCurrentLocale);
    return () => unsubscribe();
  }, [i18n]);

  return {
    locale,
    setLocale: i18n.setLocale.bind(i18n),
    t: i18n.translate.bind(i18n),
  };
}
