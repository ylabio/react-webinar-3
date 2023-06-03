import StoreModule from "../module";

/**
 * Детальная ифнормация о товаре для страницы товара
 */
class ArticleState extends StoreModule {

  initState() {
    return {
      data: {},
      isExist: false,
      waiting: false // признак ожидания загрузки
    }
  }

  /**
   * Загрузка товаров по id
   * @param id {String}
   * @return {Promise<void>}
   */
  async load(id) {
    // Сброс текущего товара и установка признака ожидания загрузки
    this.setState({
      data: {},
      isExist: false,
      waiting: true
    });

    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
      const json = await response.json();

      // Товар загружен успешно
      this.setState({
        data: json.result,
        isExist: true,
        waiting: false
      }, 'Загружен товар из АПИ');

    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        data: {},
        isExist: false,
        waiting: false
      });
    }
  }

  /**
   * Очистка данных о товаре
   */
  reset() {
    // Сброс текущего товара
    this.setState({
      data: {},
      isExist: false,
      waiting: false
    }, 'Сброшены данные о товаре');
  }
}

export default ArticleState;
