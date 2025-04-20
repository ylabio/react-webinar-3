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
    const fullUrl = url.match(/^(http|\/\/)/) ? url : this.config.baseUrl + url;
    console.log('API Request:', { fullUrl, method, headers });

    try {
      const res = await fetch(fullUrl, {
        method,
        headers: { ...this.defaultHeaders, ...headers },
        ...options
      });
      const data = await res.json();
      console.log('API Response:', { status: res.status, data });
      return { data, status: res.status };
    } catch (e) {
      console.error('API Error:', e);
      throw e;
    }
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

  /**
 * Загрузка комментариев
 * @param parentId {String} ID родителя (товара или комментария)
 */
  async getComments(parentId) {
    const res = await this.request({
      url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${parentId}`
    });
    // Явно возвращаем result или дефолтные значения
    return {
      items: res.data?.result?.items || [],
      count: res.data?.result?.count || 0
    };
  }

  /**
   * Отправка комментария
   * @param parentId {String} ID родителя
   * @param parentType {'article'|'comment'} Тип родителя
   * @param text {String} Текст комментария
   */
  async addComment(parentId, parentType, text) {
    const res = await this.request({
      url: `/api/v1/comments`,
      method: 'POST',
      headers: {
        'X-Token': localStorage.getItem('token')
      },
      body: JSON.stringify({
        text,
        parent: { _id: parentId, _type: parentType }
      })
    });
    return res.data?.result; // Учитываем вложенность
  }
}

export default APIService;
