import * as translations from "./index";

class TranslationService {
  constructor(services, config = {}, locale = 'ru') {
    this.services = services
    this.config = config
    this.locale = locale
  }

  translate(text, lang = this.locale, plural) {
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