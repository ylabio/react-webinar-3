import StoreModule from "../module";

class CategoryState extends StoreModule {

  initState() {
    return {
      list: [],
    }
  }

  async getCategories() {
    try {
      const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*')
      const json = await response.json();
      this.setState({
        ...this.getState(),
        list: json.result.items,
      });
    } catch (e) {
      console.error(e);
    }
  }
}

export default CategoryState;
