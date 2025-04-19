import { useCallback, useEffect, useState } from 'react';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const services = useServices();
  const [lang, setLang] = useState(services.i18n.getLang());

  useEffect(() => {
    return services.i18n.subscribe(newLang => setLang(newLang));
  }, [services.i18n]);

  const t = useCallback(
    (text, plural) => services.i18n.translate(text, plural),
    [services.i18n, lang],
  );

  const changeLang = useCallback(newLang => services.i18n.setLang(newLang), [services.i18n]);

  return { t, lang, setLang: changeLang };
}
