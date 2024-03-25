import * as translations from './translations'

class I18nService {

  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.locale = config.locale;

    this.t = this.t.bind(this);
    this.setLocale = this.setLocale.bind(this);
  }

  t(text, lang = this.locale) {
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

  setLocale(value) {
    this.locale = value;
    console.log(this.services);
    this.services.api.setHeader(this.services.config.store.modules.session.localeHeader, value);
  }
}

export default I18nService;