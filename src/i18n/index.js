import translations from './translations';
import translate from "./translate";

class TranslateService {
  constructor(services, config={}) {
    this.services = services;
    this.listeners = [];
    if (config.locale) {
      this.locale = config.locale;
    } else {
      this.locale = navigator.language;
    }
    if (config.defaultLocale && translations[this.locale]) {
      this.defaultLocale = config.defaultLocale;
    } else {
      this.defaultLocale = "en-US";
    }    
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  setLocale(locale) {
    this.locale = locale;
    this.services.api.setHeader('Accept-Language', locale);
    for (const listener of this.listeners) listener(this.locale);
  }

  getLocale() {
    return this.locale;
  }

  translate(text, number) {
    if (translations[this.locale]) {
      return translate(this.locale, text, number);
    } else {
      return translate(this.defaultLocale, text, number);
    }    
  }

  locale;
  services;
  defaultLocale;
  listeners;
}

export default TranslateService;