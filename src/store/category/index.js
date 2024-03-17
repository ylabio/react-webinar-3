import StoreModule from "../module";

class CategoryState extends StoreModule {

  initState() {
    return {
      list: [],
      waiting: false,
    }
  }

  async getCategories() {
    this.setState({
        ...this.getState(),
        waiting: true,
      });

    try {
      const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*')
      const json = await response.json();
      this.setState({
        ...this.getState(),
        list: json.result.items,
        waiting: false,
      });
    } catch (e) {
      console.error(e);
    }
  }
}

export default CategoryState;
