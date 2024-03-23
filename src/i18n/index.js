import * as translations from './translations';

class I18n {

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

  setLang = (newLang) => {
    this.lang = newLang;
    this.listeners.forEach(listener => listener(newLang));
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners.filter(listener => listener !== callback);
    }
  }

  /**
   * Перевод фразу по словарю
   * @param text {String} Текст для перевода
   * @param lang {String} Код языка
   * @param [plural] {Number} Число для плюрализации
   * @returns {String} Переведенный текст
   */
  translate = (text, plural) => {
    let result = translations[this.lang] && (text in translations[this.lang])
      ? translations[this.lang][text]
      : text;
  
    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(this.lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }
  
    return result;
  }
}

export default I18n;
