import StoreModule from "../module";

class CategoryState extends StoreModule {

  initState() {
    return {
      items: [],
    };
  }

  async load() {
    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id),children&limit=*`);
    const json = await response.json();
    this.setState({
      items: json.result.items,
    }, 'Загружены категории');
  }
}

export default CategoryState;
