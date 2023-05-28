import { fetchData } from "../../api";
import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: []
    }
  }

  async load(limit, skip) {
    const response = fetchData(`/api/v1/articles?limit=${limit}&skip=${skip}`);
    this.setState({
       ...this.getState(),
       list: response.items
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
