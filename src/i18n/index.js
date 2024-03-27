import * as translations from './translations';

class I18nService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this._lang = localStorage.getItem('lang') || config.lang || 'ru';
    this.listeners = [];
    this.services.api.setHeader(this.config.langHeader, this._lang);
  }

  /**
   * Выбор состояния
   * @returns {{
   * lang: String,
   * }}
   */
  getState() {
    return {
      lang: this._lang
    };
  }

  /**
   * Установка локали
   * @param lang {String} Код языка
   */
  setLang(value) {
    this._lang = value;
    for (const listener of this.listeners) listener(this.getState());
    window.localStorage.setItem('lang', value);
    this.services.api.setHeader(this.config.langHeader, value);
    location.reload();
  }

  /**
   * Возвращает локаль
   * @returns {String} Код локали
   */
  get lang() {
    return this._lang;
  }

  /**
   * Перевод фразы по словарю
   * @param lang {String} Код языка
   * @param text {String} Текст для перевода
   * @param [plural] {Number} Число для плюрализации
   * @returns {String} Переведенный текст
   */
  translate(text, plural, lang = this._lang) {
    let result = translations[lang] && (text in translations[lang])
      ? translations[lang][text]
      : text;

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
    }
  }
}

export default I18nService;