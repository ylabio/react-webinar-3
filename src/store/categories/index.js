import StoreModule from '../module';

class CategoriesState extends StoreModule {
  initState() {
    return {
      list: [],
      waiting: false,
      error: null
    };
  }

  async loadCategories() {
    this.setState({
      ...this.getState(),
      waiting: true,
      error: null
    }, 'Начало загрузки категорий');

    try {
      const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
      const data = await response.json();

      if (!response.ok) throw new Error(data.error?.message || 'Ошибка загрузки категорий');

      this.setState({
        list: data.result.items,
        waiting: false
      }, 'Категории успешно загружены');
    } catch (error) {
      this.setState({
        waiting: false,
        error: error.message
      }, 'Ошибка загрузки категорий');
    }
  }
}

export default CategoriesState;
  