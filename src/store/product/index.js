import StoreModule from "../module";

class Product extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      product: {}
    }
  }

  async getOneProduct(id) {
    try {
      const response = await fetch(`api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
      const result = await response.json();
      this.setState({
         ...this.getState(),
         product: result.result
      }, 'Загружены товары из АПИ');  
    } catch (error) {
      console.log(error)
    }
  }
}

export default Product;
