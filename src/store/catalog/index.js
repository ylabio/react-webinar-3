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
      pagination: {
        limit: 10,
        current: 1,
        max: undefined,
      }
    }
  }

  async load(pageNumber) {
    const pagination = this.getState().pagination;
    const skip = (pageNumber -1 ) * pagination.limit;
    const query = `?limit=${pagination.limit}&skip=${skip}&fields=items(_id, title, price),count`;
    const response = await fetch('/api/v1/articles' + query);
    const json = await response.json();
    const max = Math.ceil(json.result.count / pagination.limit);
    if(pageNumber > max) return this.load(max);
    this.setState({
      ...this.getState(),
      list: json.result.items,
      pagination: {
        ...pagination,
        max,
        current: pageNumber
       }
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
