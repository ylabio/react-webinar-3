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
      count: 0
    }
  }

  async load(page = 0) {
    const response = await fetch(`/api/v1/articles?limit=10${page > 0 ? `&skip=${page * 10}` : ''}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items
    }, 'Загружены товары из АПИ');
  }

  async getCount() {
    const res = await fetch('/api/v1/articles?limit=10&skip=10&fields=items(_id, title, price),count')
    const json = await res.json()

    this.setState({
      ...this.getState(),
      count: json.result.count
    }, 'Получено количество всех товаров')
  }
}

export default Catalog;
