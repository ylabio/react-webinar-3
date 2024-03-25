import * as translations from './translations';

class I18nService {
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.lang = config.lang;
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  notifyListeners() {
    for (const listener of this.listeners) {
      listener(this.lang);
    }
  }

  setLang(lang) {
    this.lang = lang;
    window.localStorage.setItem('lang', lang)
    this.notifyListeners();
  }

  translate(text, plural) {
    const lang = this.lang;
    const translationsForLang = translations[lang];
    if (translationsForLang && translationsForLang[text]) {
      let result = translationsForLang[text];

      if (typeof plural !== 'undefined') {
        const key = new Intl.PluralRules(lang).select(plural);
        if (result[key]) {
          result = result[key];
        }
      }
      return result;
    }
    return text;
  }
}

export default I18nService;
