import useServices from './use-services';
import { useState, useMemo, useEffect } from 'react';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */

export default function useTranslate() {
  const I18n = useServices().i18n;

  const [locale, setLocale] = useState(I18n.getLocale())
  
  const unsubscribe = useMemo(() => {
    return I18n.subscribe(setLocale)
  })
  
    // Отписка от I18n при демонтировании компонента
    useEffect(() => unsubscribe, [I18n]);

    return {
      lang: locale,
      setLang: I18n.setLocale.bind(I18n),
      t: I18n.translate.bind(I18n),
    }
}




