import * as translations from './translations';

class I18nService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}, locale) {
    this.services = services;
    this.config = config;
    this.listeners = [];
    this.locale = locale;
  }

  getLocale() {
    return this.locale;
  }

  setLocale(lang) {
    if (this.locale !== lang) {
      this.locale = lang;
      for (const listener of this.listeners) listener(this.locale);
      this.services.api.setHeader('X-Lang', this.locale)
    }
  }

  translate(text, plural, lang = this.locale) {
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
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }
}

export default I18nService;
