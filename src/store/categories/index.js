import StoreModule from "../module";
import {createCategories} from "../../utils";

/**
 * Состояние категорий
 */
class CategoriesState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    this.getCategories()
    return {
      categories: []
    }
  }

  async getCategories() {
    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await response.json();

    const categories = [
      {
        value: 'all',
        title: 'Все'
      },
      ...createCategories(json.result.items)
    ]

    this.setState({
      ...this.getState(),
      categories
    })
  }
}

export default CategoriesState;
