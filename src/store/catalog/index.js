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
      totalPages: 0,
      limit: 10,
      currentPage: null
    }
  }

  generateButton(pageNumber, limit) {
    return {
      pageNumber: pageNumber,
      skipValue: pageNumber * limit
    }
  }

  setCurrentPage(currentPage) {
    this.setState({
      ...this.getState(),
      currentPage,
    })
  }

  async load(limit, skip) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      totalPages: json.result.count
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
