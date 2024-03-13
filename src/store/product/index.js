import StoreModule from "../module";

class Product extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {};
  }

  async loadProduct(id) {
    const response = await fetch(
      `/api/v1/articles/${id}?fields=*,madeIn(title),category(title)`
    );
    const json = await response.json();
    this.setState(json.result, "Загружены данные о продукте");
  }
}

export default Product;
