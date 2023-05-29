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
      totalNumber: null,
      pagesCount: null,
      currentPage: 1,
      limit: 10
    }
  }

  setCurrentPage(page) {
    this.setState({
      ...this.getState(),
      currentPage: Number(page),
    })
  }

  async load() {
    const currentPage = this.getState().currentPage - 1;
    const {limit} = this.getState();
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${currentPage}0&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
       ...this.getState(),
       list: json.result.items,
       totalNumber: json.result.count,
       pagesCount: json.result.items.length
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
