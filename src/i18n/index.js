import * as translations from './translations';

class I18nService {
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this._currentLang = localStorage.getItem('selectedLanguage') || config.defaultLang || 'ru';
    this.subscribers = new Set();
    setTimeout(() => {
      this.services.api.setHeader('X-Lang', this._currentLang);
    }, 0);
  }

  get currentLang() {
    return this._currentLang;
  }

  translate(key, count, lang = this._currentLang) {
    const translation = translations[lang]?.[key];
    
    if (typeof translation === 'object') {
      // Handle pluralization for Russian
      if (lang === 'ru') {
        const absCount = Math.abs(count);
        const lastDigit = absCount % 10;
        const lastTwoDigits = absCount % 100;

        if (lastDigit === 1 && lastTwoDigits !== 11) {
          return translation.one;
        } else if (
          lastDigit >= 2 &&
          lastDigit <= 4 &&
          (lastTwoDigits < 10 || lastTwoDigits >= 20)
        ) {
          return translation.few;
        } else {
          return translation.many;
        }
      }
      // Handle pluralization for English
      else {
        return count === 1 ? translation.one : translation.other;
      }
    }
    
    return translation || key;
  }

  setLang(lang) {
    if (lang !== this._currentLang) {
      this._currentLang = lang;
      localStorage.setItem('selectedLanguage', lang);
      this.notifySubscribers();
      this.services.api.setHeader('X-Lang', lang);
    }
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notifySubscribers() {
    this.subscribers.forEach(callback => callback());
  }
}

export default I18nService;
