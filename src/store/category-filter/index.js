import { parseCategories } from '../../utils';
import StoreModule from '../module';

/**
 * Состояние фильтра по категориям товаров
 */
class CategoryFilter extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categoriesList: [],
      waiting: false,
      error: '',
    };
  }

  async loadCategories() {
    try {
      this.setState({
        ...this.getState(),
        waiting: true,
      });
      const response = await fetch(
        '/api/v1/categories?fields=_id,title,parent(_id)&limit=*'
      );
      const { result } = await response.json();

      const categoriesList = parseCategories(result.items);
      this.setState({
        ...this.getState(),
        categoriesList,
        waiting: false,
      });
    } catch (error) {
      this.setState({
        ...this.getState(),
        waiting: false,
        error: error.message,
      });
    }
  }
}

export default CategoryFilter;
