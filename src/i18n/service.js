import translate from './translate';

const ls_key = 'app-lang';

export default class I18nService {
  constructor(cfg, services) {
    this.cfg = cfg;
    this.services = services;

    this._lang = localStorage.getItem(ls_key) || cfg.defaultLang || 'ru';

    services.api.setHeader('Accept-Language', this._lang);

    this.subscribers = new Set();
  }


  get lang()  
    { return this._lang; }
    translate = (k, n)  => translate(this._lang, k, n);
    t = this.translate;

  /** Изменение языка */
  setLang = newLang => {
    if (newLang === this._lang) return;

    this._lang = newLang;
    localStorage.setItem(ls_key, newLang);
    this.services.api.setHeader('Accept-Language', newLang);

    this.subscribers.forEach(cb => cb(newLang));
  };

  subscribe(cb) { this.subscribers.add(cb); return () => this.subscribers.delete(cb); }
}
