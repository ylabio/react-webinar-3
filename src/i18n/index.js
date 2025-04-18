class I18nService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.locale = config.locale;
    this.dictionary = config.dictionary || {};
    this.listeners = new Set();
  }

  getLocale() {
    return this.locale;
  }

  setLocale(locale) {
    if (this.locale !== locale) {
      this.locale = locale;
      this.notify(locale);
    }
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify(locale) {
    this.listeners.forEach(cb => cb(locale));
  }

  translate(text, plural, lang = this.locale) {
    let result =
      this.dictionary[lang] && text in this.dictionary[lang] ? this.dictionary[lang][text] : text;
    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }
    return result;
  }
}

export default I18nService;
