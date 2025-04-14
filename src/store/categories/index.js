import StoreModule from '../module';

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
      list: [],
      waiting: false,
    };
  }


  async fetchCategories() {
    try {
      const response = await fetch('api/v1/categories?fields=_id,title,parent(_id)&limit=*');
      const json = await response.json();

      if (!response.ok) {
        throw new Error('Ошибка, категории не найдены');
      }

      this.setState({
        ...this.getState(),
        list: json.result.items,
      });
    } catch (error) {
      console.error(error);

      this.setState({
        ...this.getState(),
        waiting: false,
      });
    }
  }
}

export default CategoriesState;
