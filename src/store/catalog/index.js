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

  async load(page) {
    const response = await apiRequests.getAllProductsWithPaginationAndProperties(10, (page - 1) * 10);
    this.setState({
      ...this.getState(),
      list: response.result.items,
      count: response.result.count
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
