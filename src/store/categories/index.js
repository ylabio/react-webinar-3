import { organizeCategories } from "../../utils";
import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CategoriesState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [],

    }
  }

  /**
   * Установка параметров и загрузка категорий товаров
   * @returns {Promise<void>}
   */
  async setCategories() {

    const categories = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
    const { result: { items: rawCategoriesList } } = await categories.json();
    const categoriesList = organizeCategories(rawCategoriesList)

    // const json = await response.json();
    this.setState({
      ...this.getState(),
      list: categoriesList,
    });
  }
}

export default CategoriesState;
