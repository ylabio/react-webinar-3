import { useEffect, useState } from 'react';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const i18n = useServices().i18n;

  const [, setLang] = useState(i18n.lang);

  useEffect(() => {
    const unsubscribe = i18n.subscribe(() => {
      setLang(i18n._currentLang);
    });
  }, [i18n]);

  return {
    t: i18n.translate.bind(i18n),
    lang: i18n._currentLang,
    setLang: i18n.setLang.bind(i18n),
    getLang: i18n.currentLang,
  };
}
