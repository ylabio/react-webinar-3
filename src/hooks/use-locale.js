import { useContext, useEffect, useState } from 'react';
import { ServicesContext } from '../context';

export default function useLocale() {
  const services = useContext(ServicesContext);
  const i18n = services.i18n;

  const [locale, setLocaleState] = useState(() => i18n.getLocale());

  useEffect(() => {
    const unsubscribe = i18n.subscribe(setLocaleState);
    return () => unsubscribe();
  }, [i18n]);

  const setLocale = (val) => i18n.setLocale(val);
  const t = (key, plural, lang) => i18n.translate(key, plural, lang);

  return { locale, setLocale, t };
}
