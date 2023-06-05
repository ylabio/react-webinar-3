import StoreModule from "../module";
import arrayToTree from "../../utils";


class CategoriesState extends StoreModule {
  initState() {
    return {
      items: [],
      waiting: false,
      error: null
    }
  }

  /**
   * Загрузка категорий из api
   * @returns {Promise<void>}
   */
  async load() {

    this.setState({
      items: [],
      waiting: true,
      error: null
    });
    
    try {
      const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
      const json = await response.json();

      this.setState({
        ...this.getState(),
        items: arrayToTree(json.result.items, '_id', 'parent'),
        waiting: false
      })
    } catch (e) {
      this.setState({
        ...this.getState(),
        error: e
      })
    }
  }

}

export default CategoriesState;