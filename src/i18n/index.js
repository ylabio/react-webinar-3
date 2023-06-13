import * as translations from "./translations";

class I18nService {
    constructor(services, config = {}) {
        this.services = services;
        this.config = config;
        this.currentLang = this.config.baseLang || 'ru';
        this.listeners = []
    }

    translate({ lang = this.lang, text, plural }) {
        let result =
            translations[lang] && text in translations[lang]
                ? translations[lang][text]
                : text;

        if (typeof plural !== 'undefined') {
            const key = new Intl.PluralRules(lang).select(plural);
            if (key in result) {
                result = result[key];
            }
        }

        return result;
    }

    subscribe(callback) {
        this.listeners.push(callback)
        return function () {
            this.listeners = this.listeners.filter(function (listener) {
                return listener !== callback;
            });
        };
    }

    setLang(lang) {
        this.currentLang = lang
        for (const listener of this.listeners) listener(this.currentLang);
    }

    get lang() {
        return this.currentLang;
    }
}


export default I18nService;