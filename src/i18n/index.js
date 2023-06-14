import * as translations from "./translations";
/**
 * Хранилище состояния приложения
 */
class i18nService {
  /**
   * @param services {Services}
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.lang = this.config?.lang ? this.config.lang : "ru";
    this.listeners = [];
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
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Установка языкв
   * @param lang
   */
  setLang(lang) {
    this.lang = lang;
    this.services.api.setHeader("Accept-Language", this.lang);
    for (const listener of this.listeners) listener(this.lang);
  }

  /**
   * Перевод фразу по словарю
   * @param lang {String} Код языка
   * @param text {String} Текст для перевода
   * @param [plural] {Number} Число для плюрализации
   * @returns {String} Переведенный текст
   */
  translate( text, lang = this.lang, plural) {
    let result =
      translations[lang] && text in translations[lang]
        ? translations[lang][text]
        : text;

    if (typeof plural !== "undefined") {
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }
    return result;
  }
}

export default i18nService;
