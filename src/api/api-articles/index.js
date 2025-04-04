
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

  // Запрос к API для получения общего количества элементов.
  async getTotalItems() {
    const response = await this.apiClient.get('/api/v1/articles?limit=10&skip=10&fields=items(_id, title, price),count');
    return response.result.count;
  }

  // метод для получения товара по id с подробной информацией о стране и категории
  async getArticleWithDetails(articleId) {
    const params = {
      fields: '*,madeIn(title,code),category(title)'
    };
    const response = await this.apiClient.get(`/api/v1/articles/${articleId}`, params);
    return response.result;
  }
}

export {ArticleService}
