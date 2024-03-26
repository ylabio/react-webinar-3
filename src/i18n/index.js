import * as translations from './translations';

class i18nService {
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.lang = config.lang;
    this.listeners = [];
  }

  setLang = (newLang) => {
    this.lang = newLang;
    this.listeners.forEach(listener => listener(newLang));
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

  subscribeLangChange(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners.filter(listener => listener !== callback);
    }
  }
}

export default i18nService;

// import * as translations from './translations';

// class i18nService {
//   constructor(services, config) {
//     this.services = services;
//     this.config = config;
//   }

//   translate(text, plural) {
//     let result = translations[this.config.lang] && (text in translations[this.config.lang])
//       ? translations[this.config.lang][text]
//       : text;

//     if (typeof plural !== 'undefined') {
//       const key = new Intl.PluralRules(this.config.lang).select(plural);
//       if (key in result) {
//         result = result[key];
//       }
//     }

//     return result;
//   }
// }

// export default i18nService;