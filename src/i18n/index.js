import * as translations from "./translations";

class I18NService {
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.lang = config.lang;
    this.listeners = [];
    console.log(this.lang);
  }

  setLang = (lang) => {
    this.lang = lang;
    console.log("setLang");
    this.listeners.forEach(listener => listener(lang));
  }

  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  translate(text, plural) {
    let result = translations[this.lang] && (text in translations[this.lang])
      ? translations[this.lang][text]
      : text;
  
    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(this.lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }
    return result;
  }
}

export default I18NService;
