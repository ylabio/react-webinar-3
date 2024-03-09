import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      article: null,
    }
  }

  /**
   * Получаем данные о товаре
   * @param page Номер странрицы
   */
  async getArticle(articleId) {
    this.setState({
      ...this.getState(),
      article: null
    }, 'Переход на страницу товара ' + articleId);

    const response = await fetch(`/api/v1/articles/${articleId}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      article: json.result
    }, 'Загрузка товара ' + articleId);
  }
}

export default Catalog;
