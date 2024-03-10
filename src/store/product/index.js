import StoreModule from "../module";

class Product extends StoreModule {

  initState() {
    return {
      data: {}
    }
  }

  async load(id) {
    this.setState({
      data: {}
    });

    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
      const json = await response.json();

      this.setState({
        data: json.result
      }, 'Загружен товар из АПИ по id');
    } catch (e) {
      this.setState({
        data: {}
      }, 'Произошла ошибка');
    }
  }
}

export default Product;