import * as translations from './translations';

class I18nService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.lang = config.lang;
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  setLang(lang) {
    this.lang = lang;
    for (const listener of this.listeners) listener(this.lang);
  }

  translate(language, text, plural) {
    const lang = language || this.lang;
    let result = translations[lang] && text in translations[lang] ? translations[lang][text] : text;

    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  }
}

export default I18nService;
