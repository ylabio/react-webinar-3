import { useCallback, useEffect, useState } from 'react';
import useServices from './use-services';

export default function useTranslate() {
  const services = useServices();
  const i18n = services.i18n;
  const [lang, setLang] = useState(i18n.lang);
  const [_, forceUpdate] = useState();

  useEffect(() => {
    const onLanguageChanged = () => {
      setLang(i18n.lang);
      forceUpdate({});
      services.store.actions.catalog.initParams();
    };

    const onTranslationsUpdated = () => forceUpdate({});

    i18n.on('languageChanged', onLanguageChanged);
    i18n.on('translationsUpdated', onTranslationsUpdated);

    return () => {
      i18n.off('languageChanged', onLanguageChanged);
      i18n.off('translationsUpdated', onTranslationsUpdated);
    };
  }, [i18n, services.store.actions.catalog]);

  return {
    t: useCallback((key, params) => i18n.translate(key, params), [i18n]),
    lang,
    setLang: useCallback((newLang) => { i18n.lang = newLang; }, [i18n]),
  };
}
