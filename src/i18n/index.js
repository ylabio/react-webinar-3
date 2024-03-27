import * as translations from './translations';

class I18n {
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.listeners = [];
    this.lang = 'ru';
  }

  translate(text, plural, lang = this.lang) {
    let result = translations[lang] && (text in translations[lang])
      ? translations[lang][text]
      : text;

    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }
    return result;
  }

  setLang(value) {
    this.lang = value;
    this.services.api.setHeader('Accept-Language', value)
    for (const listener of this.listeners) listener(this.lang);
  }

  getLang() {
    return this.lang
  }

  subscribe(listener) {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }
}

export default I18n;