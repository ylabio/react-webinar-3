import StoreModule from "../module";

class Product extends StoreModule {

  initState() {
    return {
      data: null,
    };
  }

  parseProductData(
    { _id, description, madeIn, category, dateCreate, price, title }
  ){
    return {
      _id,
      description,
      country: madeIn.title,
      countryCode: madeIn.code,
      category: category.title,
      year: new Date(dateCreate).getFullYear(),
      price,
      title,
    };
  }

  async load(id) {
    const fetchParams= new URLSearchParams({
      fields: '*,madeIn(title,code),category(title)',
    });
    const response = await fetch(`/api/v1/articles/${id}?${fetchParams}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { result } = await response.json();

    this.setState({
      ...this.getState(),
      data: this.parseProductData(result),
    }, 'Загружен товар по id');
  }
}

export default Product;
