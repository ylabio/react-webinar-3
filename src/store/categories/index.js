import StoreModule from "../module";

class Categories extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [],
    }
  }

  async getCategories() {
    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&lang=ru&limit=*`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
    }, 'Загружен список категорий из АПИ');
  }
}

export default Categories;
