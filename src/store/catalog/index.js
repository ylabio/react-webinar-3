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
      totalPages: 0,
      currentPage: 1,
    }
  }

  async load(page) {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${page * 10 - 10}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
       ...this.getState(),
       list: json.result.items,
       totalPages : Math.ceil(json.result.count / 10),
      currentPage: page
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
