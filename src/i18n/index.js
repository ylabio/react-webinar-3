import * as translations from './translations';

class I18nService {

  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.currentLang = this.config?.currentLang.split('-')[0];
    this.listeners = [];
  }

  translate(text, plural, lang = this.currentLang) {
    let result = translations[lang] && (text in translations[lang])
      ? translations[lang][text]
      : text;
  
    if (typeof plural !== 'undefined'){
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }
  
    return result;
  }

  setLang(lang) {
    this.currentLang = lang;
    this.services.api.setHeader('X-Lang', this.currentLang);
    for (const listener of this.listeners) listener(this.currentLang);
  }

  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

}

export default I18nService;