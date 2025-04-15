import { createContext, useMemo, useState } from 'react';
import translate from './translate';

/**
 * @type {React.Context<{}>}
 */
export const I18nContext = createContext({});

/**
 * Обертка над провайдером контекста, чтобы управлять изменениями в контексте
 * @param children
 * @return {JSX.Element}
 */
export function I18nProvider({ children }) {
  const [lang, setLang] = useState('ru');

  const i18n = useMemo(() => {
    //console.log('Current lang:', lang);
    return {
      lang,
      setLang,
      t: (text, number) => {
        const result = translate(lang, text, number);
        //console.log(`Translation for "${text}":`, result);
        return result;
      },
    };
  }, [lang]);

  return <I18nContext.Provider value={i18n}>{children}</I18nContext.Provider>;
}
