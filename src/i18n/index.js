import baseTranslate from './translate';

/**
 * Сервис для хранения локали и перевода
 */
class I18nService {
  constructor(defaultLocale = 'ru') {
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
