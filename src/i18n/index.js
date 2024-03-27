import * as translations from './translations';

class I18nService {

  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    const lang = localStorage.getItem('lang') || 'ru';
    this.lang = lang;
    this.services.api.setHeader('X-Lang', lang);
    localStorage.setItem('lang', lang);
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  getLang() {
    return this.lang;
  }

  setLang(lang) {
    this.lang = lang;
    this.services.api.setHeader('X-Lang', lang);
    localStorage.setItem('lang', lang);
    this.listeners.forEach(listener => listener(lang));
  }

  translate(lang = this.lang, text, plural) {
    let result = translations[lang] && (text in translations[lang])
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
}

export default I18nService;