import StoreModule from "../module";

class Product extends StoreModule {

  initState() {
    return {
      error: null,
      fullData: null,
    }
  }

  async load(id) {
    const query = '?fields=*,madeIn(title,code),category(title)'
    const response = await fetch('/api/v1/articles' + '/' + id + query);
    const {error, result} = await response.json();
    const fullData = !result ? null : {
      _id: result._id,
      description: result.description,
      country: result.madeIn.title,
      countryCode: result.madeIn.code,
      category: result.category.title,
      year: new Date(result.dateCreate).getFullYear(),
      price: result.price,
      title: result.title,
    }
    this.setState({
      ...this.getState(),
      fullData,
      error: error ? error : null,
    }, 'Загружен товар по id из АПИ');
  }
}

export default Product;