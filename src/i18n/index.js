class I18n {
    /**
     * @param services {Services}
     * @param config {Object}
     * 
     */
    constructor(services, config = {}, locale, translations) {
        this.services = services;
        this.config = config;
        // this.locale = config.locale || 'en';
        // this.translations = config.translations || translations['ru'];
        this.locale = locale,
        this.translations = translations,
        // console.log('construction i18n', this.translations);
        // this.t = this.t.bind(this);
        // this.changeLocale = this.changeLocale.bind(this);
        this.listeners = new Set();

    }

    // Метод для загрузки переводов
    // loadTranslations(translations) {
    //     this.translations = translations; // Сохраняем переводы
    // }

    subscribe(cb) {
        this.listeners.add(cb);
        return () => this.listeners.delete(cb);
    }

    translate(lang = this.locale, text, plural) {
        console.log('lang', lang);
        // if (!this.translations || !this.translations[lang]) {
        //     console.error(`Translations for language "${lang}" not found.`);
        //     return text; // Возвращаем текст по умолчанию
        // }
        // console.log('this translations', this);
        // console.log('Translating key:', lang, text, plural);
        // console.log('this.translations[lang]', this.translations[lang]);
        let result = this.translations[lang] && text in this.translations[lang] 
            ? this.translations[lang][text] 
            : text;
        console.log('result', this.translations[lang][text]);
        
        if (typeof plural !== 'undefined') {
            const key = new Intl.PluralRules(lang).select(plural);
            if (key in result) {
                result = result[key];
            }
        }
        // console.log('result from translate', result);
        return result;
    }

    t(text, plural) {
        // console.log('text', text);
        return this.translate(this.locale, text, plural);
    }

    // Метод для установки нового языка
    setLocale(newLocale) {
        // if (newLang in this.translations) {
        //     this.locale = newLang; // Устанавливаем новую локаль
        //     console.log(`Язык изменен на: ${newLang}`);
        //     // this.translate(newLang, text, plural);
        // } else {
        //     console.error(`Переводы для языка "${newLang}" не найдены.`);
        // }
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