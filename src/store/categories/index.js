import StoreModule from "../module";

/**
 * Детальная информация о товаре для страницы товара
 */
class CategoriesState extends StoreModule {

  initState() {
    return {
      list: [],
      waiting: false
    }
  }

  /**
   * Загрузка категорий
   * @return {Promise<void>}
   */
  async load() {
    this.setState({
      ...this.getState(),
      waiting: true
    });
    try {
      const response = await fetch(`api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
      const json = await response.json();
      this.setState({
        list: json.result.items,
        waiting: false
      }, 'Загружен список категорий из АПИ');
    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        ...this.getState(),
        waiting: false
      });
    }
  }
}

export default CategoriesState;
