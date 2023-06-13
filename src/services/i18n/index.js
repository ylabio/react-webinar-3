import * as translations from './translations';

class I18nService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */

  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this._lang = this.config?.lang ?? 'ru';
    this.setLang = this.setLang.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.translate = this.translate.bind(this);
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners.filter((item) => item !== listener);
    };
  }

  updateListeners() {
    for (const listener of this.listeners) {
      listener(this._lang);
    }
  }

  get lang() {
    return this._lang;
  }

  setLang(lang) {
    this._lang = lang;
    this.updateListeners();
    this.services.api.setHeader('Accept-Language', lang);
  }
  /**
   * Перевод фразу по словарю
   * @param lang {String} Код языка
   * @param text {String} Текст для перевода
   * @param [plural] {Number} Число для плюрализации
   * @returns {String} Переведенный текст
   */
  translate({ lang = this.lang, text, plural }) {
    let result =
      translations[lang] && text in translations[lang]
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
}

export default I18nService;
