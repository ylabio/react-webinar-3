import translateHelper from './translate';

class I18nService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.lang = 'ru';
    this.listeners = [];
  }

  setLang(lang) {
    this.lang = lang;

    for (const listener of this.listeners) { // оповещаем подписчиков об изменениях
      listener(this.lang);
    }
  }

  getLang() {
    return this.lang
  }

  translate(text, plural) {
    return translateHelper(this.lang, text, plural);
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  unsubscribe(listener) {
    this.listeners = this.listeners.filter(item => item !== listener);
  }
}

export default I18nService;
