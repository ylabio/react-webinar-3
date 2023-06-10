import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import useServices from "./use-services";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const services = useServices();
  const [lang, setLanguage] = useState(services.i18n.defaultLanguage);

  const unsubscribe = useMemo(() => {
    //console.log('unsubscribe');
    return services.i18n.subscribe(() => {
      setLanguage(services.i18n.defaultLanguage);
    });
  }, []);
  // синхронный useEffect, запускается до отрисовки ДОМ
  useLayoutEffect(() => unsubscribe, [unsubscribe]);

  const setLang = useCallback((language) => {
    services.i18n.setDefaultLanguage(language);
  }, []);

  const t = useCallback((text, plural) => {
    return services.i18n.translate(text, plural, lang);
  }, [services.i18n.defaultLanguage]);

  return { lang, setLang, t };
}