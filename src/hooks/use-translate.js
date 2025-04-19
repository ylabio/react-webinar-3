import { useEffect, useState } from 'react';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const { i18n } = useServices();
  const [lang, setLang] = useState(i18n.getLang());

  // Подписка на изменения языка
  useEffect(() => {
    return i18n.subscribe(() => setLang(i18n.getLang()));
  }, []);

  return {
    t: (text, plural) => i18n.translate(text, plural),
    lang,
    setLang: newLang => i18n.setLang(newLang),
  };
}
