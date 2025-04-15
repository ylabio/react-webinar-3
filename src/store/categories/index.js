import StoreModule from '../module';

class CategoriesState extends StoreModule {
  initState() {
    return {
      categories: [],
    };
  }
  async loadCategories() {
    const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
    const json = await response.json();
    const categories = json.result.items;

    this.setState(
      {
        ...this.getState(),
        categories: categories,
      },
      'Загружен список категорий из АПИ',
    );
  }
}

export default CategoriesState;
