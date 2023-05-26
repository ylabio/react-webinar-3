import {codeGenerator} from "../../utils";
import StoreModule from "../module";
import {apiRequests} from "../../api";

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

  async load() {
    const response = await apiRequests.getAllProducts()
    this.setState({
       ...this.getState(),
       list: response.result.items
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
