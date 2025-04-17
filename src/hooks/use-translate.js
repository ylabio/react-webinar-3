import { useCallback, useEffect, useState } from 'react';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const services = useServices();
  const i18n = services.i18n;

  const [lang, setLangState] = useState(i18n.lang);

  // Подписываемся на изменения стейта для ререндера компонентов
  useEffect(() => {
    const observer = newLang => {
      setLangState(newLang);
    };

    i18n.subscribe(observer);

    return () => {
      i18n.unsubscribe(observer);
    };
  }, [i18n]);

  const translate = useCallback((text, plural) => i18n.translate(text, plural), [i18n]);

  return {
    t: translate,
    lang,
    setLang: newLang => {
      i18n.lang = newLang;
    },
  };
}
