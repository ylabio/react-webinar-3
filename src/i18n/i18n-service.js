import * as translations from './translations';

 class I18nService {
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.lang = config.defaultLanguage;  
    this.listeners = [];
    this.refresh = false;
  }  

  setLang = (lang) => {
    this.lang = lang;    
    this.listeners.forEach(listener => listener(lang));
    this.refresh = true;
  }

  setRefresh = (refresh) => {
    this.refresh = refresh;
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

  subscribe (listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }
}

export default I18nService;