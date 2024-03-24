import * as translations from './translations';

 class I18nService {
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.lang = config.lang;
		this.api = this.services.api;
    this.listeners = []; // Слушатели изменений
  }

	/**
   * Выбор языка
   * @returns {String}
   */
  getLang() {
    return this.lang;
  }

	/**
   * Установка языка
   * @param lang {String}
   */
  setLang = (lang) => {
    this.lang = lang;
		this.api.setHeader('X-Lang', lang)
    this.listeners.forEach(listener => listener(this.lang));
  }  

	/**
   * Перевод нужного текста
   * @param text {String}
   * @param plural {Number}
   * @returns {String}
   */
  translate = (text, plural) => {
    let result = translations[this.lang] && (text in translations[this.lang])
      ? translations[this.lang][text]
      : text;

    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(this.lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  }

	/**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
		// Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }
}

export default I18nService;