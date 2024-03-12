import StoreModule from "../module";

class Product extends StoreModule {
  initState() {
    return {
      item: {},
      error: 'none',
    }
  }

  /**
   * Добавление товара в корзину
   * @param productId айдишник товара в запросе
   */
  // fields=title,description,madeIn(title,code),category(title),edition,price
  async load(productId, fields = 'fields=title,description,madeIn(title,code),category(title),edition,price') {
    const response = await fetch(`/api/v1/articles/${productId}?${fields}`);
    const json = await response.json();
    if(json.result) this.setState({
      ...this.getState(),
      item: json.result,
      error: 'none',
    }, 'Загружен товар из АПИ');
    else { this.setState({...this.getState(), error: json.error}) }
  }
}

export default Product;