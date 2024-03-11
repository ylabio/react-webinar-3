import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      avail: 0,
      list: []
    }
  }

  async avail() {
    const getCount = 'api/v1/articles?fields=items(_id,_key),count';
    const respCount = await fetch(getCount);
    const jsonCount = await respCount.json();
    this.setState({
      ...this.getState(),
      avail: jsonCount.result.count,
    }, 'Загружена сумма из АПИ');
  }

  async load(skip = 0, limit = 10) {
    const getItems = `api/v1/articles?limit=${limit}&skip=${skip}`;
    const respItems = await fetch(getItems);
    const jsonItems = await respItems.json();
    this.setState({
      ...this.getState(),
      list: jsonItems.result.items
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
