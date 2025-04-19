
import translateSimple from './translate.js';

export default class I18n {
    constructor(apiService, config = {}) {
        this.api = apiService;
        this.config = config;
        this.lang = this.config.defaultLang;
        this.listeners = new Set();
        this.api.setHeader('Accept-Language', this.lang);
    }

    getLang = () => this.lang;

    setLang = (lang) => {
        if (this.lang === lang) return;

        this.lang = lang;

        // Ставим новый заголовок в API
        this.api.setHeader('Accept-Language', lang);

        // Уведомляем подписчиков о смене языка
        this.listeners.forEach((listener) => listener());
    };

    subscribe = (callback) => {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback);
    };

    translate = (text, number) => {
        return translateSimple(this.lang, text, number); // твоя старая функция
    };
}
