class APIService {

  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }

    this.setLangHeader();

    //вообще подписываясь здесь мы по идее должны делать когда нибудь отписку
    //но однако же так как синглтон данного сервиса существует до конца сессии
    // то наверно делать отписку не нужно
    this.services.i18n.addSubscriber(() => {
      this.setLangHeader();
    })
  }

  setLangHeader() {
    this.setHeader('Accept-Language', this.services.i18n.lang);
    this.setHeader('X-Lang', this.services.i18n.lang);
  }

  /**
   * HTTP запрос
   * @param url
   * @param method
   * @param headers
   * @param options
   * @returns {Promise<{}>}
   */
  async request({url, method = 'GET', headers = {}, ...options}) {
    if (!url.match(/^(http|\/\/)/)) url = this.config.baseUrl + url;
    const res = await fetch(url, {
      method,
      headers: {...this.defaultHeaders, ...headers},
      ...options,
    });
    return {data: await res.json(), status: res.status, headers: res.headers};
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
