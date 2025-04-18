import translate from '../i18n/translate';

export default class I18n {
  constructor(defaultLocale = 'ru') {
    this.locale = defaultLocale;
    this.listeners = [];
  }

  getLocale() {
    return this.locale;
  }

  getAvailableLocales() {
    return [
      { value: 'ru', title: 'Русский' },
      { value: 'en', title: 'English' },
    ];
  }

  setLocale(newLocale) {
    this.locale = newLocale;
    this.listeners.forEach(fn => fn(this.locale));
  }

  translate = (key, plural) => translate(this.locale, key, plural);

  onChange(fn) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== fn);
    };
  }
}
