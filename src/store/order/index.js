import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      list: [],
      sum: 0,
      amount: 0,
      madeIn: '',
      category: '',
      madeInCode: '',
      description: '',
      year: '',
      price: '',
      title: '',
    }
  }
  
  async loadOrderInfo(id) {
    this.setState({
        ...this.getState(),
        madeIn: '',
        category: '',
        madeInCode: '',
        description: '',
        year: '',
        price: '',
        title: '',
        isLoading: true
      })
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      madeIn: json.result.madeIn.title,
      madeInCode: json.result.madeIn.code,
      category: json.result.category.title,
      description: json.result.description,
      year: json.result.edition,
      price: json.result.price,
      title: json.result.title
    }, 'Загружена инфа о товаре из АПИ');
  }

}

export default Catalog;
