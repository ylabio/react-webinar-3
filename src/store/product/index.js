import StoreModule from '../module';

class Product extends StoreModule {

  initState() {
    return {
      current: null
    };
  }

  async loadProduct(_id) {
    const response = await fetch(`/api/v1/articles/${_id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      current: json.result
    });
  }

  clearProduct() {
    this.setState({
      ...this.getState(),
      current: null
    })
  }
}

export default Product;
