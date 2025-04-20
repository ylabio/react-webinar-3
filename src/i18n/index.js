import translations from './translations';


export class I18nService {
  constructor(services) {
    this.services = services;
    this._lang = 'ru';
    this.subscribers = [];
  }

  get lang() {
    return this._lang;
  }

  set lang(value) {
    this._lang = value;
    this.notifySubscribers();
    this.updateApiLanguageHeader();
  }

  t(text, plural) {
    if (!translations[this._lang]) {
      console.error(`Language "${this._lang}" not found in translations`);
      return text;
    }

    const keys = text.split('.');
    let result = translations[this._lang];
    
    for (const key of keys) {
      result = result?.[key];
      if (result === undefined) break;
    }

    if (result === undefined) {
      console.warn(`Translation not found for "${text}" in language "${this._lang}"`);
      return text;
    }

    if (typeof plural !== 'undefined' && typeof result === 'object') {
      const pluralKey = new Intl.PluralRules(this._lang).select(plural);
      return result[pluralKey] || text;
    }

    return result;
  }

  updateApiLanguageHeader() {
    this.services.api.setHeader('Accept-Language', this._lang);
    this.services.api.setHeader('X-Lang', this._lang);
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  notifySubscribers() {
    this.subscribers.forEach(callback => callback(this._lang));
  }
}