class APIService {

  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config
    this.defaultHeaders = {
      'Content-Type': 'application/json'
    }

    // тест изменения языка из другого сервиса
    //setTimeout(()=>this.services.i18n.setDefaultLanguage('en'), 5000); // ok

    // Думается, лучше будет задавать заголовок из сервиса языка, чтобы в одном месте решения принимались, а не лазить по всем сервисам...
    /* this.services.i18n.subscribe(() => {
      this.setHeader('X-Lang', this.services.i18n.defaultLanguage); // ok
    }); */
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
