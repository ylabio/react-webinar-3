import * as translations from './translations';

class i18nService {
  constructor() {
    this.lang = 'ru';
    this.listeners = new Set();
  }

  // Меняем язык
  setLang(lang) {
    if (this.lang !== lang) {
      this.lang = lang;
      this.sentNotify(lang);
    }
  }

  // Получаем язык
  getLang() {
    return this.lang;
  }

  // Переносим нашу функцию translate из translate.js
  translate(text, lang = this.lang, plural) {
    let result = translations[lang] && text in translations[lang] ? translations[lang][text] : text;

    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  }

  // Добавляем в слушатели
  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  // Передаем слушателям новый язык при смене
  sentNotify(lang) {
    this.listeners.forEach(cb => cb(lang));
  }
}

export default i18nService;
