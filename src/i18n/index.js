class I18nService {
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this._currentLang = config.defaultLang || 'ru';
    this.subscribers = new Set();
  }

  get currentLang() {
    return this._currentLang;
  }

  translate(key, lang = this._currentLang) {
    const translations = require(`./translations/${lang}.json`);
    return translations[key] || key;
  }

  setLang(lang) {
    if (lang !== this._currentLang) {
      this._currentLang = lang;
      this.notifySubscribers();
      this.services.api.setHeader('X-Lang', lang); // Обновление заголовка X-Lang
    }
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notifySubscribers() {
    this.subscribers.forEach(callback => callback());
  }
}

export default I18nService;
