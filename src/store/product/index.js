import StoreModule from "../module";

class Product extends StoreModule {

  initState() {
    return {
      item: {}
    }
  }

  async load(_id) {
    const response = await fetch(`api/v1`+`/articles/${_id}`+`?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    console.log(json.result)
    this.setState({
      ...this.getState(),
      item: json.result
    }, 'Загружен товар');
  }


}

export default Product;