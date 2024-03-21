import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CategoriesState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      data: [],
      waiting: false,
    };
  }

  async getCategories() {
    try {
      const response = await fetch(
        `/api/v1/categories?fields=_id,title,parent(_id)&limit=*`
      );
      const json = await response.json();

      this.setState(
        {
          data: json.result.items,
          waiting: true
        },
        "Загружены категории"
      );

    } catch (e) {
      this.setState(
        {
          categories: [],
          waiting: false
        },
        "не удалось загрузить категории"
      );
    }
  }
}

export default CategoriesState;
