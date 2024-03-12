import StoreModule from "../module";

class ProductItem extends StoreModule {

  initState() {
    return {
      productItem: {},
    }
  }

  async load(id) {
    const host = '/api/v1/articles';
    const url = `${host}/${id}?fields=title,price,description,edition,madeIn(title,code),category(title)`;
    const response = await fetch(url);

    const json = await response.json();
    this.setState({
      ...this.getState(),
      productItem: json.result,
    }, 'Загружен товар из АПИ');
  }
}

export default ProductItem;
