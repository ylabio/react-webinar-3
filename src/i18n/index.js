import * as translations from "./translations";

class I18nService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.listeners = [];
    this.language = config.language;
  }

  subscribe(listener) {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Перевод фразу по словарю
   * @param lang {String} Код языка
   * @param text {String} Текст для перевода
   * @param [plural] {Number} Число для плюрализации
   * @returns {String} Переведенный текст
   */
  translate(lang = this.language, text, plural) {
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

  // Получить текущий язык
  get lang() {
    return this.language;
  }

  // Функция для смены локали
  setLang = (newLang) => {
    this.language = newLang;

    for (const listener of this.listeners) {
      listener(newLang);
    }
  };
}

export default I18nService;
