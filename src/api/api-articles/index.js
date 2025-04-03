
//Этот класс предоставляет удобный интерфейс для работы с товарами через API.
class ArticleService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }
  // Метод getArticleList получает список товаров с возможностью указания лимита, смещения и полей
  async getArticleList(limit = null, skip = null, fields = null) {
    const params = {};
    if (limit !== null) {
      params.limit = limit;
    }
    if (skip !== null) {
      params.skip = skip;
    }
    if (fields !== null) {
      params.fields = fields;
    }
    return this.apiClient.get('/api/v1/articles', params);
  }

  //запрос к API для получения общего количества элементов.
  async getTotalItems() {
    const response = await this.apiClient.get('/api/v1/articles');
    return response.result.items.length * 25;
  }

  // Метод getArticleById получает товар по ID с возможностью указания полей.
  async getArticleById(articleId, fields = null) {
    const params = {};
    if (fields !== null) {
      params.fields = fields;
    }
    return this.apiClient.get(`/api/v1/articles/${articleId}`, params);
  }
}

export {ArticleService}

// async getTotalItems() {
//   const response = await this.apiClient.get('/api/v1/articles/count');
//   return response.data.count;
// }
