class I18n {
    /**
     * @param services {Services}
     * @param config {Object}
     * 
     */
    constructor(services, config = {}, locale, translations) {
        this.services = services;
        this.config = config;
        this.locale = locale,
        this.translations = translations,
        this.listeners = new Set();

    }

    subscribe(cb) {
        this.listeners.add(cb);
        return () => this.listeners.delete(cb);
    }

    translate(lang = this.locale, text, plural) {
        let result = this.translations[lang] && text in this.translations[lang] 
            ? this.translations[lang][text] 
            : text;
        
        if (typeof plural !== 'undefined') {
            const key = new Intl.PluralRules(lang).select(plural);
            if (key in result) {
                result = result[key];
            }
        }
        return result;
    }

    t(text, plural) {
        return this.translate(this.locale, text, plural);
    }

    // Метод для установки нового языка
    setLocale(newLocale) {
        if (this.locale !== newLocale) {
            this.locale = newLocale;
            this.notify(newLocale);
        }
    }

    notify(locale) {
        this.listeners.forEach(cb => cb(locale));
    }
}

export default I18n;