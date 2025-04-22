import * as translations from './translations';

class I18nService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}, lang) {
    this.services = services;
    this.config = config;
    this.lang = lang || config.defaultLang;
    this.listeners = [];
  }

  getLang() {
    return this.lang;
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  translate(lang = this.language, text, plural) {
    let result = translations[lang] && text in translations[lang] ? translations[lang][text] : text;
  
    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }
    return result;
  }

  /**
   * Установка языка
   * @param lang {String} язык
   */
  setLang(newLang) {
    if (newLang !== this.lang) {
      this.lang = newLang;
      for (const listener of this.listeners) listener(this.lang);
    }
  }
}

export default I18nService;
