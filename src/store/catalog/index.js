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
      currentPage: 1
    }
  }

  async load() {
    const limit = 10;
    const skip = (Catalog.currentPage - 1) * 10;
    
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
       ...this.getState(),
       list: json.result.items,
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
