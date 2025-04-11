import { createContext, useMemo } from 'react';
import useSelector from '../hooks/use-selector';
import useStore from '../hooks/use-store';
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
  const store = useStore();
  const lang = useSelector(state => state.locale.lang); // Берем язык из хранилища
  
  const i18n = useMemo(() => ({
    // Код локали
    lang,
    // Функция для смены локали
    setLang: (lang) => store.actions.locale.setLang(lang), // Используем действие из хранилища
    // Функция для локализации текстов с замыканием на код языка
    t: (text, number) => translate(lang, text, number)
  }), [lang, store]);

  return <I18nContext.Provider value={i18n}>{children}</I18nContext.Provider>;
}