import EventEmitter from 'events';

export default class I18nService extends EventEmitter {
  constructor(services, config = {}) {
    super();
    this.services = services;
    this.config = config;

    this._lang = localStorage.getItem('lang') || config.defaultLang || 'ru';

    this.translations = config.translations || {};
    this.apiLanguageMap = config.apiLanguageMap || {};
    this.updateApiLanguageHeader();
  }

  get lang() {
    return this._lang;
  }

  set lang(value) {
    if (this._lang !== value) {
      this._lang = value;
      localStorage.setItem('lang', value);
      this.updateApiLanguageHeader();
      this.emit('languageChanged', this._lang);
      this.services.store.actions.categories.load();
    }
  }

  updateApiLanguageHeader() {
    const apiLang = this.apiLanguageMap[this._lang] || this._lang;
    this.services.api.setHeader('Accept-Language', apiLang);
    this.services.api.setHeader('X-Lang', apiLang);
  }

  addTranslations(translations) {
    this.translations = {
      ...this.translations,
      ...translations
    };
    this.emit('translationsUpdated');
  }

  translate(key, params = {}) {
    let translation = this.translations[this._lang]?.[key] ||
                    this.translations['ru']?.[key] ||
                    key;

    if (typeof translation === 'object' && params.count !== undefined) {
      const pluralKey = new Intl.PluralRules(this._lang).select(params.count);
      translation = translation[pluralKey] || translation.other || key;
    }

    if (params && typeof translation === 'string') {
      Object.keys(params).forEach(param => {
        translation = translation.replace(new RegExp(`\\{${param}\\}`, 'g'), params[param]);
      });
    }

    return translation;
  }
}