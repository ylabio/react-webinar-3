import StoreModule from "../module";

class Product extends StoreModule {

  initState() {
    return {
      data: {},
      request: false
    }
  }

  async load(id, lang) {
    this.setState({
      data: {},
      request: true
    });

    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)&lang=${lang}`);
      const json = await response.json();

      this.setState({
        data: json.result,
        request: false
      }, 'Загружен товар из АПИ по id');
    } catch (e) {
      this.setState({
        data: {}
      }, 'Произошла ошибка');
    }
  }
}

export default Product;