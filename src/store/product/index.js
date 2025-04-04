import StoreModule from '../module';

class Product extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      product: {},
    };
  }

  async loadProduct(id) {
    const response = await fetch(
      `/api/v1/articles/${id}?fields=_id,title,description,price,edition,madeIn(title,code),category(title)`,
    );
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        product: json.result,
      },
      'Загружен товар',
    );
  }
}

export default Product;
