class APIService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = {
      baseUrl:
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/api/v1' // для разработки
          : 'https://ваш-настоящий-api.com/api/v1', // для production
      ...config,
    };
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'X-Lang': services.i18n.currentLang,
    };
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
    const finalHeaders = { ...this.defaultHeaders, ...headers };
    const res = await fetch(url, {
      method,
      headers: finalHeaders,
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
}

export default APIService;
