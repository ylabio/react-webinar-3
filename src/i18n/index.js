class I18nService {
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this._lang = config.defaultLang || 'ru';
    this.translations = config.translations || {};

    this._observers = [];
  }

  get lang() {
    return this._lang;
  }

  set lang(newLang) {
    if (this._lang !== newLang) {
      this._lang = newLang;
      this._notifyObservers();
    }
  }

  translate(text, plural, lang = this._lang) {
    let result =
      this.translations[lang] && text in this.translations[lang]
        ? this.translations[lang][text]
        : text;

    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  }

  subscribe(observer) {
    this._observers.push(observer);
  }

  unsubscribe(observer) {
    this._observers = this._observers.filter(obs => obs !== observer);
  }

  _notifyObservers() {
    this._observers.forEach(observer => observer(this._lang));
  }
}

export default I18nService;
