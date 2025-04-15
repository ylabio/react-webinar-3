import StoreModule from '../module';

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
    this.setState(
      {
        list: [],
        waiting: true,
      }
    )

    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        waiting: false,
      }
    )
  }

}

export default CategoriesState;
