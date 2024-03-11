import { useLanguage } from './languageContext';
import translations from './translations'; // Убедитесь, что путь к translations.js корректный

export const useTranslation = () => {
    const { lang } = useLanguage();

    const t = (key) => {
        if (!translations[lang][key]) {
            console.warn(`Translation '${key}' for language '${lang}' not found.`);
        }
        return translations[lang][key] || key;
    };

    return t;
};