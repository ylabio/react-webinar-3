import useServices from './use-services';
import { useEffect, useMemo, useState } from 'react';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const {
    lang: currentLang,
    translate,
    subscribe,
    setLang: setCurrentLang,
  } = useServices().i18n;
  const [lang, setLang] = useState(currentLang);

  const unsubscribe = useMemo(() => {
    const setNewLang = (newLang) => {
      setLang(newLang);
    };
    return subscribe(setNewLang);
  }, [setLang]);

  useEffect(() => unsubscribe, [unsubscribe]);

  return useMemo(
    () => ({
      lang,
      setLang: setCurrentLang,
      t: (text, number) => translate({ text, plural: number }),
    }),
    [lang]
  );
}
