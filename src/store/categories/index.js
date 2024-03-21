import StoreModule from "../module";

/**
 * Состояние категорий 
 */
class CatalogState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categoryFilters: [],
    }
  }

  /**
   * Инициализация категорий.
   * @return {Promise<void>}
   */
  async initCategories() {
    const response = await fetch ('/api/v1/categories?fields=_id,title,parent(_id)&limit=*')

    const json = await response.json();

    this.setState({
      categoryFilters: json.result.items
    })
  }
}

export default CatalogState;
