import {useLayoutEffect, useMemo, useState, useCallback} from "react";
import useI18nService from "./use-i18n";

/**
 * Хук для выбора языка сервиса I18n и отслеживания изменения
 * @param selectorFunc {Function}
 * @return {{lang: string, t: func, setLang: func}}
 */
export default function useTranslate() {
  const translation = useI18nService();

  const [lang, setLanguage] = useState(translation.language);

  const unsubscribe = useMemo(() => {
    // Подписка. Возврат функции для отписки
    return translation.subscribe(() => {
      setLanguage(translation.language);
    });
  }, []);

  // Отписка от store при демонтировании компонента
  useLayoutEffect(() => unsubscribe, [unsubscribe]);

  const setLang = useCallback((lang) => {translation.setLanguage(lang)}, []);

  const t = useCallback((text, plural) => translation.translate(lang, text, plural), [translation.language]);

  return {lang, t, setLang};
}