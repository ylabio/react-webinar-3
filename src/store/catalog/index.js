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

  async load(limit = 10, skip = 0) {
    const response = await fetch(`api/v1/articles?limit=${limit}&skip=${skip}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items
    }, 'Загружены товары из API');
  }

  async getTotalPages(limit = 10) {
    const response = await fetch('/api/v1/articles?limit=*&fields=items(_id)');
    const json = await response.json();
    const countItems = json.result.items.length; 
    return Math.ceil(countItems / limit);
  }
  
}

export default Catalog;
