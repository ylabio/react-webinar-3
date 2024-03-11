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
      page: 0,
      count: undefined,
    }
  }

  async load() {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${this.getState().page * 10}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count
    }, 'Загружены товары из АПИ');
  }

  setPage(page) {
    this.setState({
      ...this.getState(),
      page,
    }, 'Установлена страница');
  }
}

export default Catalog;
