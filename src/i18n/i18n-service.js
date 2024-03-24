import * as translations from './translations';

 class I18nService {
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.lang = config.defaultLanguage;  
    this.subscribers = [];
  }  

  setLang = (newLang) => {
    this.lang = newLang;    
    this.subscribers.forEach(subscriber => subscriber(newLang));
  }  

  translate = (text, plural) => {
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

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
    return () => {
      this.subscribers = this.subscribers.filter((existing) => existing !== subscriber);
    };
  }
}

export default I18nService;