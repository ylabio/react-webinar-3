import StoreModule from '../module';

/**
 * Категории товаров
 */

class CategoriesState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [],
    }
  }

  /**
   * Загрузка списка категорий товаров из API
   */
  async getCategories () {
    try {
      const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
      const json = await response.json();

      this.setState({
        ...this.getState(),
        list: json.result.items,
      }, 'Загружен список категорий товаров из АПИ');

    } catch (ev) {
      console.log(ev);
    }
  }

}

export default CategoriesState;