import StoreModule from "../module";

class Product extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      productData: {},
    };
  }

  async load(id) {
    const response = await fetch(
      `/api/v1/articles/${id}?fields=_id,title,description,price,madeIn(title),category(title)`
    );
    const json = await response.json();
    console.log(json.result);
    this.setState(
      {
        ...this.getState(),
        productData: json.result,
      },
      "Загружен товар из АПИ"
    );
  }
}

export default Product;
