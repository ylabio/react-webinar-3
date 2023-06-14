import translate from './translate';

class I18nService {
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.listeners = [];
    this.lang = config.defaultLang
    this.services.api.setHeader(config.languageHeader, this.lang);
  }

  t = (text, number, lang = this.lang) => {
    return translate(lang, text, number)
  }

  setLang = (lang) => {
    this.services.api.setHeader(this.config.languageHeader, lang);
    this.lang = lang;
    for (const listener of this.listeners) listener(lang);
  }

  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }
}

export default I18nService
