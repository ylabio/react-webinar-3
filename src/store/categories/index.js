import StoreModule from "../module";

class CategoriesState extends StoreModule {

  initState() {
    return {
      list: [],
    }
  }

  async initList(newParams = {}) {
    const responseCategories = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');

    const jsonCategories = await responseCategories.json();
    this.setState({
      ...this.getState(),
      ...newParams,
      list: jsonCategories.result.items
    }, 'Загружен список категорий из АПИ');
  }
}

export default CategoriesState;
