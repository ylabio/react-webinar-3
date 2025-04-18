// import { useCallback, useContext } from 'react';
// import { I18nContext } from '../i18n/context';

// /**
//  * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
//  */
// export default function useTranslate() {
//   return useContext(I18nContext);
// }

import { useEffect, useState } from 'react';
import useServices from './use-services';

export default function useServiceTranslate() {
  const services = useServices();
  const i18n = services.i18n;
  const [locale, setLocale] = useState(i18n.getLocale());

  useEffect(() => {
    const unsubscribe = i18n.subscribe(setLocale);

    return () => unsubscribe();
  }, [i18n]);

  return {
    locale,
    setLocale: i18n.setLocale.bind(i18n),
    t: i18n.translate.bind(i18n),
  };
}
