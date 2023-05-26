import { createContext, useState, useMemo, useEffect} from 'react'
import ru from './ru.locale.json';
import en from './en.locale.json';

export const TranslationContext = createContext([])

export const TranslationProvider = ({ children}) => {
  const [lang, setLang] = useState('ru');
  const [translations, setTranslations] = useState(ru);
   useEffect(() => {
     setTranslations(lang === 'ru' ? en : ru);
	 }, [lang])

  const defaultProps = useMemo(() => ({
    lang,
    setLang,
    translations,
  }), [lang]);

  return (
    <TranslationContext.Provider value={defaultProps}>
        {children}
    </TranslationContext.Provider>
    )
}