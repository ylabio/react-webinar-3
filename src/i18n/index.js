import * as translations from './translations';

class I18nService {
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this._currentLang = config.baseLang;
    this.subscribers = new Set();
  }

  get currentLang() {
    return this._currentLang;
  }

  translate(text, plural) {
    let result =
      translations[this._currentLang] && text in translations[this._currentLang]
        ? translations[this._currentLang][text]
        : text;
    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(this._currentLang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }
    return result;
  }

  setLang(value = null) {
    if (value && value !== this._currentLang) {
      this._currentLang = value;
      this.subscribers.forEach(callback => callback());
      this.services.api.setHeader(this.config.language, value);
    }
  }
  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }
}

export default I18nService;
