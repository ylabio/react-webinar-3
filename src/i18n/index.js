import * as translations from './translations';

class I18nService {
  constructor(services, config = {}) {
    this.api = services.api;
    this.currentLang = config.defaultLang || 'ru';
    this.translations = translations;
    this.changeApiHeaders();
    this.subscribers = [];
  }

  getCurrentLang() {
    return this.currentLang;
  }

  setCurrentLang(newLang) {
    if (newLang === this.currentLang) return;

    this.currentLang = newLang;

    this.changeApiHeaders();
    this.callSubcriber();

    return this.currentLang;
  }

  changeApiHeaders() {
    this.api.setHeader('Accept-Language', this.currentLang);
  }

  translate(text, plural) {
    let result =
      this.translations[this.currentLang] && text in this.translations[this.currentLang]
        ? this.translations[this.currentLang][text]
        : text;

    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(this.currentLang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  unsubscribe(callback) {
    this.subscribers = this.subscribers.filter(subscriber => subscriber !== callback);
  }

  callSubcriber() {
    this.subscribers.forEach(call => call());
  }

}

export default I18nService;
