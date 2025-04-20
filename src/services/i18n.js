import { EventEmitter } from 'events';
import * as translations from '../i18n/translations';

export default class I18nService extends EventEmitter {
  constructor(services, config = {}) {
    super();
    this.services = services;
    this.config = config;
    this._lang = config.defaultLang || 'ru';
    this.services.api.setLanguage(this._lang);
  }

  get lang() {
    return this._lang;
  }

  set lang(value) {
    if (this._lang !== value) {
      this._lang = value;
      this.services.api.setLanguage(value);
      this.emit('languageChanged', value);
    }
  }

  translate = (text, number) => {
    let result = translations[this._lang]?.[text] ?? text;

    if (typeof number !== 'undefined') {
      const key = new Intl.PluralRules(this._lang).select(number);
      result = result?.[key] ?? result;
    }

    return result;
  };
}
