import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      currentPage: 1,
      count: 0,
      pages: 0
    }
  }

  async load() {
    const response = await fetch('/api/v1/articles?limit=10&skip=0&fields=items(_id, title, price),count');
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count,
      pages: Math.ceil(json.result.count / 10)
    }, 'Загружены товары из АПИ');
  }

  async loadPage(num) {
    const response = await fetch('/api/v1/articles?limit=10&skip=' + (num * 10 - 10) + '&fields=items(_id, title, price),count');
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      currentPage: num,
      count: json.result.count,
      pages: Math.ceil(json.result.count / 10)
    }, 'Загружены товары из АПИ')
  }
}

export default Catalog;
