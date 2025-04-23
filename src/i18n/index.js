class I18nService {
  /**
   * @param {Services} services Менеджер сервисов
   * @param {Object} config Конфигурация: словарь и текущая локаль
   */
  constructor(services, config = {}) {
    this.services = services;
    this.locale = config.locale;
    this.dictionary = config.dictionary || {};
    this.listeners = new Set();
  }

  getLocale() {
    return this.locale;
  }

  setLocale(locale) {
    if (this.locale !== locale) {
      this.locale = locale;
      this.notify(locale);
    }
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify(locale) {
    this.listeners.forEach(cb => cb(locale));
  }

  /**
   * Перевод строки с учётом множественного числа (если указано)
   * @param {string} text Ключ перевода
   * @param {number} [plural] Число для определения формы множественности
   * @param {string} [lang=this.locale] Язык перевода
   * @returns {string} Переведённая строка
   */
  translate(text, plural, lang = this.locale) {
    const translations = this.dictionary[lang];
    let result = translations && text in translations ? translations[text] : text;

    if (typeof plural !== 'undefined') {
      const pluralKey = new Intl.PluralRules(lang).select(plural);
      if (result && typeof result === 'object' && pluralKey in result) {
        result = result[pluralKey];
      }
    }

    return result;
  }
}

export default I18nService;
