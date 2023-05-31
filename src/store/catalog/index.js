import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      total: 0,
      productDetail: {}
    }
  }

  async load(limit = 10, skip = 0) {
    const endpoint = `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`;
    const json = await fetch(endpoint).then(res => res.json());

    this.setState({
       ...this.getState(),
       list: json.result.items,
       total: json.result.count
    }, 'Загружены товары из АПИ');
  }

  async loadOne(id) {
    if (id) {
      const endpoint = `/api/v1/articles/${id}`;
      const json = await fetch(endpoint).then(res => res.json());
      
      this.setState({
        ...this.getState(),
        productDetail: json.result
     }, 'Fetching item by id');
    }
  }

}

export default Catalog;
