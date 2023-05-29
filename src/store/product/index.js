import StoreModule from "../module";


class Product extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }
  initState() {
    return {
      data: null,
      loading: false
    }
  }

  async load(id) {
    this.setState({
      ...this.getState(),
      loading: true
    })
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      data: json.result,
      loading: false
    })
  }

}

export default Product;