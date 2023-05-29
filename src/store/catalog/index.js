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
      list: [],
      totalCount: 0
    }
  }

  async load(limit, skip) {
    const response = await fetchData(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`);
 console.log(response)
    this.setState({
       ...this.getState(),
       list: response.items,
       totalCount: response.count
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
