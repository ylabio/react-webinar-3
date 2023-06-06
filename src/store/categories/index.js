import { formatCategories } from "../../utils";
import StoreModule from "../module";

/**
 * Состояние категорий - пусть пока отдельно от каталога, т.к. есть собственные данные и логика
 */
class CategoriesState extends StoreModule {

  initState() {
    return {
      list: [{ value: '', title: 'Все' }]
    };
  }

  async load() {
    const response = await (
      await fetch(`/api/v1/categories?limit=*`)
    ).json();

    const list = formatCategories(response.result.items);

    this.setState({
      ...this.getState(),
      list
    }, 'Категории загружены.');
  }
}

export default CategoriesState;