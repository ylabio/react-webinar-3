import { useEffect, useState } from 'react';
import useServices from '../hooks/use-services';

function useTranslate() {
  const services = useServices();
  const i18n = services.i18n;

  const [lang, setLangState] = useState(i18n.lang);

  useEffect(() => {
    const listener = () => setLangState(i18n.lang);
    i18n.subscribe(listener);
    return () => i18n.unsubscribe(listener);
  }, [i18n]);

  const setLang = lang => {
    i18n.setLang(lang);
  };

  const onLanguageChange = callback => {
    const listener = () => callback();
    i18n.subscribe(listener);
    return () => i18n.unsubscribe(listener);
  };

  return {
    t: i18n.t.bind(i18n),
    lang,
    setLang,
    onLanguageChange,
  };
}

export default useTranslate;
