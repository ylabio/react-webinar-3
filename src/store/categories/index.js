import StoreModule from '../module';
import { formatCategories } from '../../utils';

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
    };
  }

  /**
   * Загрузка категорий в state
  */
  async loadCategories() {
    const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: formatCategories(json.result.items),
    }, 'Загружен список категорий из АПИ');
  }

}

export default CategoriesState;
