import StoreModule from '../module';

/**
 * Состояние категорий
 */
class CategoriesState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categoriesList: [],
    };
  }

  /**
   * Загрузка списка категорий
   * @return {Promise<void>}
   */
  async loadCategories() {
    const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
    const json = await response.json();
    const categories = json.result.items;

    this.setState(
      {
        ...this.getState(),
        categoriesList: categories,
      },
      'Загружен список категорий из АПИ',
    );
  }
}

export default CategoriesState;
