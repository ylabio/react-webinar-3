import CategoriesModule from "../module";

class CategoriesState extends CategoriesModule {
  initState() {
    return {};
  }

  async fetchCategories() {
    const url = '/api/v1/categories?fields=_id,title,parent(_id)&limit=*';

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Ошибка при получении категорий: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ошибка при загрузке категорий:', error);
      return null;
    }
  }

  async loadCategories() {
    try {
      const categories = await this.fetchCategories();
      if (categories) {
        console.log('Получены категории:', categories);
      }
    } catch (error) {
      console.error('Ошибка при обращении к API:', error);
    }
  }
}

export default CategoriesState;
