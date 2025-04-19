class APIService {
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  setHeader(name, value = null) {
    if (value != null) this.defaultHeaders[name] = value;
    else delete this.defaultHeaders[name];
  }

  async request({ url, method='GET', headers={}, ...opts }) {
    if (!/^(http|\/\/)/.test(url)) url = this.config.baseUrl + url;

    const langHeader = this.services.i18n.lang;
    const finalHeaders = {
      ...this.defaultHeaders,
      'Accept-Language': langHeader,
      ...headers,
    };

    const res = await fetch(url, { method, headers: finalHeaders, ...opts });
    const data = await res.json();

    return { data, status: res.status, headers: res.headers };
  }
}

export default APIService;
