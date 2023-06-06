import StoreModule from "../module";

/**
 * Детальная ифнормация о товаре для страницы товара
 */
class Category extends StoreModule {

  initState() {
    return {
      categories: [],
      waiting: false
    }
  }

  /**
   * Загрузка товаров по id
   * @param id {String}
   * @return {Promise<void>}
   */
  async load(id) {
    this.setState({
      categories: [],
      waiting: true
    }, 'Загрузка категорий');

    try {
      const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
      const json = await response.json();
      const newCategories = json.result.items.map((category) => ({
          value: category._id,
          title: category.title,
          parent: category.parent,
      }));
      
      this.setState({
        categories: newCategories,
        waiting: false
      }, 'Загружены категории');

    } catch (e) {
      this.setState({
        waiting: false
      }, 'Ошибка загрузки категорий');
    }
  }
}

export default Category;
