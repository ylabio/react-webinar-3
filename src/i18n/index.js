import * as translations from "./translations";
import {formatLocale} from "../utils/format-locale";

class I18nService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
  */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.listeners = [];
    this.init();
  }

  init() {
    let language;
    if (navigator.language) {
      language = navigator.language;
    } else {
      language = this.config.defaultLanguage;
    }

    this.setLanguage(language);
  }

  setLanguage(lang) {
    this._language = formatLocale(lang);
    this.services.api.setHeader('X-Lang', lang);
    for (const listener of this.listeners) listener(this._language);
  }

  translate(text, plural) {
    let result = translations[this._language] && (text in translations[this._language])
        ? translations[this._language][text]
        : text;

    if (typeof plural !== 'undefined'){
      const key = new Intl.PluralRules(this._language).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  }

  subscribe(listener) {
    console.log('subscribe');
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  get language() {
    return this._language;
  }

}

export default I18nService;