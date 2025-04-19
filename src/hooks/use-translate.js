import { useCallback, useEffect, useState } from 'react';
import useServices from './use-services';

export default function useTranslate() {
  const services = useServices();
  const [lang, setLang] = useState(services.i18n.lang);

  useEffect(() => {
    const unsubscribe = services.i18n.subscribe(newLang => {
      setLang(newLang);
    });
    return unsubscribe;
  }, [services.i18n]);

  const t = useCallback((text, plural) => {
    return services.i18n.t(text, plural);
  }, [services.i18n, lang]);

  return {
    lang,
    setLang: (newLang) => { services.i18n.lang = newLang; },
    t,
  };
}
