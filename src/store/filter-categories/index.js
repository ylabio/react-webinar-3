import StoreModule from "../module";

class FilterCategory extends StoreModule {

  initState() {
    return {
      categories: []
    }
  }

  async fetchCategories() {
    const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
    const json = await response.json();

    this.setState({
      ...this.getState(),
      categories: json.result.items
    }, 'загрузка категорий')
  }
}

export default FilterCategory;
