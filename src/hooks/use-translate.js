// import {useCallback, useContext} from 'react';
// import {I18nContext} from '../i18n/context';
import { useState, useMemo, useEffect } from 'react';
import useServices from './use-services';
import shallowequal from 'shallowequal';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  // return useContext(I18nContext);
  const translateService = useServices().translate;
  const [locale, setLocale] = useState(translateService.getLocale());
  
  const unsubscribe = useMemo(() => {
    return translateService.subscribe(() => {
      const newLocale = translateService.getLocale();
      setLocale(prevLocale => prevLocale === newLocale ? prevLocale : newLocale);
    });
  }, []);

  useEffect(() => unsubscribe, [unsubscribe]);

  return {translateService, locale};
}
