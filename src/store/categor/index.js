import StoreModule from "../module";

class CategoriesData extends StoreModule {
  initState() {
    return {
      data: [],
      waiting: false
    };
  }

  async getCategories() {
    this.setState({...this.getState(), waiting: true});
    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const { result } = await response.json();
    this.setState({
      ...this.getState(),
      data: result.items,
      waiting: false
    });
  }

}

export default CategoriesData;