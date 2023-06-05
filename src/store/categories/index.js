import StoreModule from '../module';

/**
 * Информация о категориях товаров
 */
class CategoriesState extends StoreModule {

  initState() {
    return {
      list: []
    };
  }

  /**
   * Загрузка категорий
   * @return {Promise<void>}
   */
  async load() {

    try {
      const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
      const json = await response.json();

      this.setState(
        {
          list: json.result.items
        },
        'Загружена информация о категориях из АПИ',
      );
    } catch (e) {
      this.setState({
        list: []
      });
    }
  }
}

export default CategoriesState;