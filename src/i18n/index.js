import translates from './translate.js';

export default class I18n {
  constructor(apiService, config = {}) {
    this.api = apiService;
    this.config = config;
    this.lang = this.config.lang;
    const lang = localStorage.getItem('lang')
      ? localStorage.getItem('lang')
      : localStorage.setItem('lang', this.lang);
    this.listeners = new Set();
    return this.api.setHeader('X-lang', lang);
  }

  getLang = () => localStorage.getItem('lang');
  setLang = lang => {
    localStorage.setItem('lang', lang);
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
    return translates(localStorage.getItem('lang'), text, number);
  };
}
