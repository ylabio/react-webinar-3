import * as translations from "./translations";

class I18nService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */

  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.state = {
      lang: "ru",
    };
    this.listeners = [];
  }
  subscribe = (listener) => {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  };
  translate = (lang, text, plural) => {
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
  };
  setLang = (lang) => {
    this.state.lang = lang;
    this.listeners.forEach((listener) => listener(lang));
    this.services.api.setHeader("Accept-Language", lang);
  };
  getLang = () => {
    return this.state.lang;
  };
}

export default I18nService;
