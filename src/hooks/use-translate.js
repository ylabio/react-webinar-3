import {useState, useEffect, useCallback} from 'react';
import useServices from './use-services';

export default function useTranslate() {
  const i18nService = useServices().i18n;  

  const [lang, setLang] = useState(i18nService.lang);

	const t = useCallback((text, plural) => {
    return i18nService.translate(text, plural);
  }, [lang]);

  useEffect(() => {
    const handleLangChange = (lang) => {
      setLang(lang);
    };

    const unsubscribe = i18nService.subscribe(handleLangChange);

    return () => {
      unsubscribe();
    };
  }, [lang]);

  return {t, lang, setLang: i18nService.setLang};
}