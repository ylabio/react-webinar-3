import ru from './ru';
import en from './en';

const translations = {
    ru,
    en,
};

export function getTranslate(lang = 'ru') {
    return translations[lang] || translations['ru'];
}
