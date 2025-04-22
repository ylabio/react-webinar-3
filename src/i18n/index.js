import baseTranslate from './translate';

/**
 * Сервис для хранения локали и перевода
 */
class I18nService {

  constructor(services, config = {}, defaultLocale = 'ru') {
    this.services = services;
    this.config = config;
    this.locale = defaultLocale;
    this.listeners = [];
  }

  getLocale() {
    return this.locale;
  }

  setLocale(locale) {
    if (this.locale !== locale) {
      this.locale = locale;
      this._notify();
    }
    this.services.api.setHeader(this.config.localeHeader, locale);
  }

  translate(key, plural, locale = this.locale) {
    return baseTranslate(locale, key, plural);
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  _notify() {
    for (const listener of this.listeners) {
      listener(this.locale);
    }
  }
}

export default I18nService;
