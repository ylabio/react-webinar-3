import {codeGenerator} from "../../utils";
import StoreModule from "../module";

const LIMIT = 10;

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      pages: 0,
      currentPage: 1
    }
  }

  async load(page = this.getState().currentPage) {
    // const response = await fetch(`/api/v1/articles?limit=${LIMIT}&skip=10&fields=items(_id, title, price),count`);
    const response = await fetch(`/api/v1/articles?limit=${LIMIT}&skip=${page*LIMIT - 1}&fields=items(_id, title, price),count`);
    // const response = await fetch(`/api/v1/articles?limit=${10}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      pages: Math. trunc(json.result.count / LIMIT),
      currentPage: page
    }, 'Загружены товары из АПИ');
  }

  // async changePage(page) {
  //   const response = await fetch(`/api/v1/articles?limit=${LIMIT}&skip=${page*LIMIT - 1}&fields=items(_id, title, price),count`);
  //   const json = await response.json();
  //   this.setState({
  //     ...this.getState(),
  //     currentPage: page
  //   }, `Перешли на страницу ${page}`);
  // }
}

export default Catalog;
