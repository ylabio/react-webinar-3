// store/category.js
import StoreModule from '../module';
import CategoryTree from '../category-tree';

class CategoryState extends StoreModule {
  initState() {
    return {
      categories: [],
      waiting: false,
      error: null,
    };
  }

  async loadCategories() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
      const categories = await response.json();

      this.setState(
        {
          ...this.getState(),
          categories: CategoryTree(categories.result.items),
          waiting: false,
        },
        'Загружены категории из АПИ',
      );
    } catch (e) {
      this.setState(
        {
          ...this.getState(),
          error: e,
          waiting: false,
        },
        'Ошибка загрузки категорий',
      );
    }
  }
}

export default CategoryState;
