import { useEffect, useState } from 'react';

import useServices from './use-services';

const useTranslate = () => {
  const { i18n } = useServices();
  const [lang, setCurrentLang] = useState(i18n.getCurrentLang());

  useEffect(() => {
    const changeLanguage = () => {
      setCurrentLang(i18n.getCurrentLang());
    };

    i18n.subscribe(changeLanguage);

    return () => {
      i18n.unsubscribe(changeLanguage);
    };
  }, [i18n]);

  const translate = (text, plural) => i18n.translate(text, plural);
  const setLang = value => i18n.setCurrentLang(value);

  return { t: translate, lang, setLang };
};

export default useTranslate;
