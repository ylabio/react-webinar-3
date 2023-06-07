import { createCategoryList, updateCategoryList } from "../../utils";
import StoreModule from "../module";

/**
 * Состояние каталога категорий
 */
class CategoryState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categoryList: [],
      wait: false,
    };
  }
  /**
   * Получение списка категорий
   * @returns {Promise<void>}
   */
  async getCategoryList() {
    this.setState({
      categoryList: [],
      wait: true,
    });
    try {
      const response = await fetch(
        "/api/v1/categories?fields=_id,title,parent(_id)&limit=*"
      );
      const json = await response.json();
      this.setState({
        categoryList: [{title: 'Все', value: 'All'}, ...createCategoryList(json.result.items)],
        wait: false,
      });
      console.log("catalogList", this.categoryList);
    } catch (e) {
      this.setState({
        categoryList: [],
        wait: false,
      });
    }
  }
}

export default CategoryState;
