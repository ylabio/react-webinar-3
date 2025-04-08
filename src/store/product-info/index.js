import StoreModule from '../module';

class Product extends StoreModule {
  initState() {
    return {
      productItem: {},
    };
  }

  async productLoad(id) {
    const response = await fetch(
      `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        productItem: json.result,
      },
      'Загружен товар из АПИ',
    );
  }
}

export default Product;