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
      length: 0,
      item: {}
    }
  }

  async load(count) {
    const response = await fetch(`api/v1/articles?limit=10&skip=${count}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      length: json.result.count
    }, 'Загружены товары из АПИ');
  }

}

export default Catalog;
