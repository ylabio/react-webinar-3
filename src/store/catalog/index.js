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
      count: 0,
      currentPage: 1,
    }
  }

  async load() {
    const limit = 10;
    const skip = (this.getState().currentPage - 1) * limit;

    const url = `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`;
    const response = await fetch(url);
    const json = await response.json();
    const totalPages = Math.ceil(json.result.count / limit);
    this.setState({ ...this.getState(), list: json.result.items, count: totalPages }, 'Загружены товары из АПИ');
  }
  setCurrentPage(page) {
    this.setState({ ...this.getState(), currentPage: page });
  }
}
export default Catalog;
