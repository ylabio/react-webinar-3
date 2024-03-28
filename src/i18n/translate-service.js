import * as translations from './translations';

 class TranslateService {
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.language = config.language;
    this.listeners = [];
  }

  changeLanguage = (language) => {
    this.language = language;
    this.listeners.forEach(listener => listener(language));
    this.services.api.setHeader('X-Lang', language);
  }

  translate(text, plural) {
    let result = translations[this.language] && (text in translations[this.language])
      ? translations[this.language][text]
      : text;

    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(this.language).select(plural);
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
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }
}

export default TranslateService;