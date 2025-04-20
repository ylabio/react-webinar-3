import translateFn from './translate';

export default class I18nService {
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.lang = config.lang || 'ru';
    this.listeners = [];

    this.services.api.setHeader('Accept-Language', this.lang);
  }

  getLang() {
    return this.lang;
  }

  setLang(newLang) {
    if (this.lang === newLang) return;

    this.lang = newLang;
    this.services.api.setHeader('Accept-Language', newLang);

    for (const listener of this.listeners) {
      listener(this.lang);
    }
  }

  translate = (text, plural) => {
    return translateFn(this.lang, text, plural);
  };

  /**
   * Подписка на изменение языка
   * @returns {Function} — функция отписки
   */
  subscribe(callback) {
    this.listeners.push(callback);

    return () => {
      this.listeners = this.listeners.filter(func => func !== callback);
    };
  }
}
