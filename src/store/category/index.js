import StoreModule from "../module";

/**
 * Ифнормация о категориях
 */
class FilterCategoryState extends StoreModule {

  initState() {
    return {
      categoryList: [],
    }
  }

  async getCategoryFilter() {
    const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
    const resultJson = await response.json();
    
    this.setState({
      ...this.getState(),
      categoryList: resultJson.result.items,
    });
  }
}

export default FilterCategoryState;
