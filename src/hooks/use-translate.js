import { useCallback, useSyncExternalStore } from 'react';
import useServices from '../hooks/use-services';

/**
 * Хук возвращает:
 * - функцию перевода `t`
 * - текущую локаль `lang`
 * - функцию смены локали `setLang`
 */
export default function useTranslate() {
  const services = useServices();
  const i18n = services.i18n;

  // Подписка на изменения языка
  const lang = useSyncExternalStore(
    i18n.subscribe,
    i18n.getLang,
    i18n.getLang
  );

  const t = useCallback((text, number) => i18n.translate(text, number), [lang]);

  return {
    t,
    lang,
    setLang: i18n.setLang,
  };
}
