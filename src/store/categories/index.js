import { buildTree, traversalTree } from "../../utils";
import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра исписок товара
 */
class CategoriesState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
      waiting: false
    }
  }

  async getCategories() {
    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await response.json();
    const categories = json.result.items.map((el) => ({ id: el._id, title: el.title, parent: (el.parent ? el.parent._id : null) }));

    let updateCategories = traversalTree(buildTree(categories), 0);

    this.setState({ ...this.getState(), categories: updateCategories, waiting: false });
  }
}

export default CategoriesState;
