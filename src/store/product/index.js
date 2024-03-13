import StoreModule from "../module";

class Product extends StoreModule {

  initState() {
    return {
      data: {},
      isLoading:false
    }
  }
  async load(id) {
    this.setState({
      ...this.getState(),
      isLoading:true
    });

    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    
    let productData={
      title:json.result.title,
      description:json.result.description,
      madeInTitle:json.result.madeIn.title,
      madeInCode:json.result.madeIn.code,
      category:json.result.category.title,
      price:json.result.price,
      dateCreate:new Date(json.result.dateCreate).getFullYear(),
      _id:json.result._id
    }
    this.setState({
      ...this.getState(),
      data: productData,
      isLoading:false
    }, 'Загружены товары из АПИ');
  }
}

export default Product;
