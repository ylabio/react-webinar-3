import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра исписок товара
 */
class CategoriesStore extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
      waiting: false,
    };
  }

  /**
   * Получение доступных категорий товаров
   */
  async getCategories() {
    try {
      const response = await fetch("api/v1/categories?fields=_id,title,parent(_id)&limit=*");
      const json = await response.json();
      this.setState(
        {
          ...this.getState(),
          categories: json.result.items,
        },
        "Загружены категории"
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export default CategoriesStore;
