import * as translations from './translations';

class I18n {
    constructor() {
        this.lang = 'ru';
        this.listeners = [];
    }

    getLang() {
        return this.lang;
    }

    setLang(lang) {
        if (this.lang !== lang) {
            this.lang = lang;
            this.notifyListeners(); // Оповещаем компоненты об изменении языка
        }
    }

    /**
    * Перевод фразу по словарю
    * @param lang {String} Код языка
    * @param text {String} Текст для перевода
    * @param [plural] {Number} Число для плюрализации
    * @returns {String} Переведенный текст
    */
    translate(lang, text, plural) {
        let result = translations[lang] && text in translations[lang] ? translations[lang][text] : text;

        if (typeof plural !== 'undefined') {
            const key = new Intl.PluralRules(lang).select(plural);
            if (key in result) {
                result = result[key];
            }
        }

        return result;
    }

    // Методы для работы с слушателями
    addListener(listener) {
        this.listeners.push(listener);
    }

    removeListener(listener) {
        this.listeners = this.listeners.filter(l => l !== listener);
    }

    notifyListeners() {
        this.listeners.forEach(listener => listener(this.lang));
    }
}

export default I18n;