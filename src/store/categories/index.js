import StoreModule from '../module';

/**
 * Список категорий
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

  async load() {
    this.setState({ ...this.getState(), waiting: true }, 'Ожидание категорий');

    const res = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await res.json()

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        waiting: false,
      },
      'Категории загружены',
    );
  }
}

export default CategoriesState;
