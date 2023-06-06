import StoreModule from "../module";
import { generate } from "../../utils";
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
      waiting: false,
    }
  }

  /**
   * Получение категорий
   * @returns {Promise<void>}
   */
  async getCategory() {
    this.setState({
        ...this.getState(),
        waiting: true,
      }, 'Грузится список категорий');
    const response = await fetch('/api/v1/categories?fields=_id,title,name,parent(_id)&limit=');
    const json = await response.json();
    const categoryOptions = generate(json.result.items);
    this.setState({
      ...this.getState(),
      categories: categoryOptions,
      waiting: false,
    }, 'Загружен список категорий');
  }

}

export default CategoriesState;
