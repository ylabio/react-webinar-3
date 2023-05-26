import { useContext } from 'react'
import { TranslationContext } from '../locales/context'

const useTranslate = () => {
    const { lang, setLang, translations} = useContext(TranslationContext)
    
    const toggleLang = () => {
        setLang?.(lang => lang === 'en' ? 'ru' : 'en');
    };
    
    const t  = (key) => {
        return translations[key] || key;
    }

    return {
        lang: lang || 'ru',
        toggleLang,
        t,
    };
}

export default useTranslate;