import * as translations from './translations/index';

class I18n {
  constructor() {
    this.locale = localStorage.getItem('lang') || 'ru';
    this.subscribers = [];
    this.localeWords = translations;
  }

  setLocale(locale) {
    if (this.locale !== locale && this.localeWords[locale]) {
      this.locale = locale;
      this.subscribersTrigger();
      localStorage.setItem('lang', locale)
    }
  }
  getLocale() {
    return this.locale;
  }
  getLocalesList() {
    return [
      { value: 'ru', title: 'Русский' },
      { value: 'en', title: 'English' },
    ];
  }

 translate(key, plural, locale ) {
  const targetLocale = locale || this.locale;
  const localeWords = this.localeWords[targetLocale];

  let translated = localeWords?.[key] || key;

  if (typeof plural !== 'undefined') {
    if (typeof translated === 'object' && !Array.isArray(translated)) {
      const pluralCategory = new Intl.PluralRules(targetLocale).select(plural);
      translated = translated[pluralCategory] || translated.other || key;
    }
  }

  return translated;
}

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }
  subscribersTrigger() {
    this.subscribers.forEach(callback => callback(this.locale));
  }
}
export default I18n;
