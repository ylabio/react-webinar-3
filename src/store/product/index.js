import StoreModule from "../module";

class Product extends StoreModule {

  initState() {
    return {
      data: {

      }
    }
  }
  // http://example.front.ylab.io/api/v1/articles/65817bed5c295a2ff2fcd182?fields=*,madeIn(title,code),category(title)
  async load() {
    const response = await fetch('/api/v1/articles/65817bed5c295a2ff2fcd182?fields=*,madeIn(title,code),category(title)');
    const json = await response.json();
    
    let productData={
      title:json.result.title,
      description:json.result.description,
      madeInTitle:json.result.madeIn.title,
      madeInCode:json.result.madeIn.code,
      category:json.result.category.title,
      price:json.result.price,
      dateCreate:new Date(json.result.dateCreate).getFullYear(),
      _id:json.result.id
    }
    this.setState({
      ...this.getState(),
      data: productData
    }, 'Загружены товары из АПИ');
  }
}

export default Product;
