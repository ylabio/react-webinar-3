import StoreModule from "../module";

class Order extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      sum: 0,
      amount: 0,
      description: {},
      isLoading: true,
    }
  }
  
  async loadOrderInfo(id) {
    this.setState({
        ...this.getState(),
        description: {},
        isLoading: true,
      })
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    if (response.ok) {
    this.setState({
      ...this.getState(),
      description: json.result,
      isLoading: false,
    }, 'Загружена инфа о товаре из АПИ');}
  }

}

export default Order;
