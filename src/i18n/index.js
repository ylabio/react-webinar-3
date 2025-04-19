class I18nService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   * @param currentLang {string} Язык по умолчанию
   * @param translations {Object} Словари переводов
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.currentLang = this.initLang();
    this.translations = config.translations || {};

    this.subscribers = new Set();
    this.setupApiIntegration();
  }

  setupApiIntegration() {
    this.subscribe(() => {
      this.services.api.setLanguage(this.currentLang);
    });
  }

  /**
   * Инициализация языка (из браузера, сохранённых настроек или API)
   */
  initLang() {
    const browserLang = navigator.language.split('-')[0];
    const lang = this.config.supportedLangs.includes(browserLang)
      ? browserLang
      : this.config.defaultLang;
    return lang;
  }

  /**
   * Устанавливает язык и сохраняет его в API/хранилище при необходимости
   */
  setLang(lang) {
    if (!this.config.supportedLangs.includes(lang)) {
      console.warn(`Язык "${lang}" не поддерживается`);
      return;
    }

    this.currentLang = lang;
    this.notifySubscribers();
  }

  /**
   * Получение текущего языка
   * @retutns {String}
   */
  getLang() {
    return this.currentLang;
  }

  /**
   * Перевод фраз по словарю
   * @param text {String} Текст для перевода
   * @param plural {Number} Число для плюрализации
   * @returns {String} Переведенный текст
   */
  translate(text, plural) {
    let result =
      this.translations[this.currentLang] && text in this.translations[this.currentLang]
        ? this.translations[this.currentLang][text]
        : text;

    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(this.currentLang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  }

  /**
   * Подписывает callback на изменение языка
   * @param callback {Function} Функция, вызываемая при изменении языка
   * @returns {Function} Функция для отписки
   */
  subscribe(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }

    this.subscribers.add(callback);
    return () => this.unsubscribe(callback);
  }

  /**
   * Отписывает callback от изменений
   * @param {Function} callback Функция, которую нужно удалить из подписчиков
   */
  unsubscribe(callback) {
    this.subscribers.delete(callback);
  }

  /**
   * Уведомляет всех подписчиков об изменении языка
   */
  notifySubscribers() {
    this.subscribers.forEach(callback => {
      try {
        callback();
      } catch (error) {
        console.error('Ошибка в подписчике i18n:', error);
      }
    });
  }
}

export default I18nService;
