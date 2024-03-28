import useServices from './use-services';
import {useEffect, useCallback, useState} from 'react';

export default function useTranslate() {

  const translateService = useServices().translate;

  const [lang, setLang] = useState(translateService.language);

  const t = useCallback((text, plural) => {
    return translateService.translate(text, plural);
  }, [lang, translateService]);

  useEffect(() => {
    function onChangeLanguage(language) {
      setLang(language);
    };
    const unsubscribe = translateService.subscribe(onChangeLanguage);
    return () => unsubscribe();
  }, [translateService, lang]);

  return {t, lang: lang, setLang: translateService.changeLanguage};
}
