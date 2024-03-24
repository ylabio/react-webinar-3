import * as translations from "./translations";

class I18nService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.locale = "ru";

    this.translate = this.translate.bind(this);
    // this.setLang = this.setLang.bind(this);
  }

  /**
   * Установка локали
   * @param lang {String} Значение локали
   */
  setLang(lang) {
    this.locale = lang;
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
}

export default I18nService;
