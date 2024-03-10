import useTranslator from "./use-translator";
import {useEffect, useLayoutEffect, useMemo, useState} from "react";
import shallowequal from 'shallowequal';

/**
 * Хук для выборки данных из translator и отслеживания их изменения
 * @param selector {Function}
 * @return {*}
 */
export default function useTranslatorSelector() {
  const tr = useTranslator();

  const [locale, setLocale] = useState(tr.getLocale());

  const unsubscribe = useMemo(() => {
    // Подписка. Возврат функции для отписки
    return tr.subscribe(() => {
      const newLocale = tr.getLocale();
      setLocale(prevLocale => shallowequal(prevLocale, newLocale) ? prevLocale : newLocale);
    });
  }, []); // Нет зависимостей - исполнится один раз

  // Отписка от store при демонтировании компонента
  useLayoutEffect(() => unsubscribe, [unsubscribe]);

  return locale;
}
