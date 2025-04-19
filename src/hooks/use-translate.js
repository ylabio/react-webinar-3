import { useContext, useEffect, useState } from 'react';
import { ServicesContext } from '../context';

export default function useTranslate() {
  const services = useContext(ServicesContext);
  const i18nService = services.i18n;

  const [lang, setLang] = useState(i18nService.getLocale());

  useEffect(() => {
    const unsubscribe = i18nService.subscribe((newLocale) => {
      setLang(newLocale);
    });
    return () => unsubscribe();
  }, [i18nService]);

  return {
    localeList: i18nService.getLocalesList(),
    lang,
    setLang: i18nService.setLocale.bind(i18nService),
    t: i18nService.translate.bind(i18nService),
  };
}