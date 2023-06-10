import * as translations from './translations';

class LanguageService {

  defaultLanguage = null;

  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.listeners = [];
    this.setDefaultLanguage(this.config?.defaultLanguage);
  }

  /**
  * Перевод фразу по словарю
  * @param text {String} Текст для перевода
  * @param [plural] {Number} Число для плюрализации
  * @param lang {String} Код языка
  * @returns {String} Переведенный текст
  */
  translate(text, plural, lang) {
    lang ??= this.defaultLanguage; // если язык не задать, возьмется предустановленный

    let result = translations[lang] && (text in translations[lang])
      ? translations[lang][text]
      : text;

    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  }

  // Установка языка по умолчанию. По-хорошему, надо начинать с языка браузера.
  setDefaultLanguage(language) {
    language ??= navigator.language || navigator.userLanguage;
    if (language.indexOf('-'))
      language = language.split('-')[0]; // en-EN → en (к текущему формату приложения)
    this.defaultLanguage = language;

    console.log('setDefaultLanguage:', this.defaultLanguage); //ok

    // здесь перечислим все места, где нужно задать/обновить локаль
    this.services.api.setHeader('X-Lang', this.defaultLanguage);

    for (const listener of this.listeners) listener(this.defaultLanguage);
  }

  // Добавить подписку на изменения
  subscribe(listener) {
    //console.log('this.listeners.length:', this.listeners.length); //ok
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }
}

export default LanguageService;