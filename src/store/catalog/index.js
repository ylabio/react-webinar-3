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
      count: 0,
      isLoad: false
    }
  }
  async load(page = 1) {
    const limit = 10
    this.setState({
      ...this.getState(),
      isLoad: true
    }, 'Загружаются товары...');
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${limit * (page - 1)}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count,
      isLoad: false
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
