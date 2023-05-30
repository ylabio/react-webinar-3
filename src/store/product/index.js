import StoreModule from "../module";

class Product extends StoreModule {
  initState() {
    return {
        product: {},
    }
  }
  async load(id) {
    const response = await fetch(`api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      product: json.result,
   }, 'Загружены товары из АПИ');
  }

}

export default Product;