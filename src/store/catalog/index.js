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
      itemsAmount: null,
      currentPage: 1,
      pagesAmount: null,
      limitPosts: 10
    }
  }

  async load() {
    const response = await fetch(`/api/v1/articles?limit=${this.getState().limitPosts}&skip=${this.getState().currentPage * this.getState().limitPosts - 10}&fields=items(_id, title, price),count`);
    const json = await response.json();
 
    this.setState({
       ...this.getState(),
       list: json.result.items,
       itemsAmount: json.result.count,
       pagesAmount: Math.ceil(json.result.count / this.getState().limitPosts)
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
