import {useCallback, useEffect, useMemo, useState} from "react";
// import useStore from "../store/use-store";
// import useSelector from "../store/use-selector";
// import translate from "../i18n/translate";
import {I18nContext} from "../i18n/context";
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {

  let i18n = useServices().i18n;
  const [locale, setLocale] = useState(i18n.lang);
  const translate = useCallback((text, num) => {
    return i18n.t(text, num);
  }, [locale]);

  const unsubscribe = useMemo(() => {
    return i18n.subscribe((newLang) => {
      setLocale(newLang)
    });
  }, []);

  useEffect(() => unsubscribe, [unsubscribe]);

  return {t: translate, lang: i18n.lang, setLang: i18n.setLang}
}
