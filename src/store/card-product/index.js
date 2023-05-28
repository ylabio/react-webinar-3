import StoreModule from "../module";

class CardProduct extends StoreModule {
  initState() {
    return {
      cardProduct: {}
    };
  }

  async load(id) {
    const response = await fetch(
      `api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
    );
    const json = await response.json();
    this.setState({
      ...this.getState(),
      cardProduct: json.result
    });
  }
}

export default CardProduct;