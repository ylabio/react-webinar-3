import StoreModule from "../module";

class Item extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      item: {}
    }
  }


  async load(id) {
    const response = await fetch(`api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      info: json.result
    }, 'Загружена информация товара из API');
  }

  
}

export default Item;
