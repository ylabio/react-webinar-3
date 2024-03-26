import { useState, useEffect, useMemo } from "react";
import useServices from "./use-services";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const i18n = useServices().i18n;
  const [lang, setNewLang] = useState(i18n.lang);

  useEffect(() => {
    const langListener = (lang) => {
      setNewLang(lang);
    };

    const unsubscribe = i18n.subscribe(langListener);

    return () => {
      unsubscribe();
    };
  }, [i18n]);

  const i18nHook = useMemo(
    () => ({
      // Код локали
      lang,
      // Функция для смены локали
      setLang: (newLang) => {
        i18n.setLang(newLang);
      },
      // Функция для локализации текстов с замыканием на код языка
      t: (text, number) => i18n.translate(lang, text, number),
    }),
    [lang]
  );

  return i18nHook;
}
