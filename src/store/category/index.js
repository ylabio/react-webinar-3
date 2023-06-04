import StoreModule from '../module';

/**
 * Состояние каталога - параметры фильтра исписок товара
 */
class CategoryState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      waiting: false,
      categories: [],
      error: null,
    };
  }

  async loadCategories() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    try {
      const response = await fetch(
        '/api/v1/categories?fields=_id,title,parent(_id)&limit=*'
      );
      const json = await response.json();
      this.setState(
        {
          ...this.getState(),
          categories: json.result.items,
          waiting: false,
        },
        'Список категорий загружен из АПИ'
      );
    } catch (error) {
      this.setState({
        ...this.getState(),
        error,
        waiting: false,
      });
    }
  }
}

export default CategoryState;
