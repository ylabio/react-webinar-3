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
      limit: 0
    }
  }

  async getPage(id) {
    const response = await fetch(`/api/v1/articles/${id}`);
    const json = await response.json();
    let elem = json.result;
    this.setState({
      ...this.getState(),
      product: elem,
   }, );
  }
  async getLimit() {
    const res = await fetch(`/api/v1/articles?limit=1000&skip=1&fields=items(_id),count`);
    const data = await res.json();
    this.setState({
      ...this.getState(),
      limit: Math.ceil(data.result.items.length / 10)
   }, );
  }

  async load(num) {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${num}&fields=items(_id, title, price)`);
    const json = await response.json();
    this.setState({
       ...this.getState(),
       list: json.result.items
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;