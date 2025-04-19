class APIService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
    // this.i18n = services.i18n;
    // // this.languageHeader = 'ru';
    // this.setHeader('Accept-Language', this.i18n.locale);
    // this.i18n.subscribe(this.updateLanguageHeader.bind(this));
    const i18n = this.services?.i18n;
    if (i18n) {
      this.setHeader('X-Lang', i18n.locale);
      i18n.subscribe(locale => {
        return this.setHeader('X-Lang', locale);
      });
    }
  }

  /**
   * HTTP запрос
   * @param url
   * @param method
   * @param headers
   * @param options
   * @returns {Promise<{}>}
   */
  async request({ url, method = 'GET', headers = {}, ...options }) {
    if (!url.match(/^(http|\/\/)/)) url = this.config.baseUrl + url;
    const res = await fetch(url, {
      method,
      headers: { ...this.defaultHeaders, ...headers },
      ...options,
    });
    return { data: await res.json(), status: res.status, headers: res.headers };
  }

  /**
   * Установка или сброс заголовка
   * @param name {String} Название заголовка
   * @param value {String|null} Значение заголовка
   */
  setHeader(name, value = null) {
    if (value) {
      this.defaultHeaders[name] = value;
    } else if (this.defaultHeaders[name]) {
      delete this.defaultHeaders[name];
    }
  }

  updateLanguageHeader(locale) {
    this.languageHeader = locale;
    this.setHeader('Accept-Language', locale);
  }
}

export default APIService;
