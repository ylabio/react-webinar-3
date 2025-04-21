class APIService {
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept-Language': 'ru',
    };
  }

  setHeader(name, value = null) {
    if (value) {
      this.defaultHeaders[name] = value;
    } else if (this.defaultHeaders[name]) {
      delete this.defaultHeaders[name];
    }
  }

  async request({ url, method = 'GET', headers = {}, ...options }) {
    if (!url.match(/^(http|\/\/)/)) url = this.config.baseUrl + url;
    
    try {
      const res = await fetch(url, {
        method,
        headers: { ...this.defaultHeaders, ...headers },
        ...options,
      });

      const data = await res.json();
      
      if (data?.translations) {
        this.services.i18n.addTranslations(data.translations);
      }

      return { 
        data,
        status: res.status,
        headers: res.headers 
      };
    } catch (e) {
      console.error('API request failed:', e);
      throw e;
    }
  }

  async fetchItemsDetails(items) {
    const updates = {};
    await Promise.all(
      items.map(async item => {
        try {
          const res = await this.request({
            url: `/api/v1/articles/${item._id}?fields=title,price,description`
          });
          updates[item._id] = res.data.result;
        } catch (e) {
          updates[item._id] = item;
        }
      })
    );
    return updates;
  }
}

export default APIService;
