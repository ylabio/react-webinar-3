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

    // Извлечем язык, раз у нас уже есть сервис здесь, и перед каждым запросом будем его обновлять
    // а в main добавим зависимость lang
    const lang = this.services.i18n.getLang();

    const res = await fetch(url, {
      method,
      headers: { ...this.defaultHeaders, ...headers, 'Accept-language': lang },
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
