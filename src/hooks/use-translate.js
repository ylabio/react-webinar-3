import { useCallback, useSyncExternalStore } from 'react';
import useServices from '../hooks/use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const { i18n } = useServices();
  const lang = useSyncExternalStore(i18n.subscribe, i18n.getLang);
  const t = useCallback((text, number) => i18n.translate(text, number, lang), [lang]);

  return {
    t,
    lang,
    setLang: i18n.setLang,
  };
}
