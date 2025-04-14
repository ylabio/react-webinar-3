import StoreModule from '../module';

/**
 * Состояние для списка категорий
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

  /**
   * Загрузка списка категорий из API
   * @return {Promise<void>}
   */
  async load() {
    try {
      this.setState(
        {
          ...this.getState(),
          waiting: true,
        },
        'Начата загрузка категорий',
      );

      const response = await fetch('/api/v1/categories/?fields=_id,title,parent(_id)&limit=*');
      const json = await response.json();

      const list = json.result?.items || [];

      this.setState(
        {
          ...this.getState(),
          list: list,
          waiting: false,
        },
        'Категории загружены',
      );
    } catch (error) {
      console.error('Ошибка загрузки категорий:', error);
      this.setState(
        {
          ...this.getState(),
          list: [],
          waiting: false,
        },
        'Ошибка загрузки категорий',
      );
    }
  }
}

export default CategoriesState;
