class I18nService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;

    this.currentLang = config.defaultLang ;//
    this.translations = config.translations || {};
    this.listeners = new Set();
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  getLang() {
    return this.currentLang;
  }

  setLang(langCode) {
    if (this.currentLang === langCode) return;

    this.currentLang = langCode;

    this.services.api.setLangHeader(langCode);

    this.listeners.forEach((cb) => cb(langCode));
  }

  translate(key, plural, lang = this.currentLang) {
    const translation = this.translations?.[lang]?.[key];

    if (typeof plural !== 'undefined') {
      const pluralForm = new Intl.PluralRules(lang).select(plural);
      return translation?.[pluralForm] || key;
    }
    return translation || key;
  }
}

export default I18nService;
