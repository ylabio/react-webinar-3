import {useCallback, useLayoutEffect, useMemo, useState} from "react";
import useServices from "./use-services";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const services = useServices();
  const [lang, setLanguage] = useState(services.i18n.language);

  const unsubscribe = useMemo(() => {
    return services.i18n.subscribe(() => {
      setLanguage(services.i18n.language);
    });
  }, []);

  useLayoutEffect(() => unsubscribe, [unsubscribe]);

  const setLang = useCallback((locale) => {
     services.i18n.setLanguage(locale);
  }, []);

  const t = useCallback((text, plural) => {
    return services.i18n.translate(text, plural, lang);
  }, [services.i18n.language]);
  // const store = useStore();
  // // Текущая локаль
  // const lang = useSelector(state => state.locale.lang);
  // // Функция для смены локали
  // const setLang = useCallback(lang => store.actions.locale.setLang(lang), []);
  // // Функция для локализации текстов
  // const t = useCallback((text, number) => translate(lang, text, number), [lang]);
  //
  // return {lang, setLang, t};

  return { lang, setLang, t };
}
