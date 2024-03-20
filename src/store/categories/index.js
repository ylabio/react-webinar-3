import StoreModule from "../module";

class CategoriesState extends StoreModule {
  initState() {
    return {
      list: [],
    };
  }

  async loadCategories() {
    const request = '/api/v1/categories?fields=_id,title,parent(_id)&limit=*';
    const response = await fetch(request);
    const json = await response.json();

    this.setState({
      ...this.getState(),
      list: json.result.items,
    }, 'Загружен список категорий');
  }

}

export default CategoriesState;
