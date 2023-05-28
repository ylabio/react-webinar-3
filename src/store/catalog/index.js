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
      total: 0,
      current: 1,
      limit: 10,
      last: 1
    }
  }

  async load(page = this.getState().current) {
    const { limit } = this.getState();
    const skip = limit * (page - 1);
    const response = await fetch(`api/v1/articles?limit=${ limit }&skip=${ skip }&fields=items(_id, title, price),count`);
    const json = await response.json();
    const last = Math.ceil(json.result.count / 10);
    this.setState({
      ...this.getState(),
      list: json.result.items,
      total: json.result.count,
      current: page,
      last: last,
    }, 'Загружены товары из АПИ');
  }

  changeCurrent(page) {
    this.load(page);
    this.setState({
      ...this.getState(),
      current: page,
    }, 'Смена текущей страницы');
  }
}

export default Catalog;
