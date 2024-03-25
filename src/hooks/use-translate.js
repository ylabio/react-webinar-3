import {useCallback, useContext, useEffect, useState} from 'react';
import {I18nContext} from '../i18n/context';
import useServices from "./use-services";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  return useContext(I18nContext);
}

// export function useServiceTranslate() {
//   return useServices().translation
// }

export function useServiceTranslate() {
  const ts = useServices().translation

  const [locale, setLocale] = useState(ts.locale)
  ts.locale = locale

  return {
    locale,
    translate: (text, lang = locale, plural) => ts.translate(text, lang, plural),
    setLocale: (newLocale) => setLocale(newLocale)
  }

}
