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
    this.t = this.t.bind(this);
    this.setLang = this.setLang.bind(this);
    this.getLang = this.getLang.bind(this);
  }
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
  t(lang, text, plural) {
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
  setLang(lang) {
    this.state.lang = lang;
    this.listeners.forEach((listener) => listener(lang));
  }
  getLang() {
    return this.state.lang;
  }
}

export default I18nService;
