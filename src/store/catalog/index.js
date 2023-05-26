import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      count: 0,
      item: {}
    }
  }

  async load(page) {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${page ? page * 10 : 0}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count,
    }, 'Загружены товары из АПИ');
  }

  async getItemInfo(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      item: json.result
    }, 'Загружен товар из АПИ');
  }
}

export default Catalog;
