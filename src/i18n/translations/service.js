import * as translations from "./index";

class TranslationService {
  constructor(services, config = {}, locale = 'ru') {
    this.services = services
    this.config = config
    this._locale = localStorage.getItem('locale') || 'ru'
    this._localeChangeCallbacks = []
  }

  onLocaleChange(cb) {
    this._localeChangeCallbacks.push(cb)
  }

  offLocaleChange(callback) {
    this._localeChangeCallbacks = this._localeChangeCallbacks.filter(cb => cb !== callback);
  }

  translate(text, lang = this._locale, plural) {
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

  // changeLocale(locale) {
  //   this.locale = locale
  //   localStorage.setItem('locale', this.locale)
  // }

  get locale() {
    return this._locale
  }

  set locale(locale) {
    this._locale = locale
    localStorage.setItem('locale', this._locale)
    this._localeChangeCallbacks.forEach(cb => cb(this._locale))
  }
}

export default TranslationService;