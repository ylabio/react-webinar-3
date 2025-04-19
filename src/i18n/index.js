import translates from './translate.js';

export default class I18n {
  constructor(apiService, config = {}) {
    this.api = apiService;
    this.config = config;
    this.lang = this.config.lang;
    this.listeners = new Set();
    this.api.setHeader('X-lang', this.lang);
  }

  getLang = () => this.lang;

  setLang = lang => {
    if (this.lang === lang) return;
    this.lang = lang;
    // Ставим новый заголовок в API
    this.api.setHeader('X-lang', lang);
    // Уведомляем подписчиков о смене языка
    this.listeners.forEach(listener => listener());
  };

  subscribe = listener => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  translate = (text, number) => {
    return translates(this.lang, text, number); 
  };
}

