import translations from '../i18n/translations';

class I18nService {
  constructor(services) {
    this.services = services;
    this._lang = localStorage.getItem('language') || 'ru';
    this._listeners = [];
    this.updateApiLanguageHeader();
  }

  get lang() {
    return this._lang;
  }

  setLang(lang) {
    if (this._lang !== lang) {
      this._lang = lang;
      this.updateApiLanguageHeader();
      this.notifyListeners();
      localStorage.setItem('language', lang);
    }
  }

  subscribe(listener) {
    this._listeners.push(listener);
  }

  unsubscribe(listener) {
    this._listeners = this._listeners.filter(l => l !== listener);
  }

  notifyListeners() {
    this._listeners.forEach(listener => listener());
  }

  translate(lang, text, plural) {
    const langTranslations = translations[lang];
    if (!langTranslations || !(text in langTranslations)) {
      return text;
    }

    const result = langTranslations[text];

    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(lang).select(plural);
      return result[key] || result.other || result;
    }

    return result;
  }

  t(text, plural) {
    return this.translate(this.lang, text, plural);
  }

  updateApiLanguageHeader() {
    const api = this.services.api;
    api.setHeader('Accept-Language', this.lang);
  }
}

export default I18nService;
