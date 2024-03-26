import * as translations from "./translations";

class I18nService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.locale = this.config.defaultLocale;
    this.listeners = [];
    this.setLang = this.setLang.bind(this);
  }

  /**
   * Установка локали
   * @param lang {String} Значение локали
   */
  setLang(lang) {
    this.locale = lang;
    for (const listener of this.listeners) listener(this.locale);
    this.services.api.setHeader("X-Lang", lang);
  }

  translate(lang = this.locale, text, plural) {
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

  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }
}

export default I18nService;
