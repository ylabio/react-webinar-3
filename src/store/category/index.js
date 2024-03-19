import StoreModule from "../module";

class CategoryState extends StoreModule {
  initState() {
    return {
      list: [],
      waiting: false
    }
  }


  /**
   * Получение категории.
   * @return {Promise<void>}
   */
  async getCategories() {
    this.setState({...this.getState(), waiting: true})
    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await response.json();

    const categories = json.result.items;
    this.setState({
      ...this.getState(),
      list: categories,
      waiting: false
    }, 'Загружены категории товаров из АПИ');
  }
}

export default CategoryState