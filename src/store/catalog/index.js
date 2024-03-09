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
        current: undefined,
        max: undefined,
      },
      error: null,
    }
  }

  async load(pageNumber) {
    const pagination = this.getState().pagination;
    if(pagination.current && pagination.current === pageNumber) return;
    const skip = (pageNumber -1 ) * pagination.limit;
    const query = `?limit=${pagination.limit}&skip=${skip}&fields=items(_id, title, price),count`;
    const response = await fetch('/api/v1/articles' + query);
    const json = await response.json();
    const error = json.error ? json.error : null;
    const max = Math.ceil(json.result.count / pagination.limit);
    if(pageNumber > max) return this.load(max);
    this.setState({
      ...this.getState(),
      list: json.result.items,
      pagination: {
        ...pagination,
        max,
        current: pageNumber
      },
      error,
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
