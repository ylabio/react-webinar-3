import StoreModule from "../module";

class Product extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {};
  }

  async load(id) {
    const response = await fetch(
      `/api/v1/articles/${id}?fields=_id,title,description,price,edition,madeIn(title, code),category(title)`
    );
    const json = await response.json();
    console.log(json.result);
    this.setState(
      {
        ...this.getState(),
        ...json.result,
      },
      "Загружен товар из АПИ"
    );
  }
}

export default Product;
