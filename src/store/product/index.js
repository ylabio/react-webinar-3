import StoreModule from "../module";

class Product extends StoreModule {
  initState() {
    return {
      data: {},
      isLoading: false,
    };
  }

  async load(id) {
    this.setState({
      data: {},
      isLoading: true,
    });

    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title),category(title)`);
    const json = await response.json();

    this.setState({
      data: json.result,
    }, 'Загружен товар из АПИ');
  }
}

export default Product;
