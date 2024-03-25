import * as translations from "./index";

class TranslationService {
  constructor(services, config = {}) {
    this.services = services
    this.config = config
    this.defaultLocale = 'ru-RU'
  }

  translate(lang = this.defaultLocale, text, plural) {
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
}

export default TranslationService;