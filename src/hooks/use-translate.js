import {useCallback, useMemo, useLayoutEffect, useState} from "react";
import useServices from "./use-services";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const services = useServices();

  const [lang, setLanguage] = useState(services.i18n.currentLang);

  // Функция для смены локали
  const setLang = useCallback(lang => {
    setLanguage(lang)
    services.i18n.setLang(lang)
  }, [lang]);

  // Функция для локализации текстов
  const t = useCallback((text, plural) => services.i18n.translate(text, plural, lang), [lang]);

  const unsubscribe = useMemo(() => {
    // Подписка. Возврат функции для отписки
    return services.i18n.subscribe(() => {
      setLanguage(services.i18n.currentLang)
    });
  }, []); // Нет зависимостей - исполнится один раз

  // Отписка от store при демонтировании компонента
  useLayoutEffect(() => unsubscribe, [unsubscribe]);
  
  return {lang, setLang, t};
}
