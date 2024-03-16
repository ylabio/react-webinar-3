import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CategoryState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [],
      waiting: false,
    };
  }

  async load() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    const response = await fetch(
      "/api/v1/categories?fields=_id,title,parent(_id)&limit=*"
    );
    const json = await response.json();
    this.setState(
      {
        list: json.result.items,
        waiting: false,
      },
      "Загружен список категорий из АПИ"
    );
  }
}

export default CategoryState;
