import StoreModule from "../module";

class Product extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
     product: {},
    }
  }

  async load(productId) {
    const response = await fetch(`/api/v1/articles/${productId}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    console.log(json)
    this.setState({
       ...this.getState(),
      product: json.result
    }, 'Загружены товары из АПИ');
  }
}

export default Product;
