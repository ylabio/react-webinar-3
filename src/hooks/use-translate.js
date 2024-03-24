import { useCallback, useEffect, useState } from 'react';
import useServices from './use-services';

export default function useTranslate() {
  const i18nService = useServices().i18n;  
  
  const [currentLang, setCurrentLang] = useState(i18nService.lang);  

  useEffect(() => {
    const handleLanguageChange = (language) => {
      setCurrentLang(language);
    };

    const unsubscribe = i18nService.subscribe(handleLanguageChange);
    return () => {
      unsubscribe();
    };
  }, [i18nService]);

  const t = useCallback((text, plural) => {
    return i18nService.translate(text, plural);
  }, [currentLang]);

  return { t, lang: currentLang, setLang: i18nService.setLang };
}