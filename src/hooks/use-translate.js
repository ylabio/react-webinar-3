import { useState, useEffect } from 'react';
import useServices from '../hooks/use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const { i18n } = useServices();
  const [lang, setLang] = useState(i18n.getLang());

  // Подписываемся и отписываемся при размонтировании
  useEffect(() => {
    const unsubscribe = i18n.subscribe(setLang);

    return () => unsubscribe();
  }, [i18n]);

  return {
    // Код локали
    lang,
    // Функция для смены локали
    setLang: i18n.setLang.bind(i18n),
    // Функция для локализации текстов с замыканием на код языка
    t: i18n.translate.bind(i18n),
  };
}
