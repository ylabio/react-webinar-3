import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: []
    }
  }

  async load(skip = 0) {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${skip}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items
    }, 'Загружены товары из АПИ');
  }

  async getCount() {
    const response = await fetch('/api/v1/articles?limit=*&skip=0&fields=items(),count');
    const json = await response.json();
    return json.result.count;
  }

  async getProduct(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    return json.result;
  }
}

export default Catalog;
