import StoreModule from '../module';

class CategoryState extends StoreModule {
  initState() {
    return {
      list: [],
      waiting: false,
    };
  }

  async load() {
    this.setState({ ...this.getState(), waiting: true }, 'Загрузка категорий');
    const response = await fetch('/api/v1/categories');
    const data = await response.json();

    const list = data.result?.items || [];

    this.setState({ list, waiting: false }, 'Категории загружены');
  }
}

export default CategoryState;
