import translate from './translate';

class I18n {
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.listeners = [];
  }

  setLang = (lang) => {
    this.config = {
      ...this.config,
      lang: lang
    };
    this.listeners.map((listener) => listener(lang));
    this.services.api.setHeader('X-Lang', lang);
  }

  lang = () => {
    return this.config.lang;
  }

  translate = (text, number) => {
    return translate(this.config.lang, text, number)
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }
}

export default I18n;
