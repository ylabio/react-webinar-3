import * as translations from './translations';

class I18nService {
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.lang = 'ru';
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(listener => listener(this.lang));
  }

  getLang() {
    return this.lang;
  }

  setLang(lang) {
    if (this.lang !== lang) {
      this.lang = lang;
      this.services.api.setHeader('Accept-Language', lang);
      this.services.api.setHeader('X-Lang', lang);
      this.notify();
    }
  }

  translate(text, plural, lang = this.lang) {
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
