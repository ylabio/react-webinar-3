import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      article: null,
      isFetching: false,
      isSuccess: false
    }
  }

  /**
   * Получаем данные товара
   * @param articleId Идентификатор товара
   */
  async getArticle(articleId) {
    this.setState({
      ...this.getState(),
      article: null,
      isFetching: true
    }, 'Запрос данных товара ' + articleId);

    const response = await fetch(`/api/v1/articles/${articleId}?fields=*,madeIn(title,code),category(title)`);
    if (response.status === 200) {
      const json = await response.json();
      this.setState({
        ...this.getState(),
        article: json.result,
        isFetching: false,
        isSuccess: true
      }, 'Загружены данные товара ' + articleId);
    } else {
      this.setState({
        ...this.getState(),
        isFetching: false,
        isSuccess: false
      }, 'Ошибка загрузки данных товара ' + articleId);
    }
  }
}

export default Catalog;
