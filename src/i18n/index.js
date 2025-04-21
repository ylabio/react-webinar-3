class I18nService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.lang = config.baseLang;
    this.listeners = new Set();
    this.services.api.setHeader('Accept-Language', this.lang);
  }

  getLang() {
    return this.lang;
  }

  setLang(lang) {
    this.lang = lang;
    this.services.api.setHeader('Accept-Language', lang);
    this.notifyListeners();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.lang));
  }
}

export default I18nService;
