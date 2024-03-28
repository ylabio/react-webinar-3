import * as translations from './translations';

class I18nService {

  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.lang = localStorage.getItem('lang') || config.language;
    this.listeners = [];
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    }
  }

  /**
   * Установка языка
   * @param newLang {Object}
   */
  setLang(newLang) {
    this.lang = newLang;
    for (const listener of this.listeners) listener(this.lang);
    // При смене языка добаляется новый заколовок для запросов
    this.services.api.setHeader('X-Lang', newLang);
  }

  /**
   * Перевод фразу по словарю
   * @param lang {String} Код языка
   * @param text {String} Текст для перевода
   * @param [plural] {Number} Число для плюрализации
   * @returns {String} Переведенный текст
   */
  translate(language, text, plural) {
    const lang = language || this.lang;
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