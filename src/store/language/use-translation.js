import { ru, en } from './languages-text';
import { useLocale } from './language-context';

const translations = {
    ru,
    en,
};

export const useTranslation = () => {
    const { locale } = useLocale();

    const t = (key) => {
        return translations[locale][key] || key;
    }

    return t;
}