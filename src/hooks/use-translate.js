import { useEffect, useState } from 'react';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const i18n = useServices().i18n;

  const [lang, setLangState] = useState(i18n.getLang());

  useEffect(() => {
    const unsubscribe = i18n.subscribe(newLang => {
      setLangState(newLang);
    });
    return unsubscribe;
  }, [i18n]);

  return {
    lang,
    setLang: i18n.setLang.bind(i18n), //чтоб не потерять контекст
    t: i18n.translate,
  };
}
